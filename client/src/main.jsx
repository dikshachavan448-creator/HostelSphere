import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./app.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        success: {
          style: {
            background: "#16a34a",
            color: "#fff",
          },
        },
        error: {
          style: {
            background: "#dc2626",
            color: "#fff",
          },
        },
      }}
    />

    <App />
  </StrictMode>
);
