import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
function Login({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const fetchLogin = useMutation(
    (data) =>
      axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/login`,
        data
      ),
    {
      onSuccess: (response) => {
        const user = response?.data?.user;

        console.log(user);

        localStorage.setItem("user", JSON.stringify(user));

        switch (user?.profilId) {
          case 1:
            toast.success("Connexion réussie !", { duration: 1000 });
            setTimeout(() => {
              navigate("/dashboard");
            }, 1200);
            break;

          case 3:
            setTimeout(() => {
              navigate("/thematique");
            }, 1000);
            break;

          case 2:
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
            break;

          default:
            toast.error("Profil non identifié", { duration: 3000 });
            break;
        }
      },
      onError: (error) => {
        console.log(error);

        if (
          error?.response?.data?.error &&
          error?.response?.data?.error === "Invalid user credentials"
        ) {
          toast.error("Identifiant incorrect !", { duration: 1000 });
        } else {
          toast.error(error?.response?.data?.error, { duration: 4000 });
        }
      },
    }
  );

  const onSubmit = (data) => {
    fetchLogin.mutate(data);
  };

  return (
    <div className="row justify-content-center align-items-center tw-h-screen ">
      <div className="col-xxl-5 col-xl-7 col-lg-5 col-md-5 col-sm-8 col-10 max-sm:tw-mt-2">
        <div className="p-3 tw-border tw-border-zinc-500 tw-rounded-lg">
          <div className="mb-3">
            <span className="tw-text-orange-500 tw-text-2xl tw-font-bold bariecito-policy">
              ORA
            </span>
          </div>
          <p className="h5 fw-semibold bariecito-policy">Connexion</p>
          <p className="mb-3 text-muted op-7 fw-normal">
            Renseigner vos identifiants pour vous connecter !
          </p>

          <div className="text-center my-5 authentication-barrier">
            <span className="tw-text-orange-500 bariecito-policy">
              AUDIT-QCM
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="row gy-3">
            <div className="col-xl-12 mt-0">
              <label
                htmlFor="signin-username"
                className="form-label text-default"
              >
                Nom d&apos;utilisateur
              </label>
              <input
                type="text"
                className={`form-control form-control-lg  ${
                  errors.email ? "is-invalid" : ""
                }`}
                id="signin-username"
                placeholder="Nom d'utilisateur"
                {...register("email", {
                  required: "L'email est obligatoire",
                })}
              />

              <div className="invalid-feedback">
                <span className="tw-float-right">
                  {errors.email && errors.email.message}
                </span>
              </div>
            </div>
            <div className="col-xl-12 mb-3">
              <label
                htmlFor="signin-password"
                className="form-label text-default d-block"
              >
                Mot de passe
                <a
                  href="#"
                  className="float-end text-danger bariecito-policy"
                  onClick={() => onSwitch("forgot")}
                >
                  Mot de passe oublié ?
                </a>
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control form-control-lg ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="signin-password"
                  placeholder="Mot de passe"
                  {...register("password", {
                    required: "Le mot de passe est obligatoire",
                    minLength: { value: 6, message: "Au moins 06 caractères." },
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    <span className="tw-float-right">
                      {errors.password.message}
                    </span>
                  </div>
                )}
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                </button>
              </div>
            </div>
            <div className="col-xl-12 d-grid mt-2">
              <button
                type="submit"
                className="btn btn-success bariecito-policy"
                disabled={fetchLogin.isLoading}
              >
                {fetchLogin.isLoading ? "Chargement..." : "Se connecter"}
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="fs-12 text-muted mt-4">
              Vous n&apos;avez pas de compte ?{" "}
              <a
                href="#"
                className="text-success"
                onClick={() => onSwitch("register")}
              >
                Inscrivez-vous
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  onSwitch: PropTypes.func,
};
export default Login;
