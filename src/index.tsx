import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import jwt from "jsonwebtoken";
// import axios from "axios";

// const token = jwt.sign(
//   {},
//   import.meta.env.VITE_API_SERVER_JWT_TOKEN_SECRET ?? ""
// );
// axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
