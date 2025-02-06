export default function Instruction() {
  return (
    <div>
      <div className=" tw-mb-3 tw-text-gray-800 tw-p-3 tw-rounded-md tw-font-semibold tw-cursor-pointer tw-border tw-border-gray-400">
        <ul className="tw-text-lg">
          Avant de commencer le test, veuillez prendre en compte les
          recommandations suivantes :
          <li className="tw-text-sm tw-my-2">
            👉 Assurez-vous d’être dans de bonnes conditions de concentration.
          </li>
          <li className="tw-text-sm tw-my-2">
            👉 Lisez attentivement le document associé avant de démarrer.
          </li>
          <li className="tw-text-sm tw-my-2">
            👉 Vous disposez d’un maximum de deux essais.
          </li>
          <li className="tw-text-sm tw-my-2">
            👉 Pour chaque essai, vous n’aurez qu’une seule opportunité de
            cliquer.
          </li>
          <li className="tw-text-sm tw-my-2">
            👉 N&apos;actualiser pas la page. Vous risquez de perdre la partie.
          </li>
        </ul>
      </div>
    </div>
  );
}
