import PrintableCertificate from "./PrintableCertificate";

export default function StatistiqueDuTest(currentTest, handleSecondRond) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <div className="tw-p-6 tw-bg-gray-100 tw-rounded-lg tw-shadow-lg tw-space-y-4">
        <h1 className="tw-text-2xl tw-font-bold tw-text-green-700">
          {currentTest.wording}
        </h1>

        {currentTest && currentTest.round1 && currentTest.round2 ? (
          <div className="tw-bg-gray-50 tw-p-3 tw-rounded-md tw-mt-2  tw-border tw-border-gray-300">
            <p className="tw-text-sm tw-text-green-700 tw-font-bold">
              Vous avez terminé les deux rounds de ce test.
            </p>
          </div>
        ) : (
          <div className="tw-bg-orange-100 tw-p-4 tw-rounded-md tw-border tw-border-orange-300">
            <h1 className="tw-text-lg tw-font-medium tw-text-orange-600">
              Vous avez terminé le round 1 de ce test.
            </h1>
            <p className="tw-text-sm tw-text-gray-700">
              Voulez-vous essayer un dernier round pour conserver le meilleur
              résultat ?
            </p>
            <div className="tw-bg-gray-50 tw-p-3 tw-rounded-md tw-mt-2 ">
              <p className="tw-text-sm tw-text-gray-700">
                Si oui, cliquez
                <span
                  className="tw-font-bold tw-text-red-600 cursor-pointer tw-ml-2 tw-cursor-pointer"
                  onClick={() => handleSecondRond}
                >
                  ici
                </span>
                .
              </p>
            </div>
          </div>
        )}

        {/* Section pour afficher currentTest */}
        <div className="tw-bg-gray-50 tw-p-4 tw-rounded-md tw-border tw-border-gray-300">
          <h2 className="tw-text-lg tw-font-bold tw-text-gray-800">
            Détails du test :
          </h2>

          <p className="tw-text-gray-500 tw-my-2">
            <strong>Nom & Prénom : </strong> {currentTest?.user?.fullName}
          </p>

          <p className="tw-text-gray-500 tw-my-2">
            <strong>Email : </strong> {currentTest?.user?.email}
          </p>

          <p className="tw-text-gray-500 tw-my-2">
            <strong>Contact : </strong> {currentTest?.user?.phoneNumber}
          </p>

          <p className="tw-text-gray-500 tw-my-2">
            <strong>Créé le :</strong>{" "}
            {new Date(currentTest.createdAt).toLocaleString()}
          </p>

          {currentTest && Object.keys(currentTest).length > 0 ? (
            <div
              className="tw-text-sm tw-text-gray-600"
              style={{ lineHeight: "2.5em" }}
            >
              <div className="tw-bg-orange-100 tw-p-4 tw-rounded-md tw-border tw-border-orange-300 tw-my-4">
                <p>
                  <strong>Total Round 1 :</strong> {currentTest.totalRound1}{" "}
                  Point (s)
                </p>
                <div
                  className="tw-w-full tw-h-4 tw-rounded-full tw-mt-2"
                  style={{
                    backgroundColor:
                      currentTest.totalRound1 >= currentTest?.purcent
                        ? "green"
                        : "red",
                    width: `${currentTest.totalRound1}%`,
                  }}
                ></div>
                <p>
                  <strong>Total Round 2 :</strong> {currentTest.totalRound2}{" "}
                  Point (s)
                </p>
                <div
                  className="tw-w-full tw-h-4 tw-rounded-full tw-mt-2"
                  style={{
                    backgroundColor:
                      currentTest.totalRound2 >= currentTest?.purcent
                        ? "green"
                        : "red",
                    width: `${currentTest.totalRound2}%`,
                  }}
                ></div>
              </div>

              {currentTest.totalRound1 >= currentTest?.purcent ||
              currentTest.totalRound2 >= currentTest?.purcent ? (
                <div className="tw-mt-4 tw-text-green-600">
                  <h3>
                    {" "}
                    🎉 Félicitations ! Vous avez atteint les 70 % requis pour
                    validation dans l&apos;un des rounds ! 🎉
                  </h3>
                  <div className="tw-bg-green-100 tw-p-4 tw-rounded-md tw-border tw-border-green-300 tw-text-center tw-mt-4">
                    <PrintableCertificate
                      user={user}
                      currentTest={currentTest}
                      thematique={currentTest.thematiqueWording}
                    />
                  </div>
                </div>
              ) : (
                <div className="tw-mt-4 tw-text-red-600">
                  <strong>OOOPS 🤦</strong>
                  <span>
                    🚀 Vous n&apos;avez malheureusement pas atteint les 70%
                    requis. Mais continuez à travailler dur, vous pouvez y
                    arriver ! 🚀
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="tw-text-sm tw-text-gray-600">
              Aucun test à afficher pour le moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
