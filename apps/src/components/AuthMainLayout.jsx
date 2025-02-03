import { useEffect } from "react";
//import { Outlet } from "react-router-dom";
//import AuthHeader from "../components/AuthHeader";
import Offcanvas from "../components/Offcanvas";
import AuthContainer from "../pages/auth/AuthContainer";

const AuthMainLayout = () => {
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const scripts = [
      // "assets/libs/@popperjs/core/umd/popper.min.js",
      // "assets/libs/bootstrap/js/bootstrap.bundle.min.js",
      // "assets/js/defaultmenu.min.js",
      // "assets/libs/node-waves/waves.min.js",
      // "assets/js/sticky.js",
      // "assets/libs/simplebar/simplebar.min.js",
      // "assets/js/simplebar.js",
      // "assets/libs/@simonwep/pickr/pickr.es5.min.js",
      // "assets/libs/flatpickr/flatpickr.min.js",
      // "assets/js/date-range.js",
      // "assets/libs/apexcharts/apexcharts.min.js",
      // "assets/js/index3.js",
      // "assets/js/custom-switcher.min.js",

      /* Modal */
      // "assets/libs/prismjs/prism.js",
      // "assets/js/prism-custom.js",
      // "assets/js/modal.js",
      /* Modal */

      // "assets/js/custom.js",
    ];

    const loadScriptsSequentially = async () => {
      for (const src of scripts) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.defer = true;
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error(`Erreur de chargement : ${src}`));
          document.body.appendChild(script);
        });
      }
      // setIsLoading(true);
      // setTimeout(() => setIsLoading(false), 1000);
      //console.log("Tous les scripts ont été chargés.");
    };

    loadScriptsSequentially();

    return () => {
      scripts.forEach((src) => {
        const scriptElement = document.querySelector(`script[src="${src}"]`);
        if (scriptElement) {
          document.body.removeChild(scriptElement);
        }
      });
    };
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="loader-overlay">
  //       <div className="loader-spinner"></div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Offcanvas />

      <div className="page">
        {/* <AuthHeader /> */}

        <AuthContainer>

        </AuthContainer>

        {/* <div className="-tw-mt-48">
          <Outlet />
        </div> */}
      </div>

    
    </div>
  );
};

export default AuthMainLayout;
