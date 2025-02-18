import PropTypes from "prop-types";

function RegisterButton({ handleSwitch, texte }) {
  return (
    <div className="tw-text-center tw-absolute tw-top-5 tw-right-5">
      <button
        className="tw-register-btn tw-py-1 tw-px-3 tw-text-green-500 tw-bg-white tw-border-2 tw-border-green-500 tw-rounded-full tw-font-semibold tw-text-lg tw-transition-all tw-duration-300 tw-ease-in-out tw-hover:bg-green-500 tw-hover:text-white tw-focus:outline-none hover:tw-bg-green-500 hover:tw-text-white"
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
