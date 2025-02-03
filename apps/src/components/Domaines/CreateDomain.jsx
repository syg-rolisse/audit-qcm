import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosConfig";
import { SocketContext } from "../../context/socket";
function CreateDomain({ currentDomainId, refreshDomain }) {
  const [currentDomain, setCurrentDomain] = useState();
  const [thematiqueList, setThematiqueList] = useState([]);
  const prevDomainIdRef = useRef();
  const addDomainLinkRef = useRef();
  const socket = useContext(SocketContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fonction pour récupérer la liste des thématiques
  useEffect(() => {
    const fetchThematiqueList = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/allThematique`
        );

        setThematiqueList(response?.data?.thematiques?.data || []);
      } catch (error) {
        console.log(error);

        toast.error("Erreur de récupération des thématiques", {
          duration : 12000 , style: {
            zIndex: 9999,
          },
        });
      }
    };

    fetchThematiqueList();
  }, []);

  // Fonction handleError déplacée ici
  const handleError = (error) => {
    const validationErrors = error?.response?.data?.error;

    if (validationErrors && Array.isArray(validationErrors)) {
      validationErrors.forEach((err) => {
        toast.error(err.message, { duration : 12000 , style: {
            zIndex: 9999,
          }, });
      });
    } else {
      toast.error(error?.response?.data?.message, { duration : 12000 , style: {
            zIndex: 9999,
          }, });
    }
  };

  const createDomain = useMutation(
    (data) =>
      axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/domain`,
        data
      ),
    {
      onSuccess: (response) => {
        socket.emit("domain_created");
        toast.success(response?.data?.message);
        refreshDomain();
        reset();
        addDomainLinkRef.current.click();
      },
      onError: handleError, // Utilisation après déclaration
    }
  );

  const updateDomain = useMutation(
    ({ data, currentDomainId }) =>
      axiosInstance.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/domain?domainId=${currentDomainId}`,
        data
      ),
    {
      onSuccess: (response) => {
        socket.emit("domain_updated");
        toast.success(response?.data?.message);
        refreshDomain();
        reset({
          wording: "",
          point: "",
          thematiqueId: "", // Ajout de thematiqueId
        });
        addDomainLinkRef.current.click();
      },
      onError: handleError, // Utilisation après déclaration
    }
  );

  const getDomain = useMutation(
    (param) =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/domain?domainId=${
          param.currentDomainId
        }`
      ),
    {
      onSuccess: (response) => {
        setCurrentDomain(response?.data?.domain);
      },
      onError: handleError, // Utilisation après déclaration
    }
  );

  const onSubmit = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const datas = { ...data, userId: user.id };
      if (currentDomainId) {
        updateDomain.mutate({ data, currentDomainId });
      } else {
        createDomain.mutate(datas);
      }
    } else {
      toast.error("Utilisateur non trouvé dans le stockage local");
    }
  };

  useEffect(() => {
    if (currentDomainId && currentDomainId !== prevDomainIdRef.current) {
      prevDomainIdRef.current = currentDomainId;
      getDomain.mutate({ currentDomainId });
      if (addDomainLinkRef.current) {
        addDomainLinkRef.current.click();
      }
    }
  }, [currentDomainId]);

  useEffect(() => {
    if (currentDomain) {
      reset({
        wording: currentDomain?.wording || "",
        point: currentDomain?.point || "",
        thematiqueId: currentDomain?.thematiqueId || "", // Ajout de thematiqueId
      });
    }
  }, [currentDomain, reset]);

  useEffect(() => {
    if (socket) {
      socket.on("domain_created", refreshDomain);
      socket.on("domain_updated", refreshDomain);
      socket.on("domain_deleted", refreshDomain);
      return () => {
        socket.off("domain_created", refreshDomain);
        socket.off("domain_updated", refreshDomain);
        socket.off("domain_deleted", refreshDomain);
      };
    }
  }, [socket, refreshDomain]);

  return (
    <div className="row">
      <a
        ref={addDomainLinkRef}
        className="modal-effect btn btn-primary d-grid mb-3 "
        data-bs-effect="effect-rotate-bottom"
        data-bs-toggle="modal"
        href="#modaldemo8"
        style={{ cursor: "pointer" }}
      >
        Ajouter un domaine
      </a>

      <div
        className="modal fade"
        id="modaldemo8"
        tabIndex="-1"
        data-bs-backdrop="static"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content tw-rounded-lg tw-border tw-p-2">
            <div className="modal-header">
              <h6 className="modal-title tw-text-gray-700 tw-text-xl">
                {currentDomain?.wording
                  ? "Modifier le domaine"
                  : "Nouveau domaine"}
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ cursor: "pointer" }}
              ></button>
            </div>
            <div className="modal-body text-start">
              <div className="tw-text-red-600 tw-mb-3">
                <h6>
                  <span className="tw-text-xl">*</span> signifie que
                  l&apos;information est requise
                </h6>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="row gy-4 formCustom"
              >
                <div className="form-group">
                  <label htmlFor="wording" className="form-label text-default">
                    Intitulé
                  </label>
                  <span className="tw-text-red-600 tw-text-lg">*</span>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="wording"
                    placeholder="Saisir l'intitulé"
                    {...register("wording", {
                      required: "L'intitulé est requis",
                    })}
                  />
                  {errors.wording && (
                    <span className="tw-text-red-500">
                      {errors.wording.message}
                    </span>
                  )}
                </div>

                {/* <div className="form-group">
                  <label htmlFor="point" className="form-label text-default">
                    Point
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    id="point"
                    placeholder="Saisir le point"
                    {...register("point", {
                      required: "Le point est requis",
                    })}
                  />
                  {errors.point && (
                    <span className="tw-text-red-500">
                      {errors.point.message}
                    </span>
                  )}
                </div> */}

                {/* Select pour les thématiques */}
                <div className="form-group">
                  <label
                    htmlFor="thematiqueId"
                    className="form-label text-default"
                  >
                    Thématique
                  </label>
                  <select
                    id="thematiqueId"
                    className="form-control form-control-lg"
                    {...register("thematiqueId", {
                      required: "La thématique est requise",
                    })}
                  >
                    <option value="">Sélectionner une thématique</option>
                    {thematiqueList.map((thematique) => (
                      <option key={thematique.id} value={thematique.id}>
                        {thematique.wording}
                      </option>
                    ))}
                  </select>
                  {errors.thematiqueId && (
                    <span className="tw-text-red-500">
                      {errors.thematiqueId.message}
                    </span>
                  )}
                </div>

                <div className="d-flex justify-content-between tw-mt-5">
                  <button
                    type="submit"
                    className="btn tw-bg-green-600 tw-text-white"
                    disabled={createDomain.isLoading || updateDomain.isLoading}
                    style={{ cursor: "pointer" }}
                  >
                    {createDomain.isLoading || updateDomain.isLoading
                      ? "Chargement..."
                      : "Valider"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                    style={{ cursor: "pointer" }}
                  >
                    Fermer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateDomain.propTypes = {
  currentDomainId: PropTypes.number,
  refreshDomain: PropTypes.func,
};

export default CreateDomain;
