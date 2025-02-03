import { useKKiaPay } from "kkiapay-react";

const KKiaPayButton = ({
  testId,
  amount,
  apiKey,
  email,
  phone,
  sandbox = true,
  onSuccess,
  onError,
  onClose,
}) => {
  const { openKkiapayWidget } = useKKiaPay();

  function handleClick() {
    openKkiapayWidget({
      amount,
      api_key: apiKey,
      sandbox,
      email,
      phone,
      onSuccess,
      onError,
      onClose,
    });
  }

  const fetchCloseRound = useMutation(
    (data) =>
      axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/kkiaPayed?testId=${testId}`,
        data
      ),
    {
      onSuccess: (response) => {
        //console.log(response);
        if (response?.data?.status === "SUCCESS") {
          toast.success("Paiement effectué avec succès !", {
            duration: 12000,
            position: "bottom-right",
            style: {
              zIndex: 9999,
            },
          });

          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } else {
          toast.error(
            "Echec de l'opération. Si votre compte  a malgré été défacqué, ne vous inquiétez pas. Contactez Ora ADVICES",
            {
              duration: 12000,
              position: "bottom-right",
              style: {
                zIndex: 9999,
              },
            }
          );
        }

        setTimeout(() => {
          window.location.reload();
        }, 4000);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.error ||
            error?.response?.data?.message ||
            error?.response?.data,
          {
            duration: 12000,
            position: "bottom-right",
            style: {
              zIndex: 9999,
            },
          }
        );
      },
    }
  );

  const { addKkiapayListener, removeKkiapayListener } = useKKiaPay();

  // ..... others components options
  function successHandler(response) {
    console.log(response);
    const data = {
      transactionId: response?.transactionId,
    };
    fetchCloseRound.mutate(data);
  }

  function failureHandler(error) {
    console.log(error);
  }

  useEffect(() => {
    addKkiapayListener("success", successHandler);
    addKkiapayListener("failed", failureHandler);

    return () => {
      removeKkiapayListener("success", successHandler);
      removeKkiapayListener("failed", failureHandler);
    };
  }, [addKkiapayListener, removeKkiapayListener]);

  return (
    <button onClick={handleClick} className="btn btn-danger">
      KkiaPaye
    </button>
  );
};

// Validation des props avec PropTypes
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../config/axiosConfig";

KKiaPayButton.propTypes = {
  testId: PropTypes.number,
  amount: PropTypes.string.isRequired, // Montant à débiter, requis
  apiKey: PropTypes.string.isRequired, // Clé API de Kkiapay, requise
  email: PropTypes.string, // Adresse email de l'utilisateur, optionnelle
  phone: PropTypes.string, // Numéro de téléphone de l'utilisateur, optionnel
  sandbox: PropTypes.bool, // Mode sandbox ou production, optionnel (par défaut à `true`)
  onSuccess: PropTypes.func, // Fonction appelée en cas de succès, optionnelle
  onError: PropTypes.func, // Fonction appelée en cas d'erreur, optionnelle
  onClose: PropTypes.func, // Fonction appelée en cas de fermeture du widget, optionnelle
};

export default KKiaPayButton;
