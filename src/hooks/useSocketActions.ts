
import { EventName } from "@/constants/constants";
const useSocketActions = ({socket}: {socket: WebSocket | null}) => {
  const joinRoom = (roomId: string) => {
    socket?.send(JSON.stringify({
      eventName: EventName.JoinRoom,
      roomId: roomId,
    }));
  };

  const leaveRoom = (roomId: string) => {
    socket?.send(JSON.stringify({
      eventName: EventName.LeaveRoom,
      roomId: roomId,
    }));
  };

  const sendMessage = (message: string, roomId: string) => {
    socket?.send(JSON.stringify({
      eventName: EventName.SendMessage,
      message: message,
      roomId: roomId,
    }));
  };

  const createRoom = () => {
    socket?.send(
      JSON.stringify({
        eventName: EventName.CreateRoom,
      })
    );
  };

  const setLanguage = (language: string, roomId: string) => {
    socket?.send(JSON.stringify({
      eventName: EventName.SetLanguage,
      language: language,
      roomId: roomId,
    }));
  };

  const setOutput = (output: string, roomId: string) => {
    socket?.send(JSON.stringify({
      eventName: EventName.SetOutput,
      output: output,
      roomId: roomId,
    }));
  };

  return {
    joinRoom,
    leaveRoom,
    sendMessage,
    createRoom,
    setLanguage,
    setOutput,
  };
};

export default useSocketActions;