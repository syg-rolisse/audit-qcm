import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function ModalProgress({ show, duration = 5000, onClose }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (show) {
      const intervalDuration = 50; // Intervalle de mise à jour en millisecondes
      const increment = 100 / (duration / intervalDuration); // Incrément par intervalle
      let currentProgress = 0;

      const progressInterval = setInterval(() => {
        currentProgress += increment;
        setProgress(Math.min(currentProgress, 100)); // Limiter la progression à 100%

        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(onClose, 500); // Fermer après une pause de 500ms
        }
      }, intervalDuration);

      return () => clearInterval(progressInterval); // Nettoyer l'intervalle à la fermeture
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="modal-overlay-progressbar">
      <div className="modal-content-progressbar">
        <h3 className="tw-text-gray-800 tw-font-bold tw-text-xl">Chargement du test en cours...</h3>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
              transition: "width 50ms linear",
            }}
          ></div>
        </div>
        <p className="progress-percentage tw-font-bold">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

ModalProgress.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.bool,
  duration: PropTypes.number,
};

export default ModalProgress;
