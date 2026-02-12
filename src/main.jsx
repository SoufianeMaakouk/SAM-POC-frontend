import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AllocationProvider } from "./context/AllocationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AllocationProvider>
      <App />
    </AllocationProvider>
  </React.StrictMode>
);
