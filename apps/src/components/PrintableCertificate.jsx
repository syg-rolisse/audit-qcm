import html2pdf from "html2pdf.js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Certificat from "./Certificat";
import KkiapayButton from "./KkiapayButton";
import Paye from "./Paye";

const PrintableCertificate = ({ currentTest, user, thematique }) => {
  const [studentName, setStudentName] = useState("");
  const [cabinetName] = useState("Ora advices");
  const [totalRound1, setTotalRound1] = useState(0);
  const [totalRound2, setTotalRound2] = useState(0);
  const [date, setDate] = useState("");
  const [signature] = useState("/assets/images/media/signature1.png");
  const [logo] = useState("/assets/images/logo/ora.png");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user && currentTest) {
      setStudentName(user.fullName);
      setTotalRound1(currentTest.totalRound1);
      setTotalRound2(currentTest.totalRound2);
      setDate(new Date(currentTest.updatedAt).toLocaleDateString());
    }
  }, [user, currentTest]);

  const handleDownloadPDF = () => {
    const element = document.getElementById("certificate");
    const options = {
      margin: 0,
      filename: "certificat_de_reussite.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };
    html2pdf().from(element).set(options).save();
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {currentTest?.status ? (
        <button onClick={handleShowModal} className="btn btn-success">
          Afficher le certificat
        </button>
      ) : (
        <div className="">
          <h3 className="tw-mb-4 tw-text-gray-800 tw-text-left">
            <strong>{currentTest?.amountToPay}</strong> est le montant à payer
            pour télécharger votre attestation. Choisissez un mode de payement.
          </h3>
          <div className="tw-flex tw-justify-center tw-space-x-2">
            <Paye testId={currentTest?.id} montant={currentTest?.amountToPay} />
            <div>
              <span className="tw-font-bold tw-text-gray-800">Ou</span>
            </div>
            <KkiapayButton
              testId={currentTest?.id}
              amount={currentTest?.amountToPay}
              apiKey={import.meta.env.VITE_KKIAPAYE_PUBLIC_KEY}
              callback={import.meta.env.VITE_KKIAPAYE_CALLBACK}
              // data="Ref:12345"
              theme="#ff6600"
              position="right"
              sandbox={true}
            />
          </div>
        </div>
      )}

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              maxWidth: "90%",
              maxHeight: "90%",
              overflow: "auto",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              id="certificate"
              style={{
                width: "297mm",
                height: "210mm",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: 'url("/assets/images/media/certificat.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                padding: "10mm",
                boxSizing: "border-box",
                border: "none",
              }}
            >
              <Certificat
                studentName={studentName}
                cabinetName={cabinetName}
                totalRound1={totalRound1}
                totalRound2={totalRound2}
                thematique={thematique}
                date={date}
                signature={signature}
                logo={logo}
              />
            </div>

            <button
              onClick={handleDownloadPDF}
              className="tw-bg-green-600 tw-text-white tw-font-bold"
            >
              Télécharger le certificat en PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

PrintableCertificate.propTypes = {
  currentTest: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  thematique: PropTypes.string.isRequired,
};

export default PrintableCertificate;
