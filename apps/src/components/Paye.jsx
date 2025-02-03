import { useMutation } from "@tanstack/react-query";
import { FedaCheckoutButton } from "fedapay-reactjs";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import axiosInstance from "../config/axiosConfig";

const Paye = ({ testId, montant }) => {
  const PUBLIC_KEY = "pk_sandbox_JXVRe2Q6LYWAxqt6MjEgW41F";

  const checkoutButtonOptions = {
    public_key: PUBLIC_KEY,
    transaction: {
      amount: montant,
      description: "Airtime",
    },
    currency: {
      iso: "XOF",
    },
    button: {
      class: "btn btn-primary",
      text: `FedaPaye`,
    },
    onComplete: (resp) => {
      const FedaPay = window["FedaPay"];
      if (resp.reason === FedaPay.DIALOG_DISMISSED) {
        // alert("Vous avez fermé la boîte de dialogue");
      } else {
        //  alert("Transaction terminée: " + resp.reason);

        // Extraire les données nécessaires de la réponse
        const data = {
          transactionId: resp.transaction.reference,
          amountDebited: resp.transaction.amount_debited,
          amount: resp.transaction.amount,
          mode: resp.transaction.mode,
          // commission: resp.transaction.commission,
          payerFullname:
            resp.transaction.metadata?.paid_customer?.firstname +
            " " +
            resp.transaction.metadata?.paid_customer?.lastname,
          payerEmail: resp.transaction.metadata?.paid_customer?.email,
          paymentDate: resp.transaction.created_at,
        };

        // Appeler la mutation avec les données
        fedaPayement.mutate(data);
      }

      //console.log(resp.transaction);
    },
  };

  const fedaPayement = useMutation(
    (data) =>
      axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/fedaPayed?testId=${testId}`,
        data
      ),
    {
      onSuccess: () => {
        //console.log(response);
        toast.success("Paiement effectué avec succès !", {
          duration: 3000,
          position: "bottom-right",
          style: {
            zIndex: 9999,
          },
        });

        setTimeout(() => {
          window.location.reload();
        }, 4000);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.error || "Erreur lors du traitement",
          {
            duration: 1000,
            style: {
              zIndex: 9999,
            },
          }
        );
      },
    }
  );

  return (
    <div>
      {testId ? (
        <div>
          {/* <span>{testId}</span> */}
          <FedaCheckoutButton options={checkoutButtonOptions} />
        </div>
      ) : (
        <div>
          <span>Test non identifié. Veuillez actualisé votre page.</span>
        </div>
      )}
    </div>
  );
};

Paye.propTypes = {
  testId: PropTypes.number,
  montant: PropTypes.string,
};

export default Paye;
