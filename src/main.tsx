import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./providers/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <BrowserRouter>
         <UserProvider>
            <App />
         </UserProvider>
      </BrowserRouter>
   </React.StrictMode>
);
