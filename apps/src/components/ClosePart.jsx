import { Modal } from "bootstrap";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function ClosePart({ showModal, closePartConfirmed }) {
  const modalInstanceRef = useRef();
  const prevShowModalRef = useRef();

  const handleClosePart = () => {
    if (showModal) {
      closePartConfirmed();
    }
  };

  useEffect(() => {
    prevShowModalRef.current = showModal;

    const modalElement = document.getElementById("deleteModal");
    if (modalElement) {
      modalInstanceRef.current = new Modal(modalElement, {
        backdrop: "static", // Backdrop désactivé
        keyboard: false, // Désactiver la fermeture avec la touche "Esc"
      });

      // Si showModal est true, montrer le modal
      if (showModal) {
        modalInstanceRef.current.show();
      } else {
        modalInstanceRef.current.hide();
      }
    }

    // Réactiver le backdrop lorsque le modal est fermé
    const modalElementCloseHandler = () => {
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove(); // Enlever le backdrop quand le modal est fermé
      }
    };

    // Écouter la fermeture du modal
    const modalElementClose = modalElement?.querySelector(".btn-close");
    if (modalElementClose) {
      modalElementClose.addEventListener("click", modalElementCloseHandler);
    }

    return () => {
      // Nettoyage de l'écouteur d'événement
      if (modalElementClose) {
        modalElementClose.removeEventListener(
          "click",
          modalElementCloseHandler
        );
      }

      // Enlever les événements associés à l'instance modal
      if (modalInstanceRef.current) {
        modalInstanceRef.current.dispose();
      }
    };
  }, [showModal]);

  return (
    <div className="row">
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content tw-rounded-lg tw-border tw-p-2">
            {/* Modal Header */}
            <div className="modal-header">
              <h5
                className="modal-title tw-text-red-600"
                id="exampleModalLabel"
              >
                Terminer la partie
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <div className="tw-flex tw-items-center tw-justify-center">
                <svg
                  className="custom-alert-icon svg-danger"
                  xmlns="http://www.w3.org/2000/svg"
                  height="3rem"
                  viewBox="0 0 24 24"
                  width="3rem"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z" />
                </svg>
                <h5 className="tw-text-2xl text-danger">Danger</h5>
              </div>
              Êtes-vous sûr(e) de vouloir terminer la partie ?
            </div>
            {/* Modal Footer */}
            <div className="modal-footer d-flex justify-content-center">
              <button
                onClick={handleClosePart}
                className="btn btn-sm btn-outline-success m-1"
              >
                Oui
              </button>
              <button
                data-bs-dismiss="modal"
                className="btn btn-sm btn-danger m-1"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ClosePart.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closePartConfirmed: PropTypes.func.isRequired,
};

export default ClosePart;
