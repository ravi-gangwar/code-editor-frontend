import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketIOOptions {
  roomId: string;
  enabled?: boolean;
  onCodeChange?: (code: string) => void;
  onLanguageChange?: (language: string, code?: string) => void;
}

export const useSocketIO = ({
  roomId,
  enabled = true,
  onCodeChange,
  onLanguageChange,
}: UseSocketIOOptions) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionCount, setConnectionCount] = useState(0);
  
  // Use refs to store callbacks to avoid recreating socket connection
  const onCodeChangeRef = useRef(onCodeChange);
  const onLanguageChangeRef = useRef(onLanguageChange);
  
  // Update refs when callbacks change
  useEffect(() => {
    onCodeChangeRef.current = onCodeChange;
    onLanguageChangeRef.current = onLanguageChange;
  }, [onCodeChange, onLanguageChange]);

  useEffect(() => {
    if (!enabled || !roomId) return;

    const socketURI = process.env.NEXT_PUBLIC_SOCKET_URI || process.env.NEXT_PUBLIC_BACKEND_URI || "http://localhost:5000";

    const newSocket = io(socketURI, {
      query: {
        id: roomId,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    setSocket(newSocket);

    // Connection events
    newSocket.on("connected", (data: { connectionId?: string; uniqueId?: string; message?: string; connections?: number }) => {
      console.log("Connected to server:", data);
      setIsConnected(true);
      if (data.connections !== undefined) {
        setConnectionCount(data.connections);
      } else {
        setConnectionCount(1);
      }
    });

    // Listen for code changes from other clients
    newSocket.on("broadcast", (data: { data: { code?: string; language?: string; type?: string }; sender: string; timestamp: number }) => {
      // Handle language changes
      if (data.data.language !== undefined && onLanguageChangeRef.current) {
        onLanguageChangeRef.current(data.data.language, data.data.code);
      }
      // Handle code changes (only if not a language change)
      else if (data.data.code !== undefined && onCodeChangeRef.current && data.data.type !== "language") {
        onCodeChangeRef.current(data.data.code);
      }
    });

    // Broadcast confirmation
    newSocket.on("broadcast_sent", (data: { recipients: number; message: string }) => {
      console.log("Broadcast sent to", data.recipients, "connection(s)");
      setConnectionCount(data.recipients + 1);
    });

    // Error handling
    newSocket.on("error", (error: unknown) => {
      console.error("Socket error:", error);
    });

    // Disconnection
    newSocket.on("disconnect", (reason: string) => {
      console.log("Disconnected:", reason);
      setIsConnected(false);
      setConnectionCount(0);
    });

    // Reconnection
    newSocket.on("reconnect", (attemptNumber: number) => {
      console.log("Reconnected after", attemptNumber, "attempts");
      setIsConnected(true);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
      setSocket(null);
      setIsConnected(false);
    };
  }, [roomId, enabled]);

  return {
    socket,
    isConnected,
    connectionCount,
  };
};
