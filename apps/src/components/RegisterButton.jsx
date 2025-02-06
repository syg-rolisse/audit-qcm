import PropTypes from "prop-types";

function RegisterButton({ handleSwitch, texte }) {
  return (
    <div className="tw-text-center">
      <button
        className="tw-register-btn tw-py-1 tw-px-3 tw-text-white tw-bg-green-500 tw-border-2 tw-border-green-500 tw-rounded-full tw-font-semibold tw-text-lg tw-transition-all tw-duration-300 tw-ease-in-out tw-hover:bg-white tw-hover:text-green-500 tw-hover:scale-105 tw-focus:outline-none"
        onClick={() => handleSwitch()}
      >
        {texte}
      </button>
    </div>
  );
}

RegisterButton.propTypes = {
  texte: PropTypes.string.isRequired,
  handleSwitch: PropTypes.func,
};

export default RegisterButton;
