export default function LeftContent() {
  return (
    <div className="tw-border-r tw-border-r-zinc-600 tw-hidden lg:tw-block">
      <div className="authentication-cover-content rounded tw-h-screen tw-flex tw-justify-center">
        <div className="text-center tw-fixed tw-top-1/2 tw-transform tw-translate-y-[-50%] tw-p-5 d-flex align-items-center justify-content-center">
          <div>
            <div className="mb-5 tw-flex tw-justify-center">
              <img
                src="assets/images/logo/ora.png"
                className="authentication-image"
                alt="Logo"
              />
            </div>

            <div className="mb-5 tw-flex tw-flex-col tw-items-center">
              <div className="tw-flex tw-justify-end tw-w-[70%] -tw-mt-9">
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
              <span className="tw-text-green-600 tw-ml-1 font-weight-bold">
                un pas en avant!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
