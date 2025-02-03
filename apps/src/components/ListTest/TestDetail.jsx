import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosConfig";
import CardDomain from "../Domaines/CardDomain";
import PrintableCertificate from "../PrintableCertificate";

function TestDetail({ testId }) {
  const [currentTest, setCurrentTest] = useState();
  const prevTestIdRef = useRef();
  const addTestLinkRef = useRef();

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
      toast.error(error?.response?.data?.message, {
        duration: 12000,
        style: {
          zIndex: 9999,
        },
      });
    }
  };

  const getTest = useMutation(
    (param) =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/test?testId=${param.testId}`
      ),
    {
      onSuccess: (response) => {
        console.log(response?.data?.test);

        setCurrentTest(response?.data?.test);
      },
      onError: handleError,
    }
  );

  useEffect(() => {
    if (testId) {
      prevTestIdRef.current = testId;
      getTest.mutate({ testId });
      if (addTestLinkRef.current) {
        addTestLinkRef.current.click();
      }
    }
  }, [testId]);

  return (
    <div className="row">
      <a
        ref={addTestLinkRef}
        aria-disabled
        data-bs-toggle="modal"
        href="#exampleModalXlLabel"
        style={{ cursor: "pointer" }}
      ></a>

      <div
        className="modal fade"
        id="exampleModalXlLabel"
        tabIndex="-1"
        aria-labelledby="exampleModalXlLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content tw-border">
            <div className="modal-header">
              <h6 className="modal-title" id="exampleModalXlLabel">
                Statut du test
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div
              className="modal-body"
              style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
              <div className="tw-p-4 tw-rounded-md tw-border tw-border-gray-300">
                <h2 className="tw-text-lg tw-font-bold">Détails du test :</h2>

                {currentTest && Object.keys(currentTest).length > 0 ? (
                  <div
                    className="tw-text-sm tw-text-gray-600"
                    style={{ lineHeight: "1.5rem" }}
                  >
                    <p className="tw-text-gray-500 tw-my-2">
                      <strong>Nom & Prénom : </strong>
                      {currentTest?.user?.fullName}
                    </p>

                    <p className="tw-text-gray-500 tw-my-2">
                      <strong>Email : </strong> {currentTest?.user?.email}
                    </p>

                    <p className="tw-text-gray-500 tw-my-2">
                      <strong>Contact : </strong>
                      {currentTest?.user?.phoneNumber}
                    </p>

                    <p className="tw-text-gray-500 tw-my-2">
                      <strong>Créé le :</strong>
                      {new Date(currentTest.createdAt).toLocaleString()}
                    </p>
                    <div className=" tw-p-4 tw-rounded-md tw-border tw-border-orange-300 tw-my-4">
                      <p>
                        <strong>Total Round 1 :</strong>
                        {currentTest.totalRound1} Point(s)
                      </p>
                      <div
                        className="tw-w-full tw-h-4 tw-rounded-full tw-mt-2"
                        style={{
                          backgroundColor:
                            currentTest.totalRound1 >= 70 ? "green" : "red",
                          width: `${currentTest.totalRound1}%`,
                        }}
                      ></div>
                      <p>
                        <strong>Total Round 2 :</strong>
                        {currentTest.totalRound2} Point(s)
                      </p>
                      <div
                        className="tw-w-full tw-h-4 tw-rounded-full tw-mt-2"
                        style={{
                          backgroundColor:
                            currentTest.totalRound2 >= 70 ? "green" : "red",
                          width: `${currentTest.totalRound2}%`,
                        }}
                      ></div>
                    </div>

                    {currentTest.totalRound1 >= 70 ||
                    currentTest.totalRound2 >= 70 ? (
                      <div className="tw-mt-4">
                        <p>
                          <strong>Attestation disponible :</strong>
                          {currentTest.attestationDispo ? " Oui" : " Non"}
                        </p>
                        🎉 Félicitations ! Vous avez atteint les 70 % requis
                        pour validation dans l&apos;un des rounds ! 🎉
                        {currentTest.attestationDispo ? (
                          <div className="tw-bg-green-100 tw-p-4 tw-rounded-md tw-border tw-border-green-300 tw-text-center tw-mt-4">
                            <PrintableCertificate
                              user={currentTest?.user}
                              currentTest={currentTest}
                              thematique={currentTest?.thematique.wording}
                            />
                          </div>
                        ) : (
                          <div className="tw-bg-gray-50 tw-p-3 tw-rounded-md tw-mt-2 tw-border tw-border-gray-300">
                            <p className="tw-text-sm tw-text-gray-700">
                              Merci de patienter le temps que votre certificat
                              soit disponible.
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="tw-mt-4 tw-text-red-600">
                        <strong>OOOPS 🤦</strong>
                        <span>
                          🚀 Vous n&apos;avez malheureusement pas atteint les
                          70% requis. Mais continuez à travailler dur, vous
                          pouvez y arriver ! 🚀
                        </span>
                      </div>
                    )}
                    <CardDomain testDomains={currentTest?.TestDomain} />
                  </div>
                ) : (
                  <p className="tw-text-sm tw-text-gray-600">
                    Aucun test à afficher pour le moment.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TestDetail.propTypes = {
  testId: PropTypes.number,
};

export default TestDetail;
