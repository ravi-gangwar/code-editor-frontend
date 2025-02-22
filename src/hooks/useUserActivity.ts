import { AppDispatch } from "@/app/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsActive } from "@/slices/editor";

const useUserActivity = (timeout = 30, onIdle: () => void) => {
  const dp = useDispatch<AppDispatch>();
  const [isIdle, setIsIdle] = useState(false);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const resetIdleTime = () => {
    if (isIdle) setIsIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setIsIdle(true);
      onIdle();
      dp(setIsActive(false));
    }, timeout * 1000);
  };

  const handleVisibilityChange = () => {

    if (!document.hidden) {
      resetIdleTime();
      dp(setIsActive(true));
    }
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetIdleTime));
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resetIdleTime();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetIdleTime));
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  });

  return isIdle;
};

export default useUserActivity;
