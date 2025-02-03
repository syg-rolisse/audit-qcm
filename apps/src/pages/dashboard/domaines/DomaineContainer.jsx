import { useEffect, useState } from "react";
import IndexQuestion from "../question/IndexQuestion";
import IndexDomaine from "./IndexDomaine";

function DomaineContainer() {
  const [activeComponent, setActiveComponent] = useState("domaine");
  const [selectedDomainId, setSelectedDomainId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleSwitch = (component, domainId = null) => {
    setActiveComponent(component);
    setSelectedDomainId(domainId);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "domaine":
        return <IndexDomaine onSwitch={handleSwitch} />;
      case "question":
        return (
          <IndexQuestion domainId={selectedDomainId} onSwitch={handleSwitch} />
        );
      default:
        return <IndexDomaine onSwitch={handleSwitch} />;
    }
  };

  if (isLoading) {
    return (
      <div className="loader-overlay">
        <div className="loader-spinner"></div>
      </div>
    );
  }

  return <div>{renderComponent()}</div>;
}

export default DomaineContainer;
