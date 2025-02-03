import PropTypes from "prop-types";

const CardDomain = ({ testDomains }) => {
  return (
    <div className="">
      {testDomains?.map((testDom, domainIndex) => (
        <div key={domainIndex} className="tw-mb-2 tw-mt-8">
          <p className="tw-text-lg tw-font-bold">
            {domainIndex + 1 + " -) " + testDom?.wording}
          </p>

          <div>
            {testDom?.TestQuestions.map((testQuestion, questionIndex) => (
              <div className=" tw-p-4" key={questionIndex}>
                <div className="tw-font-medium tw-mb-2">
                  <h3 className="tw-mb-2 tw-font-semibold">
                    {questionIndex + 1 + " -) "}
                    {testQuestion?.wording}
                  </h3>

                  <div className="tw-text-gray-400">
                    <p>A-t-il répondu à cette question ?</p>
                    {testQuestion?.chosenRound1 ? (
                      <p>Round 1 : Oui</p>
                    ) : (
                      <p>Round 1 : Non</p>
                    )}
                    {testQuestion?.chosenRound2 ? (
                      <p>Round 2 : Oui</p>
                    ) : (
                      <p>Round 2 : Non</p>
                    )}
                  </div>
                </div>

                <div className="tw-flex tw-flex-grow tw-gap-3">
                  {testQuestion?.TestAnswers.map((testAnswer, answerIndex) => (
                    <div
                      className={`tw-border tw-rounded-lg tw-p-2 ${
                        testAnswer?.nature === "br"
                          ? "tw-border-green-600"
                          : "tw-border-red-500"
                      }`}
                      key={answerIndex}
                    >
                      <div className="d-flex tw-relative justify-content-center align-items-center tw-mb-2">
                        {testAnswer?.chosenRound1 ? (
                          <span className="btn btn-icon d-flex justify-content-center align-items-center d-flex justify-content-center align-items-center rounded-pill tw-absolute -tw-right-2 -tw-top-4">
                            R1
                          </span>
                        ) : (
                          <span className="tw-ml-2"></span>
                        )}
                        {testAnswer?.chosenRound2 ? (
                          <span className="btn btn-icon d-flex justify-content-center align-items-center d-flex justify-content-center align-items-center rounded-pill tw-absolute -tw-right-2 -tw-top-4">
                            R2
                          </span>
                        ) : (
                          <span className="tw-ml-2"></span>
                        )}
                      </div>
                      {testAnswer?.nature === "br" ? (
                        <div className="bg-success-transparent text-success tw-px-2 tw-rounded-md tw-mb-2 tw-py-2">
                          Bonne réponse
                        </div>
                      ) : (
                        <div className="bg-danger-transparent text-danger tw-px-2 tw-rounded-md tw-mb-2 tw-py-2">
                          Mauvaise réponse
                        </div>
                      )}
                      <span className="tw-ml-2">{testAnswer?.wording}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

CardDomain.propTypes = {
  testDomains: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardDomain;
