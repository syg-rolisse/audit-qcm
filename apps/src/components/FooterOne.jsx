export default function FooterOne() {
  // Obtenir l'année courante
  const currentYear = new Date().getFullYear();

  return (
    <footer className="tw-bg-gray-200 py-4 tw-h-32 tw-flex tw-items-center">
      <div className="container mx-auto text-center">
        <span className="text-muted">
          Copyright © {currentYear}{" "}
          <span className="tw-text-orange-600"> &nbsp;Ora ADVICES&nbsp;</span>
          Tous droit réservés
        </span>
      </div>
    </footer>
  );
}
