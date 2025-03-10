export default function Footer() {
  // Obtenir l'année courante
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="footer mt-auto py-3 bg-white text-center">
        <div className="container">
          <span className="text-muted">
            Copyright © {currentYear}
            <span className="tw-text-orange-600"> &nbsp;Ora ADVICES&nbsp;</span>
            Tous droit réservés
          </span>
        </div>
      </footer>
    </div>
  );
}
