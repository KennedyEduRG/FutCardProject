import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { MatchPage } from "./routes/MatchPage";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/match", element: <MatchPage /> }
  ]);