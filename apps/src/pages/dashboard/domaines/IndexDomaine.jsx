import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CreateDomain from "../../../components/Domaines/CreateDomain";
import DeleteDomain from "../../../components/Domaines/DeleteDomain";
import Spinner from "../../../components/Spinner";
import axiosInstance from "../../../config/axiosConfig";

function IndexDomaine({ onSwitch }) {
  const [domains, setDomains] = useState([]);
  const [allDomains, setAllDomain] = useState([]);
  const [meta, setMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [perpage, setPerPage] = useState(5);
  const [currentDomainId, setDomainId] = useState();
  const [currentDeleteDomainId, setDeleteDomainId] = useState();
  const [status] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);
  const fetchDomains = useMutation(
    (params) =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/allDomain?page=${
          params.page
        }&perpage=${params.perpage}&status=${status}`
      ),
    {
      onSuccess: (response) => {
        setDomains(response?.data?.domains?.data); // Enregistrer les données
        setAllDomain(response?.data?.allDomains);
        console.log(response?.data?.allDomains);

        setMeta(response?.data?.domains?.meta);
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

  // eslint-disable-next-line no-unused-vars
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  const filteredDomains =
    searchTerm.trim() === ""
      ? domains // Retourne
      : allDomains.filter((elem) => {
          const isWordingMatch = elem.wording
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const isIdMatch = elem.id.toString().includes(searchTerm);

          return isWordingMatch || isIdMatch;
        });

  const refreshDomain = () => {
    setDomainId(null);
    fetchDomains.mutate({ page, perpage });
    setDeleteDomainId(null);
  };

  useEffect(() => {
    fetchDomains.mutate({ page, perpage });
  }, [page, perpage]);

  const handleEditClick = (domainId) => {
    setDomainId(domainId);
    setForceUpdate((prev) => !prev); 
  };

  const handleDeleteClick = (domainId) => {
    setDeleteDomainId(domainId);
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
                <div className="card-title">Liste des domaines</div>
                <div className="btn-group btn-sm">
                  <CreateDomain
                    currentDomainId={currentDomainId}
                    forceUpdate={forceUpdate}
                    refreshDomain={refreshDomain}
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
                        placeholder="Recherchez un domaine ici..."
                        aria-label="Search Input"
                        value={searchTerm}
                        // onChange={handleSearchChange}
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
                          <th className="wd-25p fw-bold">Thématiques</th>
                          <th className="wd-25p fw-bold">Domaines</th>
                          {/* <th className="wd-25p tw-text-center fw-bold">
                            Point
                          </th> */}
                          <th className="fw-bold tw-text-center">Status</th>
                          <th className="fw-bold tw-text-center">Ajouter le</th>
                          <th className="fw-bold tw-text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fetchDomains.isLoading && (
                          <tr>
                            <td colSpan="8" className="text-center">
                              <Spinner />
                            </td>
                          </tr>
                        )}
                        {fetchDomains.isError && (
                          <tr>
                            <td colSpan="8" className="text-center">
                              <span className="tw-text-red-500 tw-bg-white tw-font-semibold tw-p-2 tw-rounded-md">
                                Erreur : {errorMessage}
                              </span>
                            </td>
                          </tr>
                        )}
                        {!fetchDomains.isLoading &&
                          !fetchDomains.isError &&
                          filteredDomains.length === 0 && (
                            <tr>
                              <td colSpan="8" className="text-center">
                                <span className="tw-text-red-500 tw-bg-white tw-font-semibold tw-p-2 tw-rounded-md">
                                  Aucune donnée disponible
                                </span>
                              </td>
                            </tr>
                          )}
                        {!fetchDomains.isLoading &&
                          !fetchDomains.isError &&
                          filteredDomains.length > 0 &&
                          filteredDomains.map((domain, index) => (
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
                                  {domain.id}
                                </span>
                              </td>

                              {/* Afficher la thématique uniquement sur la première ligne */}
                              {index === 0 ||
                              domain?.Thematiques?.wording !==
                                domains[index - 1]?.Thematiques?.wording ? (
                                <td
                                  rowSpan={
                                    domains.filter(
                                      (d) =>
                                        d?.Thematiques?.wording ===
                                        domain?.Thematiques?.wording
                                    ).length
                                  }
                                >
                                  <span className="">
                                    {domain?.Thematiques?.wording}
                                  </span>
                                </td>
                              ) : null}

                              <td>
                                <span className="">{domain?.wording}</span>
                              </td>
                              {/* <td align="center">
                                <span className="tag tag-orange">
                                  {domain.point}
                                </span>
                              </td> */}
                              <td className="text-center">
                                <span
                                  className={`badge badge-sm rounded-pill ${
                                    domain.status
                                      ? "bg-success-transparent text-success"
                                      : "bg-danger-transparent text-danger"
                                  }`}
                                >
                                  {domain.status ? "Actif" : "Inactif"}
                                </span>
                              </td>
                              <td className="tw-text-center">
                                {new Date(domain.createdAt).toLocaleDateString(
                                  "fr-CA",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  }
                                )}
                              </td>
                              <td className="">
                                <div className="d-flex justify-content-center align-items-center tw-space-x-2">
                                  <a
                                    onClick={() =>
                                      onSwitch(`question`, domain.id)
                                    }
                                    title="Question"
                                    className="btn btn-icon btn-sm btn-primary-transparent rounded-pill"
                                  >
                                    <i className="ri-question-line"></i>
                                  </a>
                                  <a
                                    onClick={() => handleEditClick(domain.id)}
                                    className="btn btn-icon btn-sm btn-primary-transparent rounded-pill"
                                  >
                                    <i className="ri-edit-line"></i>
                                  </a>
                                  <a
                                    onClick={() => handleDeleteClick(domain.id)}
                                    className="btn btn-icon btn-sm btn-danger-transparent rounded-pill"
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </a>
                                  {currentDeleteDomainId && (
                                    <DeleteDomain
                                      currentDeleteDomainId={
                                        currentDeleteDomainId
                                      }
                                      refreshDomain={refreshDomain}
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

IndexDomaine.propTypes = {
  onSwitch: PropTypes.func,
};

export default IndexDomaine;
