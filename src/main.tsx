import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();
const isDevelopmentMode = import.meta.env.MODE === "development";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {isDevelopmentMode && <ReactQueryDevtools />}
    </QueryClientProvider>
  </React.StrictMode>
);
