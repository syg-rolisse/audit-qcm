import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosConfig";

function ForgotPassword({ onSwitch }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchVerifEmail = useMutation(
    (data) =>
      axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/verif_email?email=${
          data.email
        }`
      ),
    {
      onSuccess: (response) => {
        toast.success(response?.data?.message, { duration: 12000 });
        // Appel de reset ici, supposant qu'il est défini ailleurs dans votre code
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
          toast.error(error?.response?.data?.error, {
            duration: 3000,
            style: {
              zIndex: 9999,
            },
          });
        }

        // toast.error(error?.response?.data?.error, { autoClose: 1000 });
      },
    }
  );

  const onSubmit = (data) => {
    console.log(data);

    fetchVerifEmail.mutate(data);
  };

  return (
    <div className="row justify-content-center align-items-center tw-h-screen">
      <div className="col-xxl-5 col-xl-7 col-lg-5 col-md-5 col-sm-8 col-10 max-sm:tw-mt-2">
        <div className="p-3 tw-border tw-border-zinc-500 tw-rounded-lg">
          <div className="mb-3">
            <a href="index.html">
              <img
                src="../assets/images/brand-logos/desktop-logo.png"
                alt=""
                className="authentication-brand desktop-logo"
              />
              <img
                src="../assets/images/brand-logos/desktop-white.png"
                alt=""
                className="authentication-brand desktop-dark"
              />
            </a>
          </div>
          <p className="h5 fw-semibold mb-2 bariecito-policy">
            Mot de passe oublié
          </p>
          <p className="mb-3 text-muted op-7 fw-normal">
            Entrez votre adresse email pour recevoir un lien de
            réinitialisation.
          </p>

          <div className="text-center my-5 authentication-barrier">
            <span className="tw-text-orange-500 bariecito-policy">
              AUDIT-QCM
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="row gy-3">
            <div className="col-xl-12 mb-3">
              <label htmlFor="email" className="form-label text-default">
                Adresse email
              </label>
              <input
                type="email"
                className={`form-control form-control-lg ${
                  errors.email ? "is-invalid" : ""
                }`}
                id="email"
                placeholder="Votre adresse email..."
                {...register("email", {
                  required: "Adresse email est obligatoire",
                })}
              />
            </div>
            <div className="col-xl-12 d-grid mt-2">
              <button
                type="submit"
                className="btn btn-success bariecito-policy"
                disabled={fetchVerifEmail.isLoading}
              >
                {fetchVerifEmail.isLoading
                  ? "Chargement..."
                  : "Envoyer le lien"}
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="fs-12 text-muted mt-4">
              Retourner à la{" "}
              <a
                href="#"
                className="text-success"
                onClick={() => onSwitch("login")}
              >
                Connexion
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {
  onSwitch: PropTypes.func.isRequired,
};

export default ForgotPassword;
