import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ModalProgress from "../components/ModalProgress";
import TopBar from "../components/TopBar";
import axiosInstance from "../config/axiosConfig";
import { SocketContext } from "../context/socket";

function Thematique() {
  const [thematique, setThematique] = useState([]);
  const [allThematique, setAllThematique] = useState([]);
  const [roundId] = useState(1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const socket = useContext(SocketContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [page, setPage] = useState(1);
  const [perpage, setPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchThematique = useMutation(
    ({ page, perpage }) =>
      axiosInstance.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/allThematique?page=${page}&perpage=${perpage}&status=true`
      ),
    {
      onSuccess: (response) => {
        setThematique(response?.data?.thematiques?.data); // Enregistrer les données
        setAllThematique(response?.data?.allThematiques); // Enregistrer les données
        setMeta(response?.data?.thematiques?.meta);
      },
      onError: (error) => {
        const errorMessage = error?.response?.data;

        if (
          typeof errorMessage === "string" &&
          errorMessage.includes("Désolé")
        ) {
          toast.error(errorMessage, { duration: 5000 });
        } else {
          toast.error(errorMessage?.error || "Une erreur est survenue", {
            autoClose: 1000,
          });
        }
      },
    }
  );

  useEffect(() => {
    if (page && perpage) {
      fetchThematique.mutate({ page, perpage });
    }
  }, [page, perpage]); // Ajouter uniquement les dépendances nécessaires

  const fetchText = useMutation(
    (data) =>
      axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/text`,
        data
      ),
    {
      onSuccess: () => {
        socket.emit("test_created");
        setShowModal(true); // Ouvrir le modal
      },
      onError: (error) => {
        const validationErrors = error?.response?.data?.error;

        if (validationErrors && Array.isArray(validationErrors)) {
          validationErrors.forEach((error) => {
            toast.error(error.message, {
              duration: 12000,
              style: {
                zIndex: 9999,
              },
            });
          });
        } else {
          toast.error(error?.response?.data?.message, {
            duration: 12000,
            style: {
              zIndex: 9999,
            },
          });
        }
      },
    }
  );

  const handleThematiqueClick = (thematiqueId, thematiqueWording) => {
    localStorage.setItem("thematiqueId", thematiqueId);
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.id) {
      const datas = {
        userId: user.id,
        thematiqueId,
        roundId,
        thematiqueWording: thematiqueWording,
      };

      fetchText.mutate(datas);
    } else {
      toast.error("Utilisateur non trouvé ou ID manquant.");
    }
  };

  useEffect(() => {
    if (socket) {
      const handleSocketEvent = () => {
        fetchThematique.mutate({ page, perpage });
      };

      socket.on("thematique_created", handleSocketEvent);
      socket.on("thematique_updated", handleSocketEvent);
      socket.on("thematique_deteted", handleSocketEvent);
      return () => {
        socket.off("thematique_created", handleSocketEvent);
        socket.off("thematique_updated", handleSocketEvent);
        socket.off("thematique_deteted", handleSocketEvent);
      };
    }
  }, [socket, fetchThematique]);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="loader-overlay">
        <div className="loader-spinner"></div>
      </div>
    );
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  // eslint-disable-next-line no-unused-vars
  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1);
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

  return (
    <div>
      <ModalProgress
        show={showModal}
        duration={10000} // Durée en secondes
        onClose={() => {
          setShowModal(false);
          navigate("/test");
        }}
      />
      <div
        className={`tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 authentication mx-0 transition-opacity duration-700 ease-in-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="tw-border-r tw-border-r-zinc-600 tw-hidden lg:tw-block">
          <div className="authentication-cover-content rounded tw-h-screen tw-flex tw-justify-center">
            <div className="text-center p-5 d-flex align-items-center justify-content-center">
              <div className="">
                <div className="mb-5 tw-flex tw-justify-center">
                  <img
                    src="assets/images/logo/ora.png"
                    className="authentication-image"
                    alt="Logo"
                  />
                </div>

                <div className="mb-5 tw-flex tw-flex-col tw-items-center">
                  <div className="tw-flex tw-justify-end  tw-w-[70%] -tw-mt-9">
                    <h2 className="tw-text-2xl tw-font-bold w-[60%] tw-text-green-600">
                      ADVICES
                    </h2>
                  </div>
                </div>

                <p className="lead tw-font-bold">
                  INNOVATION - FORMATION - CONSEIL - EXPERTISE COMPTABLE
                </p>

                <hr className="my-4 border-light w-100" />
                <p className="tw-text-orange-500">
                  Avec nous, vous êtes toujours
                  <span className=" tw-text-green-600 tw-ml-1 font-weight-bold">
                    un pas en avant!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" tw-col-span-1">
          {user?.id && <TopBar />}

          <div className="col-xxl-6  col-xl-9 col-lg-6 justify-content-center tw-h-full tw-flex tw-justify-center align-items-center tw-w-full tw-my-9">
            <div className="tw-w-[85%] tw-border tw-border-zinc-600 tw-p-5 tw-rounded-md">
              <div className="mb-3">
                <a href="index.html">
                  <img
                    src="assets/images/brand-logos/desktop-logo.png"
                    alt=""
                    className="authentication-brand desktop-logo"
                  />
                  <img
                    src="assets/images/brand-logos/desktop-white.png"
                    alt=""
                    className="authentication-brand desktop-dark"
                  />
                </a>
              </div>
              <div className="tw-my-6">
                <span className="tw-bg-orange-500 tw-p-2 tw-rounded-lg tw-text-lg tw-text-white">
                  Thématiques
                </span>
              </div>

              <div className="tw-space-y-4 tw-mt-4">
                <div className="tw-flex tw-justify-start tw-items-center tw-space-x-2">
                  <div className="tw-flex tw-justify-center tw-items-center tw-bg-white op-9 tw-w-6 tw-rounded-md tw-shadow-md">
                    <i className="bx bx-download tw-text-red-600 tw-font-bold tw-text-xl header-link-icon"></i>
                  </div>
                  <h3 className="tw-text-zinc-400">Télécharger le support.</h3>
                </div>
                <div className="tw-flex tw-justify-start tw-items-center tw-space-x-2">
                  <div className="tw-flex tw-justify-center tw-items-center tw-bg-white op-9 tw-w-6 tw-rounded-md tw-shadow-md">
                    <i className="bx bx-x-circle tw-text-red-600 tw-font-bold tw-text-xl header-link-icon"></i>
                  </div>
                  <h3 className="tw-text-zinc-400">
                    Aucun support disponible.
                  </h3>
                </div>
              </div>

              <div className="tw-flex tw-items-center tw-gap-4 tw-mt-4 tw-w-full">
                {/* Section Afficher */}
                {/* <div className="tw-flex tw-items-center tw-gap-2">
                  <span>Afficher</span>
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
                    <option value="100">100</option>
                  </select>
                </div> */}

                {/* Section Recherche */}
                <div className="tw-flex-1 tw-mt-3">
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

              <div className="tw-grid tw-grid-cols-3 tw-sm:grid-cols-1 tw-md:grid-cols-2 tw-lg:grid-cols-2 tw-gap-6 tw-mt-10 max-sm:tw-grid-cols-1">
                {thematique?.length > 0 ? (
                  <>
                    {filteredThematique.map((cohorteItem, index) => (
                      <div
                        key={index}
                        className="tw-h-32 tw-max-w-md tw-w-full tw-shadow-lg tw-rounded-lg tw-overflow-hidden tw-border tw-border-gray-200"
                      >
                        <div
                          className="tw-h-full tw-relative tw-flex tw-justify-center tw-items-center tw-bg-gradient-to-r tw-from-teal-500 tw-to-blue-600 tw-p-6"
                          onClick={() =>
                            handleThematiqueClick(
                              cohorteItem.id,
                              cohorteItem.wording
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div className="tw-absolute tw-top-2 tw-right-2 tw-px-2 tw-py-1 tw-bg-white op-9 tw-rounded-md tw-shadow-md">
                            {cohorteItem?.supportUrl ? (
                              <a
                                href={`${
                                  import.meta.env.VITE_BACKEND_URL
                                }/uploads/${cohorteItem?.supportUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tw-text-red-600 tw-font-semibold"
                                onClick={(e) => e.stopPropagation()} // Empêche le clic de remonter
                              >
                                <i className="bx bx-download tw-text-red-600 tw-font-bold tw-text-xl header-link-icon"></i>
                              </a>
                            ) : (
                              <i
                                onClick={(e) => e.stopPropagation()}
                                className="bx bx-x-circle tw-text-red-600 tw-font-bold tw-text-xl header-link-icon"
                              ></i>
                            )}
                          </div>

                          <h3 className="tw-text-xl tw-font-semibold tw-text-white tw-text-center tw-mt-3">
                            {cohorteItem.wording}
                          </h3>
                        </div>
                      </div>
                    ))}

                    {/* Composant "Coming soon" */}
                    <div className="tw-h-32 tw-max-w-md tw-w-full tw-shadow-lg tw-rounded-lg tw-overflow-hidden tw-border tw-border-gray-200">
                      <div
                        className="tw-h-full tw-flex tw-justify-center tw-items-center tw-bg-gradient-to-r tw-from-gray-100 tw-to-gray-300 tw-p-6"
                        style={{
                          cursor: "not-allowed",
                          background:
                            "linear-gradient(to right, rgba(200,200,200,0.3), rgba(150,150,150,0.3))",
                        }}
                      >
                        <h3 className="tw-text-3xl tw-italic tw-font-semibold tw-text-gray-500 tw-text-center bariecito-policy">
                          Coming soon...
                        </h3>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="tw-col-span-full tw-bg-white tw-shadow-lg tw-rounded-lg tw-overflow-hidden tw-border tw-border-gray-200">
                    <div className="tw-bg-gray-200 tw-p-6">
                      <h1 className="tw-text-3xl tw-font-semibold tw-text-gray-700">
                        Chargement...
                      </h1>
                    </div>
                  </div>
                )}
              </div>

              <div className="card-footer tw-mt-8">
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
                      <ul className="pagination mb-0 tw-space-x-2">
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

export default Thematique;
