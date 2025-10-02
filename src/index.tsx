import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import jwt from "jsonwebtoken";
// import axios from "axios";

// const token = jwt.sign(
//   {},
//   import.meta.env.VITE_API_SERVER_JWT_TOKEN_SECRET ?? ""
// );
// axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
