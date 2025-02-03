import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DeleteAnswer from "../../../components/Answers/DeleteAnswer";
import CreateQuestion from "../../../components/Questions/CreateQuestion";
import DeleteQuestion from "../../../components/Questions/DeleteQuestion";
import Spinner from "../../../components/Spinner";
import axiosInstance from "../../../config/axiosConfig";

function IndexQuestion({ domainId, onSwitch }) {
  const [question, setQuestion] = useState([]);
  const [meta, setMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [currentQuestionPoint, setCurrentQuestionPoint] = useState(0);
  const [perpage, setPerPage] = useState(5);
  const [currentQuestionId, setQuestionId] = useState();
  const [currentAnswerId, setAnswerId] = useState();
  const [currentQuestionAnswerId, setQuestionAnswerId] = useState();
  const [currentDeleteQuestionId, setDeleteQuestionId] = useState();
  const [currentDeleteAnswerId, setDeleteAnswerId] = useState();
  const [status] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const addAnswerLinkRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const handleAddAnswerClick = (quiz) => {
    reset({
      wording: "",
      point: 0,
      status: false,
      nature: "",
    });
    setAnswerId(null);
    setQuestionAnswerId(quiz.id);
    setCurrentQuestionPoint(quiz.point);
  };

  const selectedNature = watch("nature");

  useEffect(() => {
    if (selectedNature === "br") {
      setValue("point", currentQuestionPoint);
    } else {
      setValue("point", 0);
    }
  }, [selectedNature, currentQuestionPoint, setValue]);

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
      if (error?.response?.data?.error.includes("Désolé")) {
        toast.error(error?.response?.data?.error, { duration: 5000 });
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage(error.response.data)?.error;
        toast.error(error?.response?.data?.error, { autoClose: 1000 });
      }
      //toast.error(error?.response?.data?.message, { duration : 12000 , style: {
      //   zIndex: 9999,
      // },
      //});
    }
  };

  const handleUpdateAnswerClick = (answer) => {
    setAnswerId(answer.id);
    reset({
      wording: answer.wording || "",
      point: answer.point || 0,
      status: answer.status || false,
      nature: answer.nature || "",
    });
  };

  const createAnswer = useMutation(
    (data) =>
      axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/answer`,
        data
      ),
    {
      onSuccess: (response) => {
        toast.success(response?.data?.message);
        refreshAnswer();
        reset({
          wording: "",
          point: 0,
          status: false,
          nature: "",
        });
        addAnswerLinkRef.current.click();
      },
      onError: handleError,
    }
  );

  const updateAnswer = useMutation(
    ({ data, currentAnswerId }) =>
      axiosInstance.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/answer?answerId=${currentAnswerId}`,
        data
      ),
    {
      onSuccess: (response) => {
        toast.success(response?.data?.message);
        refreshAnswer();
        reset({
          wording: "",
          point: 0,
          status: false,
          nature: "",
        });
        addAnswerLinkRef.current.click();
        setAnswerId(null);
      },
      onError: handleError,
    }
  );

  const onSubmit = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const datas = {
        ...data,
        questionId: currentQuestionAnswerId,
        userId: user.id,
      };
      if (currentAnswerId) {
        updateAnswer.mutate({ data, currentAnswerId });
      } else {
        createAnswer.mutate(datas);
      }
    } else {
      toast.error("Utilisateur non trouvé dans le stockage local");
    }
  };

  useEffect(() => {
    if (!domainId) {
      toast.error("Domaine non identifié.", { duration: 1000 });
      onSwitch("thematique");
    }
  }, [domainId]);

  const getQuestions = useMutation(
    (params) =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/allQuestions?page=${
          params.page
        }&perpage=${params.perpage}&status=${status}&domainId=${domainId}`
      ),
    {
      onSuccess: (response) => {
        setQuestion(response?.data?.data);
        console.log(response?.data);

        setMeta(response?.data?.meta);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error, { autoClose: 1000 });
      },
    }
  );

  const refreshQuestion = () => {
    getQuestions.mutate({ page, perpage });
    setDeleteQuestionId(null);
    setQuestionId(null);
  };

  const refreshAnswer = () => {
    getQuestions.mutate({ page, perpage });
    setDeleteAnswerId(null);
  };

  useEffect(() => {
    getQuestions.mutate({ page, perpage });
  }, [page, perpage]);

  const handleEditClick = (currentDomainId) => {
    setQuestionId(currentDomainId);
  };

  const handleDeleteClick = (currentDomainId) => {
    setDeleteQuestionId(currentDomainId);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  const handleDeleteAnswerClick = (currentAnswerId) => {
    setDeleteAnswerId(currentAnswerId);
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
                <div className="card-title">Liste des questions</div>
                {/* <div
                  className="card-title"
                  onClick={() => onSwitch(`thematique`)}
                >
                  Thématique
                </div> */}
                <div className="btn-group btn-sm">
                  <CreateQuestion
                    currentQuestionId={currentQuestionId}
                    domainId={domainId}
                    refreshQuestion={refreshQuestion}
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

                <div className="row tw-flex tw-justify-end tw-mx-0 tw-mt-2">
                  <div
                    className="modal fade"
                    id="CreateAnswerModal"
                    tabIndex="-1"
                    data-bs-backdrop="static"
                    aria-labelledby="CreateAnswerModal"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content tw-rounded-lg tw-border tw-p-2">
                        <div className="modal-header">
                          <h6 className="modal-title tw-text-gray-700 tw-text-xl">
                            Réponse
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
                              <label
                                htmlFor="wording"
                                className="form-label text-default"
                              >
                                Intitulé
                              </label>
                              <span className="tw-text-red-600 tw-text-lg">
                                *
                              </span>

                              <textarea
                                {...register("wording", {
                                  required: "L'intitulé est requis",
                                })}
                                className="form-control form-control-lg"
                                id="wording"
                              ></textarea>
                              {errors.wording && (
                                <span className="tw-text-red-500">
                                  {errors.wording.message}
                                </span>
                              )}
                            </div>

                            <div className="form-group">
                              <label
                                htmlFor="point"
                                className="form-label text-default"
                              >
                                Point
                              </label>
                              <input
                                disabled
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

                            <div className="form-group tw-flex tw-justify-between tw-items-center tw-gap-4">
                              <div className="form-check tw-flex tw-justify-center tw-items-center">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="status"
                                  {...register("status")}
                                />
                                <label
                                  className="form-check-label tw-ml-2"
                                  htmlFor="status"
                                >
                                  Statut
                                </label>
                              </div>
                              <div className="form-check tw-flex tw-justify-center tw-items-center">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  id="mr"
                                  value="mr"
                                  {...register("nature")}
                                  defaultChecked // Sélectionner par défaut
                                />

                                <label
                                  className="form-check-label tw-ml-2"
                                  htmlFor="mr"
                                >
                                  Mr
                                </label>
                              </div>
                              <div className="form-check tw-flex tw-justify-center tw-items-center">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  id="br"
                                  value="br"
                                  {...register("nature")}
                                />
                                <label
                                  className="form-check-label tw-ml-2"
                                  htmlFor="br"
                                >
                                  Br
                                </label>
                              </div>
                            </div>

                            <div className="d-flex justify-content-between tw-mt-5">
                              <button
                                type="submit"
                                className="btn tw-bg-green-600 tw-text-white"
                                disabled={createAnswer.isLoading}
                                style={{ cursor: "pointer" }}
                              >
                                {createAnswer.isLoading
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

                <div className="">
                  <div
                    className="table-responsive"
                    style={{ minHeight: "80%" }}
                  >
                    <table
                      className="customTable table table-bordered text-nowrap mb-0"
                      id="projectSummary"
                    >
                      <thead>
                        <tr>
                          <th className="wd-5p tx-center fw-bold"></th>
                          <th className="wd-5p tw-text-center fw-bold">N°</th>
                          <th className="wd-25p fw-bold">Questions</th>
                          <th className="wd-25p tw-text-center fw-bold">
                            Point
                          </th>
                          <th className="text-center fw-bold answer-column">
                            Réponses | Status | Pts | Modif | Supp
                          </th>

                          <th className="fw-bold tw-text-center">Status</th>
                          <th className="fw-bold tw-text-center">Ajouter le</th>
                          <th className="fw-bold tw-text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getQuestions.isLoading && (
                          <tr>
                            <td colSpan="8" className="text-center">
                              <Spinner />
                            </td>
                          </tr>
                        )}
                        {getQuestions.isError && (
                          <tr>
                            <td colSpan="8" className="text-center">
                              <span className="tw-text-red-500 tw-bg-white tw-font-semibold tw-p-2 tw-rounded-md">
                                Erreur : {errorMessage}
                              </span>
                            </td>
                          </tr>
                        )}
                        {!getQuestions.isLoading &&
                          !getQuestions.isError &&
                          question.length === 0 && (
                            <tr>
                              <td colSpan="8" className="text-center">
                                Aucune donnée disponible
                              </td>
                            </tr>
                          )}
                        {!getQuestions.isLoading &&
                          !getQuestions.isError &&
                          question.length > 0 &&
                          question.map((quiz, index) => (
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
                                  {quiz.id}
                                </span>
                              </td>
                              <td>
                                <span className="">{quiz.wording}</span>
                              </td>
                              <td align="center">
                                <span className="tag tag-orange">
                                  {quiz.point}
                                </span>
                              </td>

                              <td className="tw-py-0">
                                <a
                                  ref={addAnswerLinkRef}
                                  data-bs-effect="effect-rotate-bottom"
                                  data-bs-toggle="modal"
                                  data-bs-target="#CreateAnswerModal"
                                  style={{ cursor: "pointer" }}
                                  className="btn tw-w-full btn-sm btn-primary-transparent tw-my-3 rounded-pill"
                                  onClick={() => handleAddAnswerClick(quiz)} // Utilisation correcte de la fonction
                                >
                                  <div className="tw-flex tw-justify-center tw-items-center">
                                    <i className="ri-add-line"></i>

                                    <h3>Ajouter une réponse</h3>
                                  </div>
                                </a>

                                {quiz?.Answers &&
                                  quiz.Answers.map((answer, index) => (
                                    <div
                                      key={index}
                                      className="tw-grid tw-grid-cols-5 tw-items-center tw-mb-6 tw-border tw-border-zinc-700 tw-rounded-lg tw-px-2 answer-column"
                                    >
                                      {/* Premier élément à gauche */}
                                      <div className="tw-col-span-2">
                                        <span className="">
                                          {index + 1 + " -) " + answer.wording}
                                        </span>
                                      </div>

                                      {/* Second élément au milieu */}
                                      <div className="tw-col-span-1 tw-text-center">
                                        <span
                                          className={`tw-p-1 ${
                                            answer.nature === "br"
                                              ? "bg-success-transparent text-success"
                                              : "bg-danger-transparent text-danger"
                                          }`}
                                        >
                                          {answer.nature}
                                        </span>
                                        <span className="tw-ml-2">
                                          {answer.point}pt
                                        </span>
                                      </div>

                                      <div className="tw-col-span-1 tw-text-center">
                                        <span
                                          className={`tw-p-1 ${
                                            answer.status
                                              ? "bg-success-transparent text-success"
                                              : "bg-danger-transparent text-danger"
                                          }`}
                                        >
                                          {answer.status
                                            ? "Visible"
                                            : "Invisible"}
                                        </span>
                                      </div>

                                      {/* Troisième élément à droite */}
                                      <div className="tw-col-span-1 d-flex justify-content-center align-items-center">
                                        <a
                                          ref={addAnswerLinkRef}
                                          data-bs-effect="effect-rotate-bottom"
                                          data-bs-toggle="modal"
                                          data-bs-target="#CreateAnswerModal"
                                          style={{ cursor: "pointer" }}
                                          className="btn btn-sm btn-primary-transparent rounded-pill"
                                          onClick={() =>
                                            handleUpdateAnswerClick(answer)
                                          }
                                        >
                                          <i className="ri-edit-line"></i>
                                        </a>

                                        <a
                                          onClick={() =>
                                            handleDeleteAnswerClick(answer.id)
                                          }
                                          className="btn btn-icon btn-sm btn-danger-transparent rounded-pill tw-ml-4"
                                        >
                                          <i className="ri-delete-bin-line"></i>
                                        </a>
                                        {currentDeleteAnswerId && (
                                          <DeleteAnswer
                                            currentDeleteAnswerId={
                                              currentDeleteAnswerId
                                            }
                                            refreshAnswer={refreshAnswer}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </td>

                              <td className="text-center">
                                <span
                                  className={`badge badge-sm rounded-pill ${
                                    quiz.status
                                      ? "bg-success-transparent text-success"
                                      : "bg-danger-transparent text-danger"
                                  }`}
                                >
                                  {quiz.status ? "Actif" : "Inactif"}
                                </span>
                              </td>
                              <td className="tw-text-center">
                                {new Date(quiz.createdAt).toLocaleDateString(
                                  "fr-CA",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  }
                                )}
                              </td>

                              <td className="">
                                <div className="d-flex justify-content-center align-items-center">
                                  <a
                                    onClick={() => handleEditClick(quiz.id)}
                                    className="btn btn-icon btn-sm btn-primary-transparent rounded-pill tw-ml-2"
                                  >
                                    <i className="ri-edit-line"></i>
                                  </a>
                                  <a
                                    onClick={() => handleDeleteClick(quiz.id)}
                                    className="btn btn-icon btn-sm btn-danger-transparent rounded-pill tw-ml-2"
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </a>
                                  {currentDeleteQuestionId && (
                                    <DeleteQuestion
                                      currentDeleteQuestionId={
                                        currentDeleteQuestionId
                                      }
                                      refreshQuestion={refreshQuestion}
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
IndexQuestion.propTypes = {
  domainId: PropTypes.number,
  onSwitch: PropTypes.func,
};

export default IndexQuestion;
