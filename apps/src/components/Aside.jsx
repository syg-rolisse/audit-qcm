import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import { useState } from "react";

const Aside = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOverlay, setOverlay] = useState(false);
  const handleFullOverlay = (value) => {
    setOverlay(value);
  };
  return (
    <div>
      <aside
        className={`app-sidebar sticky ${isOverlay ? "-tw-z-40" : ""}`}
        id="sidebar"
      >
        {/* Start::main-sidebar-header main-sidebar-header */}
        <div className="main-sidebar-header tw-p-3 tw-bg-gray-700">
          <a
            href="index.html"
            className="tw-flex tw-justify-center tw-opacity-70"
          >
            <div>
              <img
                src="assets/images/logo/ora.png"
                className="tw-w-20"
                alt="Logo"
              />
              <div className="tw-flex tw-justify-end">
                <p className="tw-font-bold tw-text-sm tw-text-green-600">
                  ADVICES
                </p>
              </div>
            </div>
          </a>
        </div>
        {/* End::main-sidebar-header */}

        {/* Start::main-sidebar */}
        <div className="main-sidebar " id="sidebar-scroll">
          {/* Start::nav */}
          <nav className=" main-menu-container nav nav-pills flex-column sub-open">
            <div className="slide-left" id="slide-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
            </div>
            <ul className="main-menu">
              <li className="slide__category">
                <span className="category-name">PRINCIPALE</span>
              </li>

              <li className="slide">
                <Link to="/dashboard" className="side-menu__item">
                  <i className="bx bx-category side-menu__icon"></i>
                  <span className="side-menu__label">Tableau de board</span>
                </Link>
              </li>

              <li className="slide__category">
                <span className="category-name">Modules</span>
              </li>

              <li className="slide">
                <Link to="/liste-des-thematiques" className="side-menu__item">
                  <i className="bx bx-palette side-menu__icon"></i>{" "}
                  {/* Updated icon */}
                  <span className="side-menu__label">Thématiques</span>
                </Link>
              </li>

              <li className="slide">
                <Link to="/domaines" className="side-menu__item">
                  <i className="bx bx-category side-menu__icon"></i>
                  <span className="side-menu__label">Domaines</span>
                </Link>
              </li>

              <li className="slide">
                <Link to="/liste-des-tests" className="side-menu__item">
                  <i className="bx bx-text side-menu__icon"></i>
                  <span className="side-menu__label">Détails / Tests</span>
                </Link>
              </li>

              <li className="slide__category">
                <span className="category-name">Rôles / Utilisateurs</span>
              </li>

              <li className="slide">
                <Link to="/utilisateurs" className="side-menu__item">
                  <i className="bx bx-user side-menu__icon"></i>
                  <span className="side-menu__label">Utilisateurs</span>
                </Link>
              </li>

              <li className="slide">
                <Link to="/permissions" className="side-menu__item">
                  <i className="bx bx-key side-menu__icon"></i>
                  <span className="side-menu__label">Role & Permissions</span>
                </Link>
              </li>
            </ul>
            <div className="slide-right" id="slide-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
              </svg>
            </div>
          </nav>
          {/* End::nav */}
        </div>
        {/* End::main-sidebar */}
      </aside>
      <div className="-tw-mt-3 tw-absolute tw-top-2 tw-right-0 tw-z-50">
        {user?.id && <TopBar fullOverlay={handleFullOverlay} />}
      </div>
    </div>
  );
};

export default Aside;
