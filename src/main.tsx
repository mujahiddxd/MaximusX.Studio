import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import MaximusXPortfolio from "./routes/index";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MaximusXPortfolio />
  </StrictMode>
);
