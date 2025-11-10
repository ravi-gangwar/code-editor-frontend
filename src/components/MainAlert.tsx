"use client";

import { useEffect, useState } from "react";

const INITIAL_COUNTDOWN_SECONDS = 10;

function MainAlert() {
  const [isVisible, setIsVisible] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(
    INITIAL_COUNTDOWN_SECONDS
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          setIsVisible(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-900/70">
      <div className="mx-4 w-full max-w-md rounded-lg bg-zinc-800 p-6 text-center shadow-2xl dark:bg-zinc-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Temporary Downtime
        </h2>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          We are running out of credits on GCP, so our server is currently down. Sorry for the inconvenience.
        </p>
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          This message will dismiss automatically in {secondsRemaining} seconds.
        </p>
      </div>
    </div>
  );
}

export default MainAlert;
