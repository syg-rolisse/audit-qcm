import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types"; // Importer PropTypes
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import "react-phone-input-2/lib/style.css";
import axiosInstance from "../../config/axiosConfig";
import RegisterButton from "../../components/RegisterButton";
import Logo from "../../components/Logo";

function RestPassword({ token, email, userId, onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const user = JSON.parse(localStorage.getItem("user"));
  const switchToRegister = () => {
    onSwitch("login");
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const changePassword = useMutation(
    (data) =>
      axiosInstance.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/change_password?userId=${userId}&token=${token}&email=${email}`,
        data
      ),
    {
      onSuccess: (response) => {
        toast.success(response?.data?.message, { duration: 12000 });
        reset();
        onSwitch("login");
      },
      onError: (error) => {
        const validationErrors = error?.response?.data?.error;

        if (validationErrors && Array.isArray(validationErrors)) {
          validationErrors.forEach((error) => {
            toast.error(error.message, {
              duration: 12000,
              style: {
                zIndex: 9999,
              },
            });
          });
        } else {
          toast.error(error?.response?.data?.message, {
            duration: 12000,
            style: {
              zIndex: 9999,
            },
          });
        }
      },
    }
  );
  const checkToken = useMutation(
    (params) =>
      axiosInstance.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/verif_token_to_change_password?token=${params.token}&userId=${
          params.userId
        }&email=${params.email}`
      ),
    {
      onSuccess: (response) => {
        toast.success(response?.data?.message, { duration: 12000 });
        reset();
        //onSwitch("login");
      },
      onError: (error) => {
        console.log(error);

        const validationErrors = error?.response?.data?.error;

        if (validationErrors && Array.isArray(validationErrors)) {
          validationErrors.forEach((error) => {
            toast.error(error.message, {
              duration: 12000,
              style: {
                zIndex: 9999,
              },
            });
          });
        } else {
          toast.error(error?.response?.data?.message, {
            duration: 12000,
            style: {
              zIndex: 9999,
            },
          });
        }
      },
    }
  );

  useEffect(() => {
    //alert(`Token: ${token}\nEmail: ${email}\nUser ID: ${userId}`);

    // Vérifier le token
    checkToken.mutate({ token, email, userId });
  }, [token, email, userId]);

  const onSubmit = (data) => {
    console.log(data);

    changePassword.mutate(data);
  };

  return (
    <div>
      {!user?.id && (
        <RegisterButton texte="Se connecter" handleSwitch={switchToRegister} />
      )}
      <div className="tw-right-[15%] tw-h-screen tw-top-0 tw-fixed tw-flex tw-items-center max-sm:tw-justify-center max-sm:tw-right-0">
        <div className="max-sm:tw-w-[80%] tw-w-[400px] tw-bg-white tw-shadow-2xl tw-rounded-lg ">
          <div className="p-3 tw-rounded-lg tw-border tw-border-gray-300 tw-m-3">
            <div className="">
              <Logo />
            </div>
            <p className="h5 fw-semibold bariecito-policy">Mot de passe</p>
            <p className="mb-3 text-muted op-7 fw-normal">
              Saisissez votre nouveau passe
            </p>

            <div className="text-center my-4 authentication-barrier">
              <span className="tw-text-orange-500 bariecito-policy">
                AUDIT-QCM
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="row gy-3">
              <div className="col-xl-12">
                <label
                  htmlFor="signup-confirmpassword"
                  className="form-label text-default"
                >
                  Mot de passe
                </label>

                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control form-control-lg ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    placeholder="Mot de passe"
                    {...register("password", {
                      required: "Le mot de passe est obligatoire",
                      minLength: {
                        value: 6,
                        message: "Au moins 06 caractères.",
                      },
                    })}
                  />

                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                  </button>
                </div>
              </div>

              <div className="col-xl-12 mb-3">
                <label
                  htmlFor="signup-confirmpassword"
                  className="form-label text-default"
                >
                  Confirmation
                </label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control form-control-lg ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="confirm"
                    placeholder="Mot de passe"
                    {...register("confirm", {
                      required: "Le mot de passe est obligatoire",
                      minLength: {
                        value: 6,
                        message: "Au moins 06 caractères.",
                      },
                    })}
                  />

                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                  </button>
                </div>
              </div>

              <div className="col-xl-12 d-grid mt-2">
                <button
                  type="submit"
                  className="btn btn-success bariecito-policy"
                  disabled={changePassword.isLoading}
                >
                  {changePassword.isLoading ? "Chargement..." : "Modifier"}
                </button>
              </div>
            </form>
            <div className="text-center">
              <p className="fs-12 text-muted mt-4">
                Vous avez déjà un compte?
                <a
                  href="#"
                  className="text-success"
                  onClick={() => onSwitch("login")}
                >
                  Connectez-vous
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ajouter la validation des props
RestPassword.propTypes = {
  token: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  onSwitch: PropTypes.func.isRequired,
};

export default RestPassword;
