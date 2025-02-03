import PropTypes from "prop-types";
import { useState } from "react";

function ProfileComponent({ onClose }) {
  return (
    <div className="modal-overlay tw-z-50 tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full card tw-flex tw-justify-center tw-items-center">
      <div className="container-fluid">
        <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
          <div className="">
            <div className="">
              <nav>
                <ol className="breadcrumb mb-1 mb-md-0">
                  <li className="breadcrumb-item">
                    <a href="#">Pages</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {" "}
                    Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="ms-auto pageheader-btn">
            <nav>
              <div className="breadcrumb mb-0">
                <div className="d-flex">
                  <a
                    href="#"
                    onClick={onClose}
                    className="btn btn-secondary text-fixed-white"
                    data-bs-toggle="tooltip"
                    title=""
                    data-placement="bottom"
                    data-original-title="Rating"
                  >
                    <span>
                      <i className="fe fe-star"></i>
                    </span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* Page Header Close */}

        {/* ROW-1 OPEN */}
        <div className="row">
          <div className="col-xl-12">
            <div className="card custom-card main-content-body-profile">
              <nav className="nav main-nav-line mb-0">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#tab1over"
                >
                  Overview
                </a>
                <a className="nav-link" data-bs-toggle="tab" href="#tab2rev">
                  Reviews
                </a>
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab4account"
                >
                  Account Settings
                </a>
              </nav>
              <div className="card-body tab-content p-0 h-100">
                <div className="tab-pane border-0 active" id="tab1over">
                  <div className="main-content-label fs-13 mg-b-20">
                    Personal Information
                  </div>
                  <div className="table-responsive ">
                    <div className="main-img-user profile-user">
                      <img alt="" src="../assets/images/faces/6.jpg" />
                      <a className="bi bi-camera profile-edit" href=""></a>
                    </div>
                    <div className="d-flex justify-content-between mg-b-20">
                      <div>
                        <h6 className="main-profile-name">Petey Cruiser</h6>
                        <p className="main-profile-name-text">Web Designer</p>
                      </div>
                    </div>

                    <table className="table row table-borderless">
                      <tbody className="col-lg-12 col-xl-6 p-0">
                        <tr>
                          <td>
                            <strong>Full Name :</strong> Petey Cruiser
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Location :</strong> UK
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Languages :</strong> English, German,
                            Spanish.
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="col-lg-12 col-xl-6 p-0">
                        <tr>
                          <td>
                            <strong>Website :</strong> domain.com
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Email :</strong> klomitoor@domain.com
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Phone :</strong> +125 254 3562{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default function Profile() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <a
        href="#"
        onClick={openModal}
        className="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 tw-hover:bg-gray-100"
      >
        Profil
      </a>

      {isModalOpen && <ProfileComponent onClose={closeModal} />}
    </div>
  );
}
