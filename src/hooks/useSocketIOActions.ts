import { Socket } from "socket.io-client";

interface UseSocketIOActionsOptions {
  socket: Socket | null;
  isConnected: boolean;
}

export interface LanguageChangePayload {
  language: string;
  code?: string;
  timestamp: string;
  type: "language";
}

const useSocketIOActions = ({ socket, isConnected }: UseSocketIOActionsOptions) => {
  const broadcastCode = (code: string) => {
    if (!socket || !isConnected) return;

    socket.emit("broadcast", {
      code,
      timestamp: new Date().toISOString(),
      type: "code",
    });
  };

  const broadcastLanguage = (language: string, code?: string) => {
    if (!socket || !isConnected) return;

    const payload: LanguageChangePayload = {
      language,
      timestamp: new Date().toISOString(),
      type: "language",
    };

    if (code !== undefined) {
      payload.code = code;
    }

    socket.emit("broadcast", payload);
  };

  return {
    broadcastCode,
    broadcastLanguage,
  };
};

export default useSocketIOActions;

