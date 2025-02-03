import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UpdatePermission from "../../../components/Permission/UpdatePermission";
import Spinner from "../../../components/Spinner";
import axiosInstance from "../../../config/axiosConfig";

function IndexPermission() {
  const [permissions, setPermission] = useState([]);
  const [meta, setMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [perpage, setPerPage] = useState(5);
  const [currentPermissionId, setDomainId] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const fetchPermission = useMutation(
    () =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/allPermission?`
      ),
    {
      onSuccess: (response) => {
        setPermission(response?.data?.data);
        setMeta(response?.data?.meta);
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

  const refreshPermissionList = () => {
    fetchPermission.mutate();
  };

  useEffect(() => {
    fetchPermission.mutate();
  }, [page, perpage]); // Réexécuter lorsque la page ou la taille de page change

  const handleEditClick = (userId) => {
    setDomainId(userId);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1); // Remettre la page à 1 lorsque la taille de page est changée
  };

  return (
    <div>
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
            <a
              className="btn btn-outline-light border"
              href="#"
            >
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
              <div className="card-title">Liste des permissions</div>
              <div className="btn-group btn-sm">
                <UpdatePermission
                  currentPermissionId={currentPermissionId}
                  refreshPermissionList={refreshPermissionList}
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
                      className="form-control form-control-xl"
                      type="text"
                      placeholder="Faite une recherche ici..."
                      aria-label=".form-control-xl example"
                    />
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table
                  className="customTable table table-bordered text-nowrap mb-0"
                  id="permissionsSummary"
                >
                  <thead>
                    <tr>
                      <th className="wd-5p tx-center fw-bold"></th>
                      <th className="wd-5p tx-center fw-bold tw-text-center">
                        Profil
                      </th>
                      <th className="text-center">
                        Lire <br /> les permissions
                      </th>
                      <th className="text-center">
                        Modifier <br /> une permission
                      </th>
                      <th className="text-center">
                        Lire
                        <br /> un utilisateur
                      </th>
                      <th className="text-center">
                        Créer <br /> un utilisateur
                      </th>
                      <th className="text-center">
                        Modifier <br /> un utilisateur
                      </th>

                      <th className="text-center">
                        Supprimer <br /> un utilisateur
                      </th>
                      <th className="text-center">
                        Lire <br /> un domaine
                      </th>
                      <th className="text-center">
                        Créer <br /> un domaine
                      </th>
                      <th className="text-center">
                        Modifier <br /> un domaine
                      </th>
                      <th className="text-center">
                        Supprimer <br /> un domaine
                      </th>
                      <th className="text-center">
                        Lire <br /> un test
                      </th>
                      <th className="text-center">
                        Créer <br /> un test
                      </th>
                      <th className="text-center">
                        Modifier <br /> un test
                      </th>
                      <th className="text-center">
                        Supprimer <br /> un test
                      </th>
                      <th className="text-center">
                        Lire <br /> une thématique
                      </th>
                      <th className="text-center">
                        Créer <br /> une thématique
                      </th>
                      <th className="text-center">
                        Modifier <br /> une thématique
                      </th>
                      <th className="text-center">
                        Supprimer <br /> une thématique
                      </th>
                      <th className="fw-bold tw-text-center">Ajoutée le</th>
                      <th className="fw-bold tw-text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchPermission.isLoading && (
                      <tr>
                        <td colSpan="22" className="text-center">
                          <Spinner />
                        </td>
                      </tr>
                    )}
                    {fetchPermission.isError && (
                      <td colSpan="22" className="text-center">
                        <span className="tw-text-red-500 tw-bg-white tw-font-semibold tw-p-2 tw-rounded-md">
                          Erreur : {errorMessage}
                        </span>
                      </td>
                    )}
                    {!fetchPermission.isLoading &&
                      !fetchPermission.isError &&
                      permissions.map((permission, index) => (
                        <tr key={index}>
                          <td align="center">
                            <div style={{ width: "100px" }}>
                              <span className="avatar avatar-sm rounded-full shadow-lg w-6 h-6 overflow-hidden tw-mt-3">
                                <img
                                  src="assets/images/icons/std1.jpg"
                                  alt="img"
                                  className="w-6 h-6 object-cover"
                                />
                              </span>
                            </div>
                          </td>

                          <td className="text-center">
                            <div style={{ width: "200px" }}>
                              {permission.Profil?.wording}
                            </div>
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.readPermission}
                              disabled
                            />
                          </td>

                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.updatePermission}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.readUser}
                              disabled
                            />
                          </td>

                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.createUser}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.updateUser}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.deleteUser}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.readDomaine}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.createDomaine}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.updateDomaine}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.deleteDomaine}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.readTest}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.createTest}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.updateTest}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.deleteTest}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.readThematique}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.createThematique}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.updateThematique}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input form-checked-primary tw-w-5 tw-h-5 "
                              type="checkbox"
                              checked={permission.deleteThematique}
                              disabled
                            />
                          </td>
                          <td className="tw-text-center">
                            {new Date(permission.createdAt).toLocaleDateString(
                              "fr-CA",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )}
                          </td>
                          <td className="text-center">
                            <a
                              onClick={() => handleEditClick(permission.id)}
                              className="btn btn-icon btn-sm btn-primary-transparent rounded-pill"
                            >
                              <i className="ri-edit-line"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
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

export default IndexPermission;
