import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignIn from "./routes/signin";
import Reservation from "./routes/reservation";
import Dashboard from "./routes/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/dashboard/:bathroom/:prenom/:nom",
    element: <Dashboard />,
  },
  {
    path: "/reservation/:bathroom/:prenom/:nom",
    element: <Reservation />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
