import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import DeleteUser from "../../../components/User/DeleteUser";
import UpdateUser from "../../../components/User/UpdateUser";
import axiosInstance from "../../../config/axiosConfig";

function IndexUser() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [meta, setMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [perpage, setPerPage] = useState(5);
  const [currentUserId, setCurrentUserId] = useState();
  const [currentDeleteUserId, setDeleteUserId] = useState();
  const [status] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const fetchUsers = useMutation(
    (params) =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/allUsers?page=${
          params.page
        }&perpage=${params.perpage}&status=${status}`
      ),
    {
      onSuccess: (response) => {
        setUsers(response?.data?.users?.data); // Enregistrer les données
        setAllUsers(response?.data?.allUsers);
        setMeta(response?.data?.users?.meta);
      },
      onError: (error) => {
        if (error.response.data.includes("Désolé")) {
          toast.error(error.response?.data, { duration: 5000 });
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage(error.response.data)?.error;
          toast.error(error?.response?.data?.error, { autoClose: 1000 });
        }
      },
    }
  );

  const refreshUserList = () => {
    fetchUsers.mutate({ page, perpage });
    setCurrentUserId(null);
    setDeleteUserId(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers =
    searchTerm.trim() === ""
      ? users
      : allUsers.filter((elem) => {
          const isWordingMatch = elem.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const isPhoneNumberMatch = elem.phoneNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const isAdressMatch = elem.address
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const isIdMatch = elem.id.toString().includes(searchTerm);

          return (
            isWordingMatch || isIdMatch || isPhoneNumberMatch || isAdressMatch
          );
        });

  useEffect(() => {
    fetchUsers.mutate({ page, perpage });
  }, [page, perpage]);

  const handleEditClick = (userId) => {
    setCurrentUserId(userId);
    setForceUpdate((prev) => !prev);
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  return (
    <div>
      <div className="">
        <div className="p-3 header-secondary row">
          <div className="col">
            <div className="d-flex">
              <a
                className="btn tw-bg-orange-600 tw-text-white tw-flex tw-justify-center tw-items-center"
                href="#"
              >
                <i className="fe fe-rotate-cw me-1 mt-1"></i> Audit-Qcm
              </a>
            </div>
          </div>
          <div className="col col-auto">
            <div className="btn-list">
              <a className="btn btn-outline-light border" href="#">
                <i className="fe fe-help-circle me-1 mt-1"></i> Support
              </a>
              <a
                className="btn tw-bg-green-600 tw-text-white tw-font-semibold me-0"
                href="#"
              >
                <i className="bx bx-key side-menu__icon"></i> Performance
              </a>
            </div>
          </div>
        </div>
        <div className="container-fluid tw-mt-4">
          <div className="col-xl-12">
            <div className="card custom-card">
              <div className="card-header justify-content-between">
                <div className="card-title">Liste des users</div>
                <div className="btn-group btn-sm">
                  <UpdateUser
                    currentUserId={currentUserId}
                    forceUpdate={forceUpdate}
                    refreshUserList={refreshUserList}
                  />
                </div>
              </div>
              <div className="card-body card-border tw-rounded-md tw-m-5">
                <div className="d-sm-flex mb-4 justify-content-between">
                  <div className="tw-flex tw-items-center tw-gap-2 ">
                    <span>Voir</span>
                    <select
                      className="form-select form-select-sm tw-h-10"
                      aria-label="Entries Select"
                      onChange={handlePerPageChange}
                      value={perpage}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                  </div>

                  <div className="d-flex gap-2 mt-sm-0  tw-w-full ">
                    <div className="tw-w-full max-sm:tw-mt-2 tw-ml-3">
                      <input
                        className="form-control form-control-xl tw-w-full"
                        type="text"
                        placeholder="Recherchez une thématique ici..."
                        aria-label="Search Input"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <div>
                    <table
                      className="customTable table table-bordered text-nowrap mb-0"
                      id="projectSummary"
                    >
                      <thead>
                        <tr>
                          <th className="wd-5p tx-center fw-bold"></th>
                          <th className="wd-5p tw-text-center fw-bold">N°</th>
                          <th className="wd-25p fw-bold">
                            Nom & Prénom | E-mail
                          </th>
                          <th className="wd-25p tw-text-center fw-bold">
                            Contact
                          </th>
                          <th className="wd-25p tw-text-center fw-bold">
                            Photo
                          </th>
                          <th className="fw-bold tw-text-center">Adresse</th>
                          <th className="fw-bold tw-text-center">
                            Mail valide
                          </th>
                          <th className="fw-bold tw-text-center">Profil</th>
                          <th className="fw-bold tw-text-center">Status</th>
                          <th className="fw-bold tw-text-center">Ajouter le</th>
                          <th className="fw-bold tw-text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fetchUsers.isLoading && (
                          <tr>
                            <td colSpan="10" className="text-center">
                              <Spinner />
                            </td>
                          </tr>
                        )}
                        {fetchUsers.isError && (
                          <tr>
                            <td colSpan="10" className="text-center">
                              <span className="tw-text-red-500 tw-bg-white tw-font-semibold tw-p-2 tw-rounded-md">
                                Erreur : {errorMessage}
                              </span>
                            </td>
                          </tr>
                        )}
                        {!fetchUsers.isLoading &&
                          !fetchUsers.isError &&
                          filteredUsers.map((user, index) => (
                            <tr key={index}>
                              <td align="center">
                                <span className="avatar avatar-sm rounded-full shadow-lg w-6 h-6 overflow-hidden tw-mt-3">
                                  <img
                                    src="assets/images/icons/std1.jpg"
                                    alt="img"
                                    className="w-6 h-6 object-cover"
                                  />
                                </span>
                              </td>

                              <td align="center" className="tx-center">
                                <span className="tag tag-orange">
                                  {user.id}
                                </span>
                              </td>
                              <td className="">
                                <div className="tw-pt-1">
                                  <h3 className="">{user?.fullName}</h3>
                                  <h4 className="tw-mt-0 op-4">
                                    {user?.email}
                                  </h4>
                                </div>
                              </td>
                              <td align="center">
                                <span className="">{user.phoneNumber}</span>
                              </td>
                              <td align="center">
                                <img
                                  src={`${
                                    import.meta.env.VITE_BACKEND_URL
                                  }/uploads/${
                                    user?.avatarUrl
                                      ? user.avatarUrl
                                      : "avatars/ri3uadefault.png"
                                  }`}
                                  alt="Avatar"
                                  style={{
                                    width: "35px",
                                    height: "35px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                  }}
                                />
                              </td>

                              <td align="center">
                                <span className="">{user.address}</span>
                              </td>

                              <td className="text-center">
                                <span
                                  className={`badge badge-sm rounded-pill ${
                                    user.validEmail
                                      ? "bg-success-transparent text-success"
                                      : "bg-danger-transparent text-danger"
                                  }`}
                                >
                                  {user.validEmail ? "Valide" : "Invalide"}
                                </span>
                              </td>

                              <td className="text-center">
                                <span
                                  className={`badge badge-sm rounded-pill ${
                                    user.Profil?.wording === "Admin"
                                      ? "bg-success-transparent text-success"
                                      : "bg-warning-transparent text-warning"
                                  }`}
                                >
                                  {user.Profil?.wording}
                                </span>
                              </td>

                              <td className="text-center">
                                <span
                                  className={`badge badge-sm rounded-pill ${
                                    user.status
                                      ? "bg-success-transparent text-success"
                                      : "bg-danger-transparent text-danger"
                                  }`}
                                >
                                  {user.status ? "Actif" : "Inactif"}
                                </span>
                              </td>
                              <td className="tw-text-center">
                                {new Date(user.createdAt).toLocaleDateString(
                                  "fr-CA",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  }
                                )}
                              </td>

                              <td className="">
                                <div className="tw-space-x-2 d-flex justify-content-center align-items-center">
                                  <a
                                    onClick={() => handleEditClick(user.id)}
                                    className="btn btn-icon btn-sm btn-primary-transparent rounded-pill"
                                  >
                                    <i className="ri-edit-line"></i>
                                  </a>
                                  <a
                                    onClick={() => handleDeleteClick(user.id)}
                                    className="btn btn-icon btn-sm btn-danger-transparent rounded-pill"
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </a>
                                  {currentDeleteUserId && (
                                    <DeleteUser
                                      currentDeleteUserId={currentDeleteUserId}
                                      refreshUserList={refreshUserList}
                                    />
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="d-flex align-items-center">
                  <div>
                    Afficher les {perpage} suivant
                    <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
                  </div>
                  <div className="ms-auto">
                    <nav
                      aria-label="Page navigation"
                      className="pagination-style-4"
                    >
                      <ul className="pagination mb-0">
                        <li
                          className={`page-item ${
                            meta.previousPageUrl ? "" : "disabled"
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setPage(meta.currentPage - 1)}
                            disabled={!meta.previousPageUrl}
                          >
                            Prev
                          </button>
                        </li>
                        {[...Array(meta.lastPage).keys()].map((num) => (
                          <li
                            key={num + 1}
                            className={`page-item ${
                              meta.currentPage === num + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setPage(num + 1)}
                            >
                              {num + 1}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            meta.nextPageUrl ? "" : "disabled"
                          }`}
                        >
                          <button
                            className="page-link text-primary"
                            onClick={() => setPage(meta.currentPage + 1)}
                            disabled={!meta.nextPageUrl}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
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

export default IndexUser;
