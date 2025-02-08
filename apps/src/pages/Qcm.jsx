/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import ClosePart from "../components/ClosePart";
import LeftContent from "../components/LeftContent";
import PrintableCertificate from "../components/PrintableCertificate";
import Timer from "../components/Timer";
import axiosInstance from "../config/axiosConfig";
import { SocketContext } from "../context/socket";
import Offcanvas from "../components/Offcanvas";
import Instruction from "../components/Instruction";
import StatistiqueDuTest from "../components/StatistiqueDuTest";
import TextOverWave from "../components/TextOverWave";
import FooterOne from "../components/Footer";
import useThemeMode from "../components/useThemeMode";

function Qcm() {
  const [playAgain, setPlayAgain] = useState(true);
  const [showNextDomain, setShowNextDomain] = useState(false);
  const [domains, setDomain] = useState([]);
  const [currentTest, setCurrentTest] = useState([]);
  const [meta, setMeta] = useState([]);
  const [showClosePartModal, setShowClosePartModal] = useState(false);
  const [page, setPage] = useState(1);
  const [roundId, setRoundId] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [domainLength, setDomainLength] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [perpage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useContext(SocketContext);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { themeMode } = useThemeMode();
  const thematiqueId = JSON.parse(localStorage.getItem("thematiqueId"));

  useEffect(() => {
    const scripts = [
      "assets/libs/@popperjs/core/umd/popper.min.js",
      "assets/libs/bootstrap/js/bootstrap.bundle.min.js",
      "assets/js/defaultmenu.min.js",
      "assets/libs/node-waves/waves.min.js",
      // "assets/js/sticky.js",
      "assets/libs/simplebar/simplebar.min.js",
      "assets/js/simplebar.js",
      "assets/libs/@simonwep/pickr/pickr.es5.min.js",
      "assets/libs/flatpickr/flatpickr.min.js",
      "assets/js/date-range.js",
      "assets/libs/apexcharts/apexcharts.min.js",
      "assets/js/index3.js",
      "assets/js/custom.js",
    ];

    const loadScriptsSequentially = async () => {
      for (const src of scripts) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.defer = true;
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error(`Erreur de chargement : ${src}`));
          document.body.appendChild(script);
        });
      }
      // setIsLoading(true);
      // setTimeout(() => setIsLoading(false), 1000);
      //console.log("Tous les scripts ont été chargés.");
    };

    loadScriptsSequentially();

    return () => {
      scripts.forEach((src) => {
        const scriptElement = document.querySelector(`script[src="${src}"]`);
        if (scriptElement) {
          document.body.removeChild(scriptElement);
        }
      });
    };
  }, []);

  useEffect(() => {
    fetchDomains.mutate({ page, perpage });
    setIsClicked(false);
    setValidationStatus({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perpage]);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (themeMode === "light") {
      document.body.style.backgroundColor = "white";
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [themeMode]);

  const navigate = useNavigate();

  const handleWatchTimer = (isRunning) => {
    setIsTimerRunning(isRunning);
    /*Charger le premier domaine et la première question */
    setPage(1);
    /*Délai épuisé */
    if (!isRunning) {
      /*Terminer la partie */
      setTimeout(() => {
        fetchCloseRound.mutate();
        fetchDomains.mutate({ page, perpage });
      }, 1000);
    }
  };

  const handleSecondRond = () => {
    alert("dctfvgbh");
    setPlayAgain(true);
    setRoundId(2);
  };

  const handleClosePart = () => {
    setShowClosePartModal(!showClosePartModal);
  };
  const closePartConfirmed = (isRunning) => {
    localStorage.removeItem("timerEndTime");
    setIsTimerRunning(isRunning);
    setTimeout(() => {
      fetchCloseRound.mutate();
      // fetchDomains.mutate({ page, perpage });
    }, 1000);
    setShowClosePartModal(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const [validationStatus, setValidationStatus] = useState({});

  const [isClicked, setIsClicked] = useState(false); // Nouvel état pour suivre si un clic a eu lieu

  const handleAnswerClick = (questionId, index, answer) => {
    if (!isTimerRunning) {
      toast.error("Veuillez démarrer le test!");
      return;
    }

    if (isClicked) return;

    // Mettez à jour le statut de validation en fonction de la nature de la réponse
    setValidationStatus((prevStatus) => ({
      ...prevStatus,
      [index]:
        answer.nature === "br"
          ? "tw-bg-green-500 tw-text-white" // Bonne réponse
          : "tw-bg-red-500 tw-text-white", // Mauvaise réponse
    }));

    const datas = {
      roundId: roundId,
      questionId: questionId,
      answerId: answer.id,
      testId: currentTest.id,
    };

    // setCurrentQuestionId(questionId);
    // setCurrentAnswer(questionId);
    // setTimeout(() => {

    // }, 5000);
    fetchAnswer.mutate(datas);

    setIsClicked(true);
  };

  const fetchAnswer = useMutation(
    (data) =>
      axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/answerChosen`,
        data
      ),
    {
      onSuccess: (response) => {
        socket.emit("answer_added");

        handleNextQuestion();
        // fetchDomains.mutate(page, perpage);
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

  // Fonction pour passer à la question suivante
  const handleNextQuestion = () => {
    setTimeout(() => {
      if (questionIndex === currentQuestion.length - 1) {
        if (domainLength === page) {
          closePartConfirmed(false);
        } else {
          /* Afficher le domaine suivant | Empeche le resultat global de s'afficher */
          setShowNextDomain(true);
          setPage((perpage) => perpage + 1);
        }

        setQuestionIndex(0);
      } else {
        setQuestionIndex((prevIndex) => prevIndex + 1);
      }

      setIsClicked(false);
      setValidationStatus({});
    }, 200);
  };

  // Fonction pour revenir à la question précédente
  const handlePrevQuestion = () => {
    setQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const fetchCloseRound = useMutation(
    () =>
      axiosInstance.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/closeRound?roundId=${roundId}&userId=${
          user?.id
        }&thematiqueId=${thematiqueId}`
      ),
    {
      onSuccess: (response) => {
        socket.emit("answer_added");
        //setPlayAgain(false);
        window.location.reload();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error, { autoClose: 1000 });
      },
    }
  );
  const fetchDomains = useMutation(
    (params) =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/testDomain?page=${
          params.page
        }&perpage=${params.perpage}&userId=${
          user?.id
        }&thematiqueId=${thematiqueId}&roundId=${roundId}`
      ),
    {
      onSuccess: (response) => {
        setCurrentTest(response?.data?.test);

        const domainArray = [response?.data?.domains?.data[0]];
        setDomain(domainArray);

        setCurrentQuestion(response?.data?.domains?.data[0]?.TestQuestions);
        setDomainLength(response?.data?.domains?.meta?.total);
        setMeta(response?.data?.domains?.meta);

        switch (response?.data?.tag) {
          case "both":
            if (!isTimerRunning && !showNextDomain) {
              setPlayAgain(false);
            }
            break;

          case "once":
            if (!isTimerRunning && !showNextDomain) {
              toast.error(response?.data?.message, { duration: 5000 });
              setPlayAgain(false);
            }
            //  if (!isTimerRunning) {
            //  setPlayAgain(false);
            // }

            break;

          case "play":
            break;

          default:
        }
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error, { autoClose: 1000 });
      },
    }
  );

  return (
    <div>
      {/* Gestionnaire du dark et white mode */}
      <Offcanvas />
      <AuthHeader />

      <div className={` ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <div>
          <TextOverWave
            texte1="Vous êtes prêt à relever le défi de cette thématique ?"
            texte2="Répondez aux questions et testez vos connaissances ! 🧠💡"
          />
        </div>

        <div className=" tw-col-span-1">
          <div className="row justify-content-center align-items-center h-100">
            {/* tw-max-h-[80vh] tw-overflow-scroll */}
            <div className=" col-xxl-6 col-xl-9 col-lg-9 col-md-6 tw-py-5">
              <div className="p-md-0 p-3">
                <div>
                  {thematiqueId && playAgain ? (
                    <div>
                      <div className="mb-2 tw-text-3xl">
                        <h2>{currentTest.thematiqueWording}</h2>
                      </div>

                      {fetchDomains.isLoading ? (
                        <div className="tw-flex tw-justify-center tw-items-center tw-min-h-[200px]">
                          <h1 className="tw-loader tw-text-blue-500 tw-text-2xl">
                            Chargement...
                          </h1>
                        </div>
                      ) : domains?.length > 0 ? (
                        domains.map((elem, index) => (
                          <div
                            key={index}
                            className="tw-bg-white tw-relative tw-pt-14 tw-rounded-lg tw-p-6 tw-mb-6"
                          >
                            <h3 className="fw-bold tw-absolute tw-top-2 mb-3 tw-text-2xl tw-text-red-600 tw-animate-pulse">
                              ROUND {roundId}
                            </h3>

                            <p className="tw-text-sm tw-mb-2 tw-text-red-600">
                              👉 N&apos;actualiser pas la page pendant que le
                              timer est en cours. Vous risquez de perdre la
                              partie.
                            </p>

                            {/* Instruction pour le test */}
                            {!isTimerRunning && <Instruction />}

                            <div className="tw-flex tw-justify-between tw-items-center tw-mb-3 tw-py-1 tw-rounded-lg tw-space-x-4">
                              <h3 className="tw-text-xl tw-text-center tw-font-semibold tw-cursor-pointer tw-border tw-border-gray-400 tw-rounded-lg tw-py-2 tw-px-4 tw-transition-transform tw-duration-200 hover:tw-scale-105 hover:tw-shadow-lg">
                                Question {questionIndex + 1}/
                                {currentQuestion.length}
                              </h3>
                              <h3 className="tw-text-xl tw-text-center tw-font-semibold tw-cursor-pointer tw-border tw-border-gray-400 tw-rounded-lg tw-py-2 tw-px-4 tw-transition-transform tw-duration-200 hover:tw-scale-105 hover:tw-shadow-lg">
                                Domaine {page}/{domainLength}
                              </h3>
                            </div>

                            <h2 className="tw-text-xl tw-font-bold tw-text-gray-800 tw-mb-4">
                              {page + " - " + elem.wording}
                            </h2>

                            <div className="tw-text-red-600 tw-font-semibold tw-mb-2">
                              {currentQuestion[questionIndex] ? (
                                <>
                                  <h2>
                                    {questionIndex +
                                      1 +
                                      " - ) " +
                                      currentQuestion[questionIndex]?.wording}
                                  </h2>
                                  {currentQuestion[
                                    questionIndex
                                  ]?.TestAnswers.map((answer, index2) => (
                                    <div key={index2} className="tw-mb-2">
                                      <label
                                        className={`tw-text-gray-700 tw-cursor-pointer tw-border tw-my-4 tw-rounded-md tw-p-2 tw-block`}
                                        style={{
                                          pointerEvents:
                                            (currentQuestion[questionIndex]
                                              ?.chosenRound1 &&
                                              roundId === 1) ||
                                            currentTest?.chosenRound1 ||
                                            (currentQuestion[questionIndex]
                                              ?.chosenRound2 &&
                                              roundId === 2) ||
                                            currentTest?.chosenRound2
                                              ? "none"
                                              : "auto",
                                        }}
                                      >
                                        <input
                                          type="radio"
                                          name={`question-${currentQuestion[questionIndex]?.id}`}
                                          value={answer.wording}
                                          checked={
                                            selectedAnswers[
                                              currentQuestion[questionIndex]?.id
                                            ] === index2 ||
                                            (currentQuestion[questionIndex]
                                              ?.chosenRound1 &&
                                              roundId === 1) ||
                                            currentTest?.chosenRound1 ||
                                            (currentQuestion[questionIndex]
                                              ?.chosenRound2 &&
                                              roundId === 2) ||
                                            currentTest?.chosenRound2
                                          }
                                          onChange={() => {
                                            if (
                                              (currentQuestion[questionIndex]
                                                ?.chosenRound1 &&
                                                roundId === 1) ||
                                              (currentQuestion[questionIndex]
                                                ?.chosenRound2 &&
                                                roundId === 2)
                                            ) {
                                              return;
                                            }

                                            // Met à jour l'état pour suivre la réponse sélectionnée
                                            setSelectedAnswers((prev) => ({
                                              ...prev,
                                              [currentQuestion[questionIndex]
                                                ?.id]: index2,
                                            }));

                                            // Appelle handleAnswerClick uniquement lorsque l'utilisateur fait un choix
                                            handleAnswerClick(
                                              currentQuestion[questionIndex]
                                                ?.id,
                                              index2,
                                              answer
                                            );
                                          }}
                                          className="tw-mr-2"
                                          disabled={
                                            (currentQuestion[questionIndex]
                                              ?.chosenRound1 &&
                                              roundId === 1) ||
                                            currentTest?.chosenRound1 ||
                                            (currentQuestion[questionIndex]
                                              ?.chosenRound2 &&
                                              roundId === 2) ||
                                            currentTest?.chosenRound2
                                          }
                                        />
                                        {answer.wording}
                                      </label>
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <p className="tw-text-red-500 tw-font-bold tw-text-center tw-py-4 tw-text-lg">
                                  Question en cours de chargement...
                                </p>
                              )}
                            </div>

                            <div className="tw-bg-orange-500 tw-mt-3 tw-p-3 tw-rounded-lg">
                              <p className="tw-text-white">
                                {(currentQuestion[questionIndex]
                                  ?.chosenRound1 &&
                                  roundId === 1) ||
                                (currentQuestion[questionIndex]?.chosenRound2 &&
                                  roundId === 2)
                                  ? "Vous avez déjà répondu à cette question."
                                  : "Cliquez sur la réponse qui vous semble correcte..."}
                              </p>
                            </div>

                            <button
                              className="btn btn-primary tw-mt-4"
                              onClick={() => {
                                handleClosePart();
                              }}
                            >
                              Terminer la partie
                            </button>

                            {showClosePartModal && (
                              <ClosePart
                                showModal={showClosePartModal}
                                closePartConfirmed={closePartConfirmed}
                              />
                            )}
                          </div>
                        ))
                      ) : (
                        <h1 className="tw-text-center tw-text-gray-500">
                          Aucun domaine disponible
                        </h1>
                      )}

                      <div className="-tw-mt-8">
                        <Timer
                          userId={user?.id}
                          defaultDuration={currentTest?.duration}
                          roundId={roundId}
                          thematiqueId={thematiqueId}
                          watchTimer={handleWatchTimer}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h1 className="banniere-title tw-text-5xl tw-ml-5 tw-md:text-6xl tw-leading-tight tw-font-bold">
                        RESULTAT DU TEST
                      </h1>

                      <StatistiqueDuTest
                        secondRond={handleSecondRond}
                        currentTest={currentTest}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterOne />
      </div>
    </div>
  );
}

export default Qcm;
