export default function Logo() {
  return (
    <div>
      <div className="mb-5 tw-flex tw-justify-center">
        <img
          src="assets/images/logo/ora.png"
          className="tw-w-24"
          alt="Logo"
        />
      </div>

      <div className="mb-5 tw-flex tw-flex-col tw-items-center">
        <div className="tw-flex tw-justify-end tw-w-[70%] -tw-mt-11">
          <h2 className="tw-text-[10px] tw-font-bold tw-w-[47%] tw-text-green-600">
            ADVICES
          </h2>
        </div>
      </div>
    </div>
  );
}
