import PropTypes from "prop-types";

const Certificat = ({
  studentName,
  totalRound1,
  totalRound2,
  thematique,
  date,
  signature,
}) => {
  const percentage = Math.max(totalRound1, totalRound2);
  const isPassed = percentage >= 70;

  return (
    <div
      id="certificate-container"
      className="tw-rounded-lg tw-text-center certificate-container"
      style={{
        backgroundImage: 'url("./assets/images/media/certificat.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "297mm",
        height: "210mm",
        pageBreakAfter: "always",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <div className="tw-text-left -tw-mt-40 tw-space-y-3">
        <div className="">
          <h1 className="tw-text-2xl tw-text-gray-800 tw-font-bold">
            {thematique}
          </h1>
        </div>

        <div className="student-name tw-text-center">
          <strong className="student-name tw-text-2xl tw-text-gray-700">
            {studentName}
          </strong>
        </div>
        <div className="tw-text-center tw-mt-3">
          <h3 className="tw-text-2xl tw-text-gray-700">Fait le {date}</h3>
        </div>
      </div>

      <div className="tw-mt-12 tw-flex tw-absolute tw-bottom-24 tw-right-56 tw-justify-between tw-items-center certificate-footer">
        <div className="tw-text-center signature-section">
          <img
            src={signature}
            alt="Signature"
            className="tw-h-16 signature-image"
          />
        </div>
      </div>
    </div>
  );
};

Certificat.propTypes = {
  studentName: PropTypes.string,
  totalRound1: PropTypes.number,
  totalRound2: PropTypes.number,
  date: PropTypes.string,
  thematique: PropTypes.string,
  signature: PropTypes.string,
};

Certificat.defaultProps = {
  studentName: "Nom étudiant",
  totalRound1: 0,
  totalRound2: 0,
  date: new Date().toLocaleDateString(),
  thematique: "Thématique",
  signature: "./assets/images/media/signature1.png",
};

export default Certificat;
