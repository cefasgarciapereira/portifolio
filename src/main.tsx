import React from "react";
import ReactDOM from "react-dom/client";

import { IconContext } from "react-icons";

import Layout from "./components/templates/Layout";

import Home from "./pages/Home";

import { LangueProvider } from "./contexts/language";

import "./style/main.css";
import "./style/styles.css";
import "./style/variables.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LangueProvider>
      <IconContext.Provider value={{ className: "react-icon" }}>
        <Layout>
          <Home />
        </Layout>
      </IconContext.Provider>
    </LangueProvider>
  </React.StrictMode>
);
