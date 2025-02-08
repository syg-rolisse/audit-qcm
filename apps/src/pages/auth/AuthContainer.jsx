import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Transition } from "react-transition-group";
import axiosInstance from "../../config/axiosConfig";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";
import RestPassword from "./RestPassword";
import useThemeMode from "../../components/useThemeMode";

function AuthContainer() {
  const [activeComponent, setActiveComponent] = useState("login");
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { themeMode } = useThemeMode();

  const navigate = useNavigate();
  const nodeRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    const urlParams = new URLSearchParams(window.location.search);

    const tokenParam = urlParams.get("token");
    const emailParam = urlParams.get("email");
    const userIdParam = urlParams.get("userId");
    const renderParam = urlParams.get("render");

    if (tokenParam) setToken(tokenParam);
    if (emailParam) setEmail(emailParam);
    if (userIdParam) setUserId(userIdParam);

    if (renderParam === "register" && tokenParam && emailParam && userIdParam) {
      navigate("");
      activeAccount.mutate({
        token: tokenParam,
        email: emailParam,
        userId: userIdParam,
      });
    }

    if (
      renderParam === "reset-password" &&
      tokenParam &&
      emailParam &&
      userIdParam
    ) {
      setActiveComponent("reset-password");
    }

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const activeAccount = useMutation(
    ({ token, email, userId }) =>
      axiosInstance.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/activeAccount?token=${token}&email=${email}&userId=${userId}`
      ),
    {
      onSuccess: (response) => {
        toast.success(response?.data?.message, { duration: 7000 });
        setTimeout(() => {
          setActiveComponent("login");
        }, 2000);
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.error || error?.response?.data?.message;
        toast.error(errorMessage, { autoClose: 1000 });
      },
    }
  );

  const renderComponent = () => {
    switch (activeComponent) {
      case "login":
        return <Login onSwitch={setActiveComponent} />;
      case "register":
        return <Register onSwitch={setActiveComponent} />;
      case "forgot":
        return <ForgotPassword onSwitch={setActiveComponent} />;
      case "reset-password":
        return (
          <RestPassword
            token={token}
            email={email}
            userId={userId}
            onSwitch={setActiveComponent}
          />
        );
      default:
        return <Login onSwitch={setActiveComponent} />;
    }
  };

  useEffect(() => {
    if (themeMode === "light") {
      document.body.style.backgroundColor = "white";
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [themeMode]);

  // Composant du loader
  if (isLoading) {
    return (
      <div className="loader-overlay">
        <div className="loader-spinner"></div>
      </div>
    );
  }

  return (
    <div
      className={` authentication mx-0 transition-opacity duration-700 ease-in-out ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="tw-grid tw-grid-cols-4 tw-h-screen">
        <div className="tw-absolute tw-p-3 tw-rounded-lg tw-bg-opacity-80 tw-items-center tw-justify-center tw-m-36 max-xl:tw-m-5  max-sm:tw-hidden">
          <div className="tw-w-full tw-space-y-3 tw-mb-6 tw-overflow-hidden tw-bg-green-200 tw-text-lg  tw-rounded-lg tw-p-4 ">
            <div className="tw-text-gray-600 max-lg:tw-text-sm tw-font-semibold">
              📘 La réussite commence avec une bonne préparation !
            </div>

            <div className="tw-text-green-600 max-lg:tw-text-sm">
              Testez vos compétences avec des QCM interactifs 🚀
            </div>
          </div>

          <h3 className="tw-text-3xl tw-font-bold tw-mb-4 max-lg:tw-text-lg ">
            RAPIDE & <strong className="tw-animate-pulse">SIMPLE</strong>
          </h3>

          <h3 className="tw-text-2xl tw-mt-4 max-lg:tw-text-sm max-sm:tw-text-[10px]">
            INNOVATION - FORMATION
          </h3>
        </div>

        <div className="tw-col-span-3 tw-bg-green-200 tw-bg-opacity-50 tw-flex tw-items-end tw-p-32 max-xl:tw-p-10 ">
          <div className="max-sm:tw-hidden">
            <p className="max-lg:tw-text-lg max-md:tw-text-sm tw-text-2xl tw-font-bold">
              CONSEIL - EXPERTISE COMPTABLE
            </p>

            {themeMode === "dark" ? (
              <hr className="my-4 border-light" />
            ) : (
              <hr className="my-4 border-green" />
            )}

            <p className="scrolling-text max-md:tw-text-sm">
              Avec nous, vous êtes toujours
              <span className="highlight">un pas en avant!</span>
            </p>
          </div>
        </div>

        <div className="tw-col-span-1 tw-bg-green-800"></div>
      </div>

      <div className="">
        <Transition
          in={activeComponent !== "login"}
          timeout={700}
          nodeRef={nodeRef}
        >
          {(state) => (
            <div
              ref={nodeRef}
              className={`transition-all transform duration-700 ease-in-out ${
                state === "entering"
                  ? "opacity-0 translate-y-5"
                  : state === "entered"
                  ? "opacity-100 translate-y-0"
                  : ""
              }`}
            >
              {renderComponent()}
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
}

export default AuthContainer;
