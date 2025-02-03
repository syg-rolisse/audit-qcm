import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosConfig";

function CreateQuestion({ domainId, currentQuestionId, refreshQuestion }) {
  const [currentQuestion, setCurrentQuestion] = useState();
  const prevQuestionIdRef = useRef();
  const addQuestionLinkRef = useRef();
  const [domains, setDomains] = useState([]);
  const [perpage] = useState(100);
  const [page] = useState(1);
  const [status] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fonction handleError déplacée ici
  const handleError = (error) => {
    const validationErrors = error?.response?.data?.error;

    if (validationErrors && Array.isArray(validationErrors)) {
      validationErrors.forEach((err) => {
        toast.error(err.message, {
          duration: 12000,
          style: {
            zIndex: 9999,
          },
        });
      });
    } else {
      toast.error(error?.response?.data?.error, {
        duration: 12000,
        style: {
          zIndex: 9999,
        },
      });
    }
  };

  const getDomains = useMutation(
    (params) =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/allDomain?page=${
          params.page
        }&perpage=${params.perpage}&status=${status}`
      ),
    {
      onSuccess: (response) => {
        setDomains(response?.data?.data);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error, { autoClose: 1000 });
      },
    }
  );
  useEffect(() => {
    getDomains.mutate({ page, perpage });
  }, [page, perpage]);

  const createQuestion = useMutation(
    (data) =>
      axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/question`,
        data
      ),
    {
      onSuccess: (response) => {
        toast.success(response?.data?.message);
        reset();
        refreshQuestion();
        addQuestionLinkRef.current.click();
      },
      onError: handleError, // Utilisation après déclaration
    }
  );

  const updateQuestion = useMutation(
    ({ data, currentQuestionId }) =>
      axiosInstance.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/question?questionId=${currentQuestionId}`,
        data
      ),
    {
      onSuccess: (response) => {
        toast.success(response?.data?.message);
        refreshQuestion();
        reset({
          wording: "",
          point: "",
        });
        addQuestionLinkRef.current.click();
      },
      onError: handleError, // Utilisation après déclaration
    }
  );

  const getQuestion = useMutation(
    (param) =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/question?questionId=${
          param.currentQuestionId
        }`
      ),
    {
      onSuccess: (response) => {
        setCurrentQuestion(response?.data?.question);
      },
      onError: handleError, // Utilisation après déclaration
    }
  );

  // const closeModal = () => {
  //   const modalElement = document.getElementById("modaldemo8");
  //   const modalInstance = Modal.getInstance(modalElement);
  //   if (modalInstance) modalInstance.hide();
  // };

  const onSubmit = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const datas = { ...data, domainId: domainId, userId: user.id };
      if (currentQuestionId) {
        updateQuestion.mutate({ data, currentQuestionId });
      } else {
        createQuestion.mutate(datas);
      }
    } else {
      toast.error("Utilisateur non trouvé dans le stockage local");
    }
  };

  useEffect(() => {
    console.log(currentQuestionId);

    if (currentQuestionId && currentQuestionId !== prevQuestionIdRef.current) {
      prevQuestionIdRef.current = currentQuestionId;
      getQuestion.mutate({ currentQuestionId });
      if (addQuestionLinkRef.current) {
        addQuestionLinkRef.current.click();
      }
    } else {
      console.log(currentQuestionId);
      reset();
    }
  }, [currentQuestionId]);

  useEffect(() => {
    if (currentQuestion) {
      reset({
        wording: currentQuestion?.wording || "",
        point: currentQuestion?.point || "",
      });
    }
  }, [currentQuestion, reset]);

  return (
    <div className="row">
      <a
        ref={addQuestionLinkRef}
        className="modal-effect btn btn-primary d-grid mb-3 "
        data-bs-effect="effect-rotate-bottom"
        data-bs-toggle="modal"
        data-bs-target="#modaldemo8"
        style={{ cursor: "pointer" }}
      >
        Ajouter une question
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
                {currentQuestion?.wording
                  ? "Modifier la question"
                  : "Nouvelle question"}
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
                {domains && (
                  <div className="form-group">
                    <select disabled className="form-control form-control-lg">
                      {domains.map((domain, index) => (
                        <option key={index} value={domain.id}>
                          {domain.wording}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="wording" className="form-label text-default">
                    Intitulé
                  </label>
                  <span className="tw-text-red-600 tw-text-lg">*</span>

                  <textarea
                    name=""
                    {...register("wording", {
                      required: "L'intitulé est requis",
                    })}
                    className="form-control form-control-lg"
                    id="wording"
                  ></textarea>
                  {/* <input
                    type="text"
                    className="form-control form-control-lg"
                    id="wording"
                    placeholder="Saisir l'intitulé"
                    {...register("wording", {
                      required: "L'intitulé est requis",
                    })}
                  /> */}
                  {errors.wording && (
                    <span className="tw-text-red-500">
                      {errors.wording.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
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
                </div>

                <div className="d-flex justify-content-between tw-mt-5">
                  <button
                    type="submit"
                    className="btn tw-bg-green-600 tw-text-white"
                    disabled={
                      createQuestion.isLoading || updateQuestion.isLoading
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {createQuestion.isLoading || updateQuestion.isLoading
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

CreateQuestion.propTypes = {
  currentQuestionId: PropTypes.number,
  domainId: PropTypes.number,
  refreshQuestion: PropTypes.func,
};

export default CreateQuestion;
