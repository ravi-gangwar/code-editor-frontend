"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/useContext";
import Navbar from "./components/Navbar";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Theme } from "@radix-ui/themes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Theme>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              <Navbar />
              {children}
              <ToastContainer position="top-right" />
            </div>
          </Theme>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default Providers;
