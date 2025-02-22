import { AppDispatch } from "@/app/store";
import { EventName } from "@/constants/constants";
import { setContent, setExecutionResponse, setLanguage } from "@/slices/editor";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useSocket = () => {
    const dp = useDispatch<AppDispatch>();
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
            setSocket(ws);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.eventName === EventName.ReceivedMessage) {
                    dp(setContent(data.message.content));
                }
                if (data.eventName === EventName.SetOutput) {
                    dp(setExecutionResponse(JSON.parse(data.message.output)));
                }
                if (data.eventName === EventName.SetLanguage) {
                    dp(setLanguage(data.message.language));
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        ws.onclose = () => {
            console.log("Disconnected from server");
        };

        ws.onerror = (event) => {
            console.log("WebSocket error:", event);
        };

        return () => {
            console.log("Closing socket");
            ws.close();
        };
    }, []);

    return socket;
};

export default useSocket;
