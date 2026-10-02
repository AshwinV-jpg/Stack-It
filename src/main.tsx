
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { ErrorScreen } from "./app/components/ErrorScreen.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(<ErrorScreen><App /></ErrorScreen>);
  