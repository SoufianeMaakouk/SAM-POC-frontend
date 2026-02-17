import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AllocationProvider } from "./context/AllocationContext";
import "../style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AllocationProvider>
      <App />
    </AllocationProvider>
  </React.StrictMode>
);
