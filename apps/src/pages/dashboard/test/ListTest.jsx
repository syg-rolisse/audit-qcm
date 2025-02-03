import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteTest from "../../../components/ListTest/DeleteTest";
import TestDetail from "../../../components/ListTest/TestDetail";
import Spinner from "../../../components/Spinner";
import axiosInstance from "../../../config/axiosConfig";
import { SocketContext } from "../../../context/socket";

function ListTest() {
  const [currentTest, setCurrentTest] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [meta, setMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [perpage, setPerPage] = useState(5);
  const [testId, setTestId] = useState();
  const [currentDeleteTestId, setDeleteTestId] = useState();
  const [status] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const socket = useContext(SocketContext);
  const fetchTest = useMutation(
    (params) =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/allTest?page=${
          params.page
        }&perpage=${params.perpage}&status=${status}`
      ),
    {
      onSuccess: (response) => {
        setCurrentTest(response?.data?.tests?.data);
        setAllTests(response?.data?.allTests);
        setMeta(response?.data?.tests?.meta);
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

  const refreshTest = () => {
    fetchTest.mutate({ page, perpage });
    setDeleteTestId(null);
  };

  useEffect(() => {
    fetchTest.mutate({ page, perpage });
  }, [page, perpage]);

  const handleEditClick = (domainId) => {
    setTestId(domainId);
  };

  const handleDeleteClick = (domainId) => {
    setDeleteTestId(domainId);
  };

  useEffect(() => {
    if (socket) {
      const handleSocketTestEvent = () => {
        fetchTest.mutate({ page, perpage });
      };

      socket.on("test_created", handleSocketTestEvent);
      socket.on("answer_added", handleSocketTestEvent);

      return () => {
        socket.off("test_created", handleSocketTestEvent);
        socket.off("answer_added", handleSocketTestEvent);
      };
    }
  }, [socket, fetchTest]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  const filteredTest =
    searchTerm.trim() === ""
      ? currentTest // Retourne typeDeDepense complet si le searchTerm est vide
      : allTests.filter((type) => {
          const isWordingMatch = type.thematiqueWording
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const isUserMatch = type?.user?.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const isIdMatch = type.id.toString().includes(searchTerm);

          const isDateMatch = new Date(type?.createdAt)
            .toLocaleDateString("fr-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .includes(searchTerm);

          return isWordingMatch || isIdMatch || isUserMatch || isDateMatch;
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
                <div className="card-title">Liste des tests</div>
                <div className="btn-group btn-sm">
                  <TestDetail testId={testId} refreshTest={refreshTest} />
                </div>
              </div>
              <div className="card-body">
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
                        placeholder="Recherchez un test ici..."
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
                          <th className="wd-25p fw-bold">Etudiant</th>
                          <th className="wd-25p tw-text-center fw-bold">
                            Intitulé du test
                          </th>
                          <th className="fw-bold tw-text-center">
                            Status round 1
                          </th>
                          <th className="fw-bold tw-text-center">
                            Total round 1
                          </th>
                          <th className="fw-bold tw-text-center">
                            Status round 2
                          </th>
                          <th className="fw-bold tw-text-center">
                            Total round 2
                          </th>
                          <th className="fw-bold tw-text-center">Ajouter le</th>
                          <th className="fw-bold tw-text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fetchTest.isLoading && (
                          <tr>
                            <td colSpan="10" className="text-center">
                              <Spinner />
                            </td>
                          </tr>
                        )}
                        {fetchTest.isError && (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <span className="tw-text-red-500 tw-bg-white tw-font-semibold tw-p-2 tw-rounded-md">
                                Erreur : {errorMessage}
                              </span>
                            </td>
                          </tr>
                        )}
                        {!fetchTest.isLoading &&
                          !fetchTest.isError &&
                          filteredTest.length === 0 && (
                            <tr>
                              <td colSpan="10" className="text-center">
                                <span className="tw-text-red-500 tw-bg-white tw-font-semibold tw-p-2 tw-rounded-md">
                                  Aucune donnée disponible
                                </span>
                              </td>
                            </tr>
                          )}
                        {!fetchTest.isLoading &&
                          !fetchTest.isError &&
                          filteredTest.length > 0 &&
                          filteredTest.map((test, index) => (
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
                                  {test.id}
                                </span>
                              </td>
                              <td>
                                <h3 className="">{test?.user?.fullName}</h3>
                                <h4 className="tw-mt-0 op-4">
                                  {test?.user?.email}
                                </h4>
                              </td>
                              <td>
                                <span className="">
                                  {test.thematique?.wording}
                                </span>
                              </td>

                              <td className="text-center">
                                <span
                                  className={`badge badge-sm rounded-pill ${
                                    test.round1
                                      ? "bg-success-transparent text-success"
                                      : "bg-danger-transparent text-danger"
                                  }`}
                                >
                                  {test.round1 ? "Terminé" : "Non Terminé"}
                                </span>
                              </td>

                              <td className="text-center">
                                <span
                                  className={`badge badge-sm rounded-pill ${
                                    test.totalRound1 >= test.purcent
                                      ? "bg-success-transparent text-success"
                                      : "bg-danger-transparent text-danger"
                                  }`}
                                >
                                  {test.totalRound1 + " %"}
                                </span>
                              </td>

                              <td className="text-center">
                                <span
                                  className={`badge badge-sm rounded-pill ${
                                    test.round2
                                      ? "bg-success-transparent text-success"
                                      : "bg-danger-transparent text-danger"
                                  }`}
                                >
                                  {test.round2 ? "Terminé" : "Non Terminé"}
                                </span>
                              </td>
                              <td className="text-center">
                                <span
                                  className={`badge badge-sm rounded-pill ${
                                    test.totalRound2 >= test.purcent
                                      ? "bg-success-transparent text-success"
                                      : "bg-danger-transparent text-danger"
                                  }`}
                                >
                                  {test.totalRound2 + " %"}
                                </span>
                              </td>

                              <td className="tw-text-center">
                                {new Date(test.createdAt).toLocaleDateString(
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
                                    onClick={() => handleEditClick(test.id)}
                                    className="btn btn-icon btn-sm btn-primary-transparent rounded-pill"
                                  >
                                    <i className="ri-eye-line"></i>
                                  </a>
                                  <a
                                    onClick={() => handleDeleteClick(test.id)}
                                    className="btn btn-icon btn-sm btn-danger-transparent rounded-pill"
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </a>
                                  {currentDeleteTestId && (
                                    <DeleteTest
                                      currentDeleteTestId={currentDeleteTestId}
                                      refreshTest={refreshTest}
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

export default ListTest;
