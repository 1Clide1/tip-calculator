import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// serviceWorkerRegistration.register();
if (process.env.NODE_ENV === "development") {
  serviceWorkerRegistration.unregister();
} else {
  serviceWorkerRegistration.register();
}
ReactDOM.render(<App />, document.getElementById("root"));
// run the new service worker
// serviceWorker();
