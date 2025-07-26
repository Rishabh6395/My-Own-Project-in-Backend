import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

const SocketProvider = ({ children }) => {
//   const socketRef = useRef();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    })

  }, []);

  // Send a message to a specific event
  // const sendMessage = (eventName, message) => {
  //   socket.emit(eventName, message);
  // };

  // // Listen for messages from a specific event
  // const receiveMessage = (eventName, callback) => {
  //   socket.on(eventName, callback);
  // };

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;