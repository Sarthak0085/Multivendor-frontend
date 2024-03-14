import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        toastOptions={{
          duration: 4000,
          position: "top-center",
          style: {
            border: "2px solid",
            padding: "16px",
          },
        }}
      />
    </Provider>
  </React.StrictMode>
);
