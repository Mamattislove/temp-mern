import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import customFetch from "./utils/customFetch.jsx";
import axios from "axios";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
        <ToastContainer position="top-center" />
    </StrictMode>
);
