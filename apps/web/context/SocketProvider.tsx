"use client";

import React from "react";
import { Socket, io } from "socket.io-client";

interface IoSocketContext {
  sendMessage: (message: any, userName: any) => any;
  messages: string[];
  userName: string;
  setUserName: (e: string) => any;
}

const SocketContext = React.createContext<IoSocketContext | null>(null);
export const useSocketContext = () => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error("Something went wrong");
  }
  return context;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = React.useState<Socket>();
  const [messages, setMessages] = React.useState<any>([]);
  const [userName, setUserName] = React.useState<string>("");

  const sendMessage: IoSocketContext["sendMessage"] = React.useCallback(
    (userName, message) => {
      if (socket) {
        socket.emit("event:message", { userName, message });
      }
    },
    [socket]
  );

  const onMessageRev = React.useCallback((data: { userName: string, message: string }) => {
    // console.log("from server", message);

    // setMessages((prev: any) => [...prev, data]);
    setMessages((prev: any) => [...prev, { user: data.userName, message: data.message }]);
  }, []);

  React.useEffect(() => {
    const _socket = io("http://localhost:8080");
    _socket.on("message", onMessageRev);
    setSocket(_socket);

    return () => {
      _socket.disconnect();
      _socket.off("message", onMessageRev);
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ sendMessage, messages, userName, setUserName }}
    >
      {children}
    </SocketContext.Provider>
  );
};
