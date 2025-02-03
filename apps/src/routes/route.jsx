import AuthMainLayout from "../components/AuthMainLayout";
import MainLayout from "../components/MainLayout";
import AuthMiddleware from "../middleware/AuthMiddleware";
import Dashboard from "../pages/dashboard/Dashboard";
import DomaineContainer from "../pages/dashboard/domaines/DomaineContainer";
import IndexPermission from "../pages/dashboard/permissions/IndexPermission";
import IndexQuestion from "../pages/dashboard/question/IndexQuestion";
import ListTest from "../pages/dashboard/test/ListTest";
import IndexThematique from "../pages/dashboard/thematique/IndexThematique";
import IndexUser from "../pages/dashboard/users/IndexUser";
import NotFoundPage from "../pages/NotFoundPage";
import Qcm from "../pages/Qcm";
import Thematique from "../pages/Thematique";
const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <AuthMainLayout />,
      },
    ],
  },
  {
    path: "/login",
    children: [
      {
        path: "",
        element: <AuthMainLayout />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthMiddleware />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "domaines",
            element: <DomaineContainer />,
          },
          {
            path: "liste-des-thematiques",
            element: <IndexThematique />,
          },
          {
            path: "liste-des-questions/:domainId",
            element: <IndexQuestion />,
          },
          {
            path: "liste-des-tests",
            element: <ListTest />,
          },
          {
            path: "utilisateurs",
            element: <IndexUser />,
          },
          {
            path: "permissions",
            element: <IndexPermission />,
          },
        ],
      },
      {
        path: "/thematique",
        element: <Thematique />,
      },
      {
        path: "/test",
        element: <Qcm />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
