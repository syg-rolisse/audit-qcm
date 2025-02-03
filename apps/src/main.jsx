import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "./index.css";
import routes from "./routes/route.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
  },
});

createRoot(document.getElementById("root")).render(
  <>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </>
);

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { createRoot } from "react-dom/client";
// import { Toaster } from "react-hot-toast";
// import { RouterProvider } from "react-router-dom";
// import "./App.css";
// import "./index.css";
// import route from "./routes/route.jsx";

// const queryClient = new QueryClient();

// createRoot(document.getElementById("root")).render(
//   // <StrictMode> // Retirez temporairement pour tester
//   <>
//     <Toaster />
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={route} />
//     </QueryClientProvider>
//   </>
//   // </StrictMode>
// );
