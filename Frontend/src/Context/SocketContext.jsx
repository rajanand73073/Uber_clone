import React, { Children, createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const CreateSocketContext = createContext();

export const SocketContext = ({ children }) => {
  const socket = io(`${import.meta.env.VITE_BASE_URL}`);
  //This is the Socket.IO client method that attempts to establish a WebSocket connection to the specified server.
  //It tries to connect to the URL provided inside io(), which in this case is ${import.meta.env.VITE_BASE_URL}

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  return (
    <CreateSocketContext.Provider value={{ socket }}>
      {children}
    </CreateSocketContext.Provider>
  );
};

export default SocketContext;
