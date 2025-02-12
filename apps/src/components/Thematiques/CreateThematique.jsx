import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosConfig";
import { SocketContext } from "../../context/socket";

function CreateThematique({ currentThematiqueId, refreshThematique }) {
  const [currentThematique, setCurrentThematique] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isConnected, setIsConnected] = useState(false);

  const prevThematiqueIdRef = useRef();
  const addThematiqueLinkRef = useRef();

  const socket = useContext(SocketContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      wording: "",
      purcent: "",
      amountToPay: "",
      cumul: 0,
      thematiqueId: "",
    },
  });

  const handleError = (error) => {
    //  console.log(error?.response?.data?.error);

    const validationErrors = error?.response?.data?.error;
    if (validationErrors && Array.isArray(validationErrors)) {
      validationErrors.forEach((err) =>
        toast.error(err.message, {
          duration: 12000,
          position: "bottom-right",
          style: {
            position: "absolute",
            bottom: "20px",
            right: "20px",
            zIndex: 200000,
          },
        })
      );
    } else {
      toast.error(
        <div className="tw-bg-red-100 tw-border-l-4 tw-border-red-500 tw-text-red-700 tw-p-4 tw-rounded-md tw-shadow-md tw-flex tw-items-center">
          <span className="tw-text-xl tw-mr-3 tw-text-red-600">❌</span>
          <span className="tw-text-sm tw-font-medium tw-text-red-700">
            {error?.response?.data?.error ||
              error?.response?.data?.message ||
              error?.response?.data}
          </span>
        </div>,
        {
          duration: 4000,
          position: "bottom-right",
          style: {
            zIndex: 9999,
          },
        }
      );
    }
  };

  const handleSuccess = (response, action) => {
    toast.success(response?.data?.message || "Action réussie !");
    reset({
      wording: "",
      purcent: "",
    });
    refreshThematique();

    addThematiqueLinkRef.current.click();
    socket.emit(`thematique_${action}`, response.data);
  };

  const createOrUpdateThematique = useMutation(
    ({ data, thematiqueId }) => {
      const url = thematiqueId
        ? `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/thematique?thematiqueId=${thematiqueId}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/v1/thematique`;
      const method = thematiqueId ? axiosInstance.put : axiosInstance.post;
      return method(url, data);
    },
    {
      onSuccess: (response, { thematiqueId }) => {
        currentThematiqueId = null;

        handleSuccess(response, thematiqueId ? "updated" : "created");
      },
      onError: handleError,
    }
  );

  const fetchThematique = useMutation(
    (thematiqueId) =>
      axiosInstance.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/thematique?thematiqueId=${thematiqueId}`
      ),
    {
      onSuccess: (response) => setCurrentThematique(response?.data?.domain),
      onError: handleError,
    }
  );

  const onSubmit = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const support = data.support[0];

      const formData = new FormData();
      formData.append("wording", data.wording);
      formData.append("purcent", data.purcent);
      formData.append("cumul", data.cumul);
      formData.append("thematiqueId", currentThematiqueId);
      formData.append("duration", data.duration);
      formData.append("pointTotalQuestion", data.pointTotalQuestion);
      formData.append("status", data.status);
      formData.append("amountToPay", data.amountToPay);
      formData.append("userId", user.id);

      if (support) {
        formData.append("support", support);
      }

      // Envoyer la requête via mutation
      createOrUpdateThematique.mutate({
        data: formData, // Ici, on passe formData au lieu de requestData
        thematiqueId: currentThematiqueId,
      });
    } else {
      toast.error("Utilisateur non trouvé dans le stockage local");
    }
  };

  useEffect(() => {
    if (
      currentThematiqueId &&
      currentThematiqueId !== prevThematiqueIdRef.current
    ) {
      prevThematiqueIdRef.current = currentThematiqueId;
      fetchThematique.mutate(currentThematiqueId);
      addThematiqueLinkRef.current?.click();
    }
  }, [currentThematiqueId]);

  useEffect(() => {
    if (currentThematique) {
      reset({
        wording: currentThematique.wording || "",
        purcent: currentThematique.purcent || "",
        pointTotalQuestion: currentThematique.pointTotalQuestion || "",
        cumul: currentThematique.cumul || 0,
        duration: currentThematique.duration || "",
        status: currentThematique?.status || "",
        amountToPay: currentThematique?.amountToPay || "",
        support: currentThematique?.supportUrl || "",
      });
    }
  }, [currentThematique, reset]);

  return (
    <div className="row">
      <a
        ref={addThematiqueLinkRef}
        className="modal-effect btn btn-primary d-grid mb-3"
        data-bs-effect="effect-rotate-bottom"
        data-bs-toggle="modal"
        data-bs-target="#modaldemo8"
        style={{ cursor: "pointer" }}
      >
        Ajouter une thématique
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
                {currentThematiqueId
                  ? "Modifier la thématique"
                  : "Nouvelle thématique"}
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-start">
              <div className="tw-text-red-600 tw-mb-3">
                <h6>
                  <span className="tw-text-xl">*</span> signifie que
                  l&apos;information est requise
                </h6>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="row gy-4">
                <div className="form-group">
                  <label htmlFor="wording" className="form-label text-default">
                    Intitulé
                  </label>
                  <span className="tw-text-red-600">*</span>
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
                <div className="form-group">
                  <label htmlFor="duration" className="form-label text-default">
                    Durée du test (en min)
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    id="duration"
                    placeholder="Saisir la durée du test..."
                    {...register("duration", {
                      required: "La durée du test est requise",
                    })}
                  />
                  {errors.duration && (
                    <span className="tw-text-red-500">
                      {errors.duration.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="purcent" className="form-label text-default">
                    Pourcentage
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    id="purcent"
                    placeholder="Saisir le pourcentage requis pour valider le test..."
                    {...register("purcent", {
                      required: "Le pourcentage est requis",
                    })}
                  />
                  {errors.purcent && (
                    <span className="tw-text-red-500">
                      {errors.purcent.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="pointTotalQuestion"
                    className="form-label text-default"
                  >
                    Question : Limite des points
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    id="pointTotalQuestion"
                    placeholder="Saisir la limite de point des questions..."
                    {...register("pointTotalQuestion", {
                      required: "La limite est requise",
                    })}
                  />
                  {errors.pointTotalQuestion && (
                    <span className="tw-text-red-500">
                      {errors.pointTotalQuestion.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="purcent" className="form-label text-default">
                    Cumul
                  </label>
                  <input
                    disabled
                    type="number"
                    className="form-control form-control-lg"
                    id="cumul"
                    placeholder="..."
                    {...register("cumul")}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="amountToPay"
                    className="form-label text-default"
                  >
                    Montant à payer
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    id="amountToPay"
                    placeholder="Montant à payer pour l'attestation..."
                    {...register("amountToPay")}
                  />
                </div>

                <div className="form-check tw-flex tw-justify-start tw-ml-4 tw-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="status"
                    {...register("status")}
                  />
                  <label className="form-check-label tw-ml-2" htmlFor="status">
                    Statut
                  </label>
                </div>
                <div className="form-group">
                  {/* Affichage du lien si le fichier existe, sinon afficher l'input */}
                  {currentThematique?.supportUrl && (
                    <div className="mb-2 -tw-ml-3">
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                          currentThematique.supportUrl
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-link"
                      >
                        Télécharger le fichier PDF existant
                      </a>
                    </div>
                  )}

                  <label htmlFor="support" className="form-label text-default">
                    Joindre un support (PDF)
                  </label>

                  {/* Le champ pour joindre un fichier (toujours visible pour mettre à jour le fichier) */}
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    id="support"
                    accept=".pdf"
                    {...register("support")}
                  />
                </div>

                <div className="d-flex justify-content-between tw-mt-5">
                  <button
                    type="submit"
                    className="btn tw-bg-green-600 tw-text-white"
                    disabled={createOrUpdateThematique.isLoading}
                  >
                    {createOrUpdateThematique.isLoading
                      ? "Chargement..."
                      : "Valider"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
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

CreateThematique.propTypes = {
  currentThematiqueId: PropTypes.number,
  refreshThematique: PropTypes.func.isRequired,
};

export default CreateThematique;
