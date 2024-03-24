import React from "react";
import ReactDOM from "react-dom/client";
import { IconContext } from "react-icons";
import {
  RouterProvider
} from "react-router-dom";

import Layout from "./components/templates/Layout";
import { LangueProvider } from "./contexts/language";

import router from "./router";

import "./style/main.css";
import "./style/styles.css";
import "./style/variables.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LangueProvider>
      <IconContext.Provider value={{ className: "react-icon" }}>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </IconContext.Provider>
    </LangueProvider>
  </React.StrictMode>
);
