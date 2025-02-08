import PropTypes from "prop-types";
const WaveBanner = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 400">
    <defs>
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#16a085", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#0078d4", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#waveGradient)"
      d="M0,200L48,230C96,260,192,330,288,350C384,370,480,360,576,300C672,240,768,210,864,220C960,230,1056,270,1152,290C1248,310,1344,330,1392,330L1440,330L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    />
  </svg>
);

function TextOverWave({ texte1, texte2 }) {
  return (
    <div className="">
      <div className="tw-absolute tw-top-5 tw-left-1/2 tw-transform tw--translate-x-1/2 tw-opacity-10 max-lg:tw-left-52">
        <div className="tw-mt-8">
          <h1 className="text-filigranne tw-md:text-6xl tw-leading-tight tw-font-bold">
            ORA ADVICES
          </h1>
        </div>
      </div>

      <WaveBanner />

      <div className="tw-absolute tw-top-5 tw-left-1/2 tw-transform tw--translate-x-1/2 tw-text-center tw-text-white tw-font-extrabold tw-text-5xl tw-p-6 tw-transition-all tw-duration-500 tw-ease-in-out max-lg:tw-left-52 block-text12">
        <div className="tw-flex tw-items-center">
          <div className="tw-mx-16">
            <h1 className="banniere-title tw-text-5xl tw-md:text-6xl tw-leading-tight tw-font-bold tw-text-gray-100 ">
              TEST DE PERFORMANCE
            </h1>
            <div className="tw-text-lg tw-md:text-xl tw-mt-4 tw-mx-6">
              <span className="texte1 tw-font-semibold tw-text-gray-300">
                {texte1}
              </span>
              <br />
              <div className="text2 tw-text-yellow-400 tw-font-bold tw-mt-4">
                {texte2}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TextOverWave.propTypes = {
  texte1: PropTypes.string.isRequired,
  texte2: PropTypes.string.isRequired,
};

export default TextOverWave;
