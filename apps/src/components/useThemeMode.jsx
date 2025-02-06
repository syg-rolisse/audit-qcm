import { useEffect, useState } from "react";

const useThemeMode = () => {
  const [themeMode, setThemeMode] = useState(
    document.documentElement.getAttribute("data-theme-mode") || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeMode(document.documentElement.getAttribute("data-theme-mode"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme-mode"],
    });

    return () => observer.disconnect();
  }, []);

  return { themeMode };
};

export default useThemeMode;
