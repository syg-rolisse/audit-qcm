import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types"; // Importer PropTypes
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PrivacyPolicyComponent from "../../components/PrivacyPolicyModal";
import axiosInstance from "../../config/axiosConfig";
import { SocketContext } from "../../context/socket";
import RegisterButton from "../../components/RegisterButton";
import useThemeMode from "../../components/useThemeMode";
import Logo from "../../components/Logo";

function Register({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhone] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const socket = useContext(SocketContext);
  const { themeMode } = useThemeMode();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { phoneNumber: "" } });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const fetchRegister = useMutation(
    (data) =>
      axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/register`,
        data
      ),
    {
      onSuccess: (response) => {
        socket.emit("user_created");
        toast.success(response?.data?.message, { duration: 12000 });
        reset();
        onSwitch("login");
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

        //toast.error(error?.response?.data?.error, { autoClose: 1000 });
      },
    }
  );

  const switchToRegister = () => {
    onSwitch("login");
  };

  const onSubmit = (data) => {
    if (phoneNumber) {
      data.profilId = 3;
      data.phoneNumber = phoneNumber;

      fetchRegister.mutate(data);
    } else {
      toast.error("Veuillez renseigner votre contact.");
    }
  };

  return (
    <div>
      {!user?.id && (
        <RegisterButton texte="Se connecter" handleSwitch={switchToRegister} />
      )}
      <div className="tw-right-[15%] tw-h-screen tw-top-0 tw-fixed tw-flex tw-items-center max-sm:tw-justify-center max-sm:tw-right-0">
        <div className="max-sm:tw-w-[80%] tw-w-[400px] tw-bg-white tw-shadow-2xl tw-rounded-lg tw-max-h-[70vh] tw-overflow-y-auto">
          <div className="p-3 tw-rounded-lg tw-border tw-border-gray-300 tw-m-3">
            <div className="">
              <Logo />
            </div>
            <div className="-tw-mt-12">
              <p className="h5 fw-semibold bariecito-policy">Inscription</p>
              <p className="mb-3 text-muted fw-normal">
                Créer un compte utilisateur gratuitement!
              </p>
              <div className="text-center my-4 authentication-barrier">
                <span className="tw-text-orange-500 bariecito-policy">
                  AUDIT-QCM
                </span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="row gy-3">
                <div className="col-xl-12 mt-0">
                  <label htmlFor="fullName" className="form-label text-default">
                    Nom & Prénoms
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      errors.fullName ? "is-invalid" : ""
                    }`}
                    id="fullName"
                    placeholder="Entrer votre nom et prénoms..."
                    {...register("fullName", {
                      required: "Le nom est obligatoire...",
                    })}
                  />
                </div>
                <div className="col-xl-12">
                  <label htmlFor="email" className="form-label text-default">
                    Adresse mail
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    placeholder="Adresse mail..."
                    {...register("email", {
                      required: "L'email est obligatoire",
                    })}
                  />
                </div>

                <div className="col-xl-12">
                  <label
                    htmlFor="phoneNumber"
                    className="form-label text-default"
                  >
                    Téléphone
                  </label>
                  <PhoneInput
                    name="phoneNumber"
                    country={"bj"}
                    value={phoneNumber}
                    regions={"africa"}
                    inputStyle={{
                      width: "100%",
                      height: "45px",
                      backgroundColor:
                        themeMode === "dark" ? "rgba(28, 39, 55, 1)" : "#fff",
                      border:
                        themeMode === "dark"
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid #ddd",
                      color: themeMode === "dark" ? "#ffffff" : "#000000",
                    }}
                    enableSearch={true}
                    onChange={(phoneNumber, data) => {
                      setPhone(phoneNumber);
                      setValue("phoneNumber", phoneNumber);
                      setValue("countryCode", data.dialCode);
                    }}
                  />
                </div>

                <div className="col-xl-12 ">
                  <label htmlFor="address" className="form-label text-default">
                    Adresse
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    id="address"
                    placeholder="Entrer votre address..."
                    {...register("address", {
                      required: "L'adresse est obligatoire...",
                    })}
                  />
                </div>

                <div className="col-xl-12 mb-3">
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

                  <PrivacyPolicyComponent />
                </div>

                <div className="col-xl-12 d-grid mt-2">
                  <button
                    type="submit"
                    className="btn btn-success bariecito-policy"
                    disabled={fetchRegister.isLoading}
                  >
                    {fetchRegister.isLoading ? "Chargement..." : "S'inscrire"}
                  </button>
                </div>
              </form>
              <div className="text-center">
                <p className="fs-12 text-muted mt-4">
                  Vous avez déjà un compte ?
                  <a
                    href="#"
                    className="text-success tw-pl-1"
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
    </div>
  );
}

// Ajouter la validation des props
Register.propTypes = {
  onSwitch: PropTypes.func.isRequired,
};
export default Register;
