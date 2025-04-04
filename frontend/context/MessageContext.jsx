import { createContext } from "react";
import { axiosInstance } from "../lib/axios";
import React from "react"

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const getMessages = async (userId) => {
    try {
      const res = await axiosInstance.get(`/messages/receive/${userId}`);
      return res.data.messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  const sendMessage = async ({ receiverId, text, image }) => {
    try {
      const res = await axiosInstance.post("/messages/send", {
        receiverId,
        text,
        image,
      });
      return res.data.message;
    } catch (error) {
      console.error("Error sending message:", error);
      return null;
    }
  };

  return (
    <MessageContext.Provider value={{ getMessages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
