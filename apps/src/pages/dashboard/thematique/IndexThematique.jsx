import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import useSocketEvents from "../../../components/UseSocketEvents";
import CreateThematique from "../../../components/Thematiques/CreateThematique";
import DeleteThematique from "../../../components/Thematiques/DeleteThematique";
import axiosInstance from "../../../config/axiosConfig";
function IndexThematique() {
  const [thematique, setThematique] = useState([]);
  const [allThematique, setAllThematique] = useState([]);
  const [meta, setMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [perpage, setPerPage] = useState(5);
  const [currentThematiqueId, setThematiqueId] = useState();
  const [currentDeleteThematiqueId, setDeleteThematiqueId] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const { shouldRefreshThematique } = useSocketEvents();
  //const [status] = useState(true);

  const fetchThematiques = useMutation(
    (params) =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/allThematiqueDash?page=${
          params.page
        }&perpage=${params.perpage}`
      ),
    {
      onSuccess: (response) => {
        setThematique(response?.data?.thematiques?.data); // Enregistrer les données
        setAllThematique(response?.data?.allThematiques);
        console.log(response?.data?.allThematiques);

        setMeta(response?.data?.thematiques?.meta);
      },
      onError: (error) => {
        if (error?.response?.data?.error.includes("Désolé")) {
          toast.error(error?.response?.data?.error, { duration: 5000 });
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage(error.response.data)?.error;
          toast.error(error?.response?.data?.error, { autoClose: 1000 });
        }
      },
    }
  );

  const refreshThematique = () => {
    setThematiqueId(null);
    fetchThematiques.mutate({ page, perpage });
    setDeleteThematiqueId(null);
  };

  useEffect(() => {
    refreshThematique();
  }, [shouldRefreshThematique]);

  useEffect(() => {
    fetchThematiques.mutate({ page, perpage });
  }, [page, perpage]);

  const handleEditClick = (domainId) => {
    setThematiqueId(domainId);
  };

  const handleDeleteClick = (domainId) => {
    setDeleteThematiqueId(domainId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  const filteredThematique =
    searchTerm.trim() === ""
      ? thematique // Retourne typeDeDepense complet si le searchTerm est vide
      : allThematique.filter((type) => {
          const isWordingMatch = type.wording
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const isIdMatch = type.id.toString().includes(searchTerm);

          return isWordingMatch || isIdMatch;
        });

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
                <div className="card-title">Liste des thématiques</div>
                <div className="btn-group btn-sm">
                  <CreateThematique
                    currentThematiqueId={currentThematiqueId}
                    refreshThematique={refreshThematique}
                  />
                </div>
              </div>
              <div className="card-body card-border tw-rounded-md tw-m-5">
                <div className="d-sm-flex mb-4 tw-space-x-3 justify-content-between">
                  <div className="tw-flex tw-items-center tw-gap-2 ">
                    <span>Voir</span>
                    <select
                      className="form-select form-select-sm tw-h-10 tw-w-20"
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
                          <th className="wd-25p fw-bold">Intitulé</th>
                          <th className="wd-25p fw-bold">Montant à payer</th>
                          <th className="wd-25p fw-bold">Support</th>

                          <th className="wd-25p tw-text-center fw-bold">
                            Total Requis
                          </th>

                          <th className="wd-25p tw-text-center fw-bold">
                            Durée du test
                          </th>

                          <th className="wd-25p tw-text-center fw-bold">
                            Total | Question
                          </th>
                          <th className="wd-25p tw-text-center fw-bold">
                            Cumul | Question
                          </th>
                          <th className="fw-bold tw-text-center">Status</th>
                          <th className="fw-bold tw-text-center">Ajouter le</th>
                          <th className="fw-bold tw-text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fetchThematiques.isLoading && (
                          <tr>
                            <td colSpan="10" className="text-center">
                              <Spinner />
                            </td>
                          </tr>
                        )}
                        {fetchThematiques.isError && (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <span className="tw-text-red-500 tw-bg-white tw-font-semibold tw-p-2 tw-rounded-md">
                                Erreur : {errorMessage}
                              </span>
                            </td>
                          </tr>
                        )}
                        {/* Vérifiez si filteredThematique est vide */}
                        {filteredThematique.length === 0 &&
                          !fetchThematiques.isLoading &&
                          !fetchThematiques.isError && (
                            <tr>
                              <td colSpan="10" className="text-center">
                                <span className="tw-text-gray-500 tw-font-semibold tw-p-2 tw-rounded-md">
                                  Aucune donnée disponible
                                </span>
                              </td>
                            </tr>
                          )}
                        {/* Rendu des thématiques si elles existent */}
                        {!fetchThematiques.isLoading &&
                          !fetchThematiques.isError &&
                          filteredThematique.map((thematique, index) => (
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
                                  {thematique.id}
                                </span>
                              </td>
                              <td>
                                <span className="">{thematique.wording}</span>
                              </td>
                              <td className="tw-text-center">
                                <span className="btn btn-sm btn-success-transparent tw-font-semibold">
                                  {Number(
                                    thematique?.amountToPay
                                  )?.toLocaleString()}
                                </span>
                              </td>

                              <td className="tw-text-center ">
                                <div className="tw-flex tw-justify-center tw-items-center">
                                  {thematique?.supportUrl ? (
                                    <a
                                      className="btn btn-icon btn-sm btn-success-transparent rounded-pill  tw-flex tw-justify-center tw-items-center"
                                      href={`${
                                        import.meta.env.VITE_BACKEND_URL
                                      }/uploads/${thematique?.supportUrl}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <i className="bx bx-download tw-text-green-600 tw-text-lg header-link-icon"></i>
                                    </a>
                                  ) : (
                                    <span
                                      className="btn btn-icon btn-sm btn-danger-transparent rounded-pill  tw-flex tw-justify-center tw-items-center"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <i className="bx bx-x-circle tw-text-red-600 tw-text-lg header-link-icon"></i>
                                    </span>
                                  )}
                                </div>
                              </td>

                              <td align="center">
                                <span className="tag tag-orange">
                                  {thematique?.purcent | 0}
                                </span>
                              </td>

                              <td align="center">
                                <span className="tag tag-orange">
                                  {thematique?.duration | 0}
                                </span>
                              </td>

                              <td align="center">
                                <span className="tag tag-orange">
                                  {thematique?.pointTotalQuestion}
                                </span>
                              </td>
                              <td align="center">
                                <span className="tag tag-orange">
                                  {thematique?.cumul}
                                </span>
                              </td>

                              <td className="text-center">
                                <span
                                  className={`badge badge-sm rounded-pill ${
                                    thematique.status
                                      ? "bg-success-transparent text-success"
                                      : "bg-danger-transparent text-danger"
                                  }`}
                                >
                                  {thematique.status ? "Actif" : "Inactif"}
                                </span>
                              </td>
                              <td className="tw-text-center">
                                {new Date(
                                  thematique.createdAt
                                ).toLocaleDateString("fr-CA", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                })}
                              </td>

                              <td className="">
                                <div className="d-flex tw-space-x-2 justify-content-center align-items-center">
                                  <a
                                    onClick={() =>
                                      handleEditClick(thematique.id)
                                    }
                                    className="btn btn-icon btn-sm btn-primary-transparent rounded-pill "
                                  >
                                    <i className="ri-edit-line"></i>
                                  </a>
                                  <a
                                    onClick={() =>
                                      handleDeleteClick(thematique.id)
                                    }
                                    className="btn btn-icon btn-sm btn-danger-transparent rounded-pill "
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </a>
                                  {currentDeleteThematiqueId && (
                                    <DeleteThematique
                                      currentDeleteThematiqueId={
                                        currentDeleteThematiqueId
                                      }
                                      refreshThematique={refreshThematique}
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

export default IndexThematique;
