import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import axiosInstance from "../../config/axiosConfig";
import { SocketContext } from "../../context/socket";

const Dashboard = () => {
  const socket = useContext(SocketContext);
  const [isLoadingTest, setIsLoadingTest] = useState(false);
  const [currentTest, setCurrentTest] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [page, setPage] = useState(1);
  const [perpage, setPerPage] = useState(3);
  const [meta, setMeta] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status] = useState(true);
  const [statusSummary, setStatusSummary] = useState({
    activeUsers: 0,
    inactiveUsers: 0,
  });
  const [profilSummary, setProfilSummary] = useState({
    admin: 0,
    player: 0,
    operator: 0,
  });
  const [thematiqueSummary, setThematiqueSummary] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [testSummary, setTestSummary] = useState({
    totalTests: 0,
    successfulTests: 0,
    failedTests: 0,
  });

  const fetchDashboardData = useMutation(
    () =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboardInfos`
      ),
    {
      onSuccess: (response) => {
        // Mise à jour des états avec les données reçues
        setStatusSummary(response?.data.statusSummary || {});
        setProfilSummary(response?.data.profilSummary || {});
        setThematiqueSummary(response?.data.thematiqueSummary || {});
        setTestSummary(response?.data.testSummary || {});
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error, { autoClose: 1000 });
      },
    }
  );

  const fetchTest = useMutation(
    (params) =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/allTest?page=${
          params.page
        }&perpage=${params.perpage}&status=${status}`
      ),
    {
      onSuccess: (response) => {
        setTimeout(() => {
          setCurrentTest(response?.data?.tests?.data);
          setAllTests(response?.data?.allTests);
          setMeta(response?.data?.tests?.meta);
          setIsLoadingTest(true);
        }, 2000);
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    fetchTest.mutate({ page, perpage });
  }, [page, perpage]);

  useEffect(() => {
    if (socket) {
      const handleSocketEvent = () => {
        fetchDashboardData.mutate();
      };
      const handleSocketTestEvent = () => {
        fetchTest.mutate({ page, perpage });
      };

      socket.on("user_created", handleSocketEvent);
      socket.on("user_deteted", handleSocketEvent);

      socket.on("test_created", handleSocketTestEvent);
      socket.on("answer_added", handleSocketTestEvent);

      socket.on("thematique_created", handleSocketEvent);
      socket.on("thematique_deteted", handleSocketEvent);

      return () => {
        socket.off("user_created", handleSocketEvent);
        socket.off("user_deteted", handleSocketEvent);

        socket.off("test_created", handleSocketTestEvent);
        socket.off("answer_added", handleSocketTestEvent);

        socket.off("thematique_created", handleSocketEvent);
        socket.off("thematique_deteted", handleSocketEvent);
      };
    }
  }, [socket, fetchDashboardData, fetchTest]);

  useEffect(() => {
    fetchDashboardData.mutate();
  }, []);

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

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

          const isDateMatch = new Date(type?.createdAt)
            .toLocaleDateString("fr-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .includes(searchTerm);
          const isIdMatch = type.id.toString().includes(searchTerm);

          return isWordingMatch || isIdMatch || isUserMatch || isDateMatch;
        });

  return (
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
      <div className="container-fluid">
        {/* page-header */}
        {/* Page Header */}
        <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
          <div className="">
            <div className="">
              <nav>
                <ol className="breadcrumb mb-1 mb-md-0">
                  <li className="breadcrumb-item">
                    <a href="#">Index</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Tableau de board
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="ms-auto pageheader-btn">
            <nav>
              <div className="breadcrumb mb-0">
                <div className="d-flex">
                  <div className="input-group me-2 tw-w-32">
                    <div className="input-group-text text-muted bg-primary text-fixed-white me-0 border-0 pe-0">
                      <i className="ri-calendar-line mt-1"></i>
                    </div>
                    <input
                      type="text"
                      className="form-control flatpickr-input bg-primary text-fixed-white border-0"
                      id="daterange"
                      placeholder="Paramètres"
                    />
                  </div>
                  <a
                    href="#"
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

        {/* End page-header */}

        {/* ROW-1 */}
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-3">
            <div className="card custom-card">
              <div className="card-header justify-content-between">
                <div>
                  <div className="card-title">Utilisateurs</div>
                </div>
                <div className="card-options">
                  <div className="form-check form-check-md form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckCheckedp"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="d-flex">
                  <div>
                    <h6 className="text-muted">Total utilisateurs</h6>
                    <h3 className="text-dark count mt-0 font-30 mb-0">
                      {statusSummary.activeUsers + statusSummary.inactiveUsers}
                    </h3>

                    <div className="tw-mt-2 tw-space-x-4">
                      <span className="tag tw-bg-orange-500 tw-text-white tw-font-bold">
                        {profilSummary.admin} A
                      </span>
                      <span className="tag tw-bg-green-600 tw-text-white tw-font-bold">
                        {profilSummary.player} P
                      </span>
                      <span className="tag tw-bg-orange-500 tw-text-white tw-font-bold">
                        {profilSummary.operator} O
                      </span>
                    </div>
                  </div>
                  <span className="ms-auto" id="total-projects"></span>
                </div>
              </div>
              <div className="card-footer">
                <span className="text-start">
                  <i className="fe fe-arrow-up text-success me-1"></i>
                  {statusSummary.activeUsers} Actifs
                </span>
                <span className="float-end">
                  <i className="fe fe-arrow-down text-danger me-1"></i>
                  {statusSummary.inactiveUsers} Inactifs
                </span>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-3">
            <div className="card custom-card">
              <div className="card-header justify-content-between">
                <div>
                  <div className="card-title">Thématiques</div>
                </div>
                <div className="card-options">
                  <div className="form-check form-check-md form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckChecked"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="d-flex">
                  <div>
                    <h6 className="text-muted">Total Thématiques</h6>
                    <h3 className="text-dark count mt-0 font-30 mb-0">
                      {thematiqueSummary.total}
                    </h3>
                  </div>
                  <span className="ms-auto" id="total-employee"></span>
                </div>
              </div>
              <div className="card-footer">
                <span className="text-start">
                  <i className="fe fe-grid text-secondary me-1"></i>
                  {thematiqueSummary.active} Actives
                </span>
                <span className="float-end">
                  <i className="fe fe-grid text-danger me-1"></i>
                  {thematiqueSummary.inactive} Inactives
                </span>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-3">
            <div className="card custom-card">
              <div className="card-header justify-content-between">
                <div>
                  <div className="card-title">Test</div>
                </div>
                <div className="card-options">
                  <div className="form-check form-check-md form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckChecked1"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="d-flex">
                  <div>
                    <h6 className="text-muted">Total Test</h6>
                    <h3 className="text-dark count mt-0 font-30 mb-0">
                      {testSummary.totalTests}
                    </h3>
                  </div>
                  <span className="ms-auto" id="total-tasks"></span>
                </div>
              </div>
              <div className="card-footer">
                <span className="text-start">
                  <i className="bi bi-clipboard-check text-success me-1"></i>
                  {testSummary.success | 0} Succès
                </span>
                <span className="float-end">
                  <i className="bi bi-clipboard-check text-danger me-1"></i>
                  {testSummary.failed | 0} Echec
                </span>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-3">
            <div className="card custom-card">
              <div className="card-header justify-content-between">
                <div>
                  <div className="card-title">Attestation</div>
                </div>
                <div className="card-options">
                  <div className="form-check form-check-md form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckCheckede"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="d-flex">
                  <div>
                    <h6 className="text-muted">Total Candidat</h6>
                    <h3 className="text-dark count mt-0 font-30 mb-0">
                      {profilSummary.player} Player
                    </h3>
                  </div>
                  <span className="ms-auto" id="total-earnings"></span>
                </div>
              </div>
              <div className="card-footer">
                <span className="text-start">
                  <i className="bi bi-check-circle text-success me-1"></i>
                  {testSummary.availableAttestation} Attestation dispo
                </span>
                <span className="float-end">
                  <i className="bi bi-check-circle text-danger me-1"></i>
                  {testSummary.unavailableAttestation} Non dispo
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="card custom-card">
              <div className="card-header justify-content-between">
                <div className="card-title">Liste des tests</div>
              </div>
              <div className="card-body">
                <div className="tw-flex tw-items-center tw-gap-4 tw-mb-4 tw-w-full">
                  {/* Section Afficher */}
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <span>Afficher</span>
                    <select
                      className="form-select form-select-sm tw-h-10 tw-w-20"
                      aria-label="Entries Select"
                      onChange={handlePerPageChange}
                      value={perpage}
                    >
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>

                  <div className="d-flex gap-2 mt-sm-0  tw-w-full ">
                    <div className="tw-w-full max-sm:tw-mt-2 tw-ml-3">
                      <input
                        className="form-control form-control-xl"
                        type="text"
                        placeholder="Faite une recherche ici..."
                        aria-label=".form-control-xl example"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table
                    className="table table-bordered text-nowrap mb-0"
                    id="projectSummary"
                  >
                    <thead>
                      <tr>
                        <th className="wd-5p tx-center fw-bold"></th>
                        <th className="wd-25p fw-bold">Canditat</th>
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
                        <th className="fw-bold tw-text-center">Attestation</th>
                        <th className="wd-5p fw-bold">Thématiques</th>

                        <th className="fw-bold tw-text-center">Ajouter le</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoadingTest && (
                        <tr>
                          <td colSpan="9" className="text-center">
                            <Spinner />
                          </td>
                        </tr>
                      )}
                      {isLoadingTest && currentTest.length === 0 && (
                        <tr>
                          <td colSpan="9" className="text-center">
                            <span className="tw-text-red-500 tw-bg-white tw-font-semibold tw-p-2 tw-rounded-md">
                              Aucune donnée disponible
                            </span>
                          </td>
                        </tr>
                      )}
                      {isLoadingTest &&
                        filteredTest.length > 0 &&
                        filteredTest.map((test, index) => (
                          <tr key={index}>
                            <td align="center">
                              <span className="avatar avatar-sm rounded-full shadow-lg w-6 h-6 overflow-hidden">
                                <img
                                  src="assets/images/icons/std1.jpg"
                                  alt="img"
                                  className="w-6 h-6 object-cover"
                                />
                              </span>
                            </td>
                            <td>
                              <span className="tx-14">
                                {test.user?.fullName}
                              </span>
                              <h3 className="tx-14 op-4">{test.user?.email}</h3>
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

                            <td>
                              <div className="text-center">
                                <span
                                  className={`btn btn-outline-${
                                    test.totalRound1 >= test.purcent
                                      ? "success"
                                      : "danger"
                                  } btn-sm`}
                                >
                                  {test.totalRound1}%
                                </span>
                              </div>
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
                            <td>
                              <div className="text-center">
                                <span
                                  className={`btn btn-outline-${
                                    test.totalRound2 >= test.purcent
                                      ? "success"
                                      : "danger"
                                  } btn-sm`}
                                >
                                  {test.totalRound2}%
                                </span>
                              </div>
                            </td>

                            <td className="text-center">
                              <span
                                className={`badge badge-sm rounded-pill ${
                                  test.attestationDispo
                                    ? "bg-success-transparent text-success"
                                    : "bg-danger-transparent text-danger"
                                }`}
                              >
                                {test.attestationDispo
                                  ? "Disponible"
                                  : "Non Disponible"}
                              </span>
                            </td>

                            <td>
                              <span className="tx-14">
                                {test.thematiqueWording}
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
                          </tr>
                        ))}
                    </tbody>
                  </table>
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
        {/* ROW-2 END */}
      </div>
    </div>
  );
};

export default Dashboard;
