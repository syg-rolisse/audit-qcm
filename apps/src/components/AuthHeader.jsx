import TopBar from "../components/TopBar";

const AuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleFullOverlay = () => {
    //setOverlay(value);
  };

  return (
    <div>
      <header className="tw-bg-transparent tw-absolute tw-right-2 tw-top-2">
        <div className="main-header-container container-fluid">
          <div className="header-content-left"></div>

          <div className="header-content-right">
            <div className="header-element header-search d-lg-none d-block"></div>

            {/* <div className="header-element header-theme-mode"> */}
            {/* <div
              className={`header-element header-theme-mode ${user?.id} ? 'tw-mr-4' : 'tw-mr-0' tw-mt-6 `}
            >
              <a href="#" className="header-link layout-setting tw-bg-zinc-200 tw-flex tw-justify-center tw-items-center">
                <span className="light-layout">
                  <i className="bx bx-moon fe-moon header-link-icon"></i>
                </span>
                <span className="dark-layout">
                  <i className="bx bx-sun header-link-icon"></i>
                </span>
              </a>
            </div> */}

            <div className="-tw-mt-3">
              {user?.id && <TopBar fullOverlay={handleFullOverlay} />}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AuthHeader;
