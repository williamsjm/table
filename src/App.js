import React from "react";
import { BrowserRouter } from "react-router-dom";

import { createBrowserHistory } from "history";
import "antd/dist/antd.css";
import "./index.css";
import "./App.css";
import Routes from "./Routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
