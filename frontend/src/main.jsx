import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./../context/UserContext.jsx";
import { PostProvider } from "../context/Post.Context.jsx";
import { MessageProvider } from "../context/MessageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PostProvider>
          <MessageProvider>
            <App />
          </MessageProvider>
        </PostProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
