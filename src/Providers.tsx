"use client";
import React from "react";
import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "./context/useContext";
import Navbar from "./components/Navbar";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Theme } from "@radix-ui/themes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";

function ToasterWithTheme() {
  const { theme } = useTheme();
  return <Toaster position="bottom-right" theme={theme as "light" | "dark"} />;
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Theme>
              <Navbar />
              {children}
              <ToasterWithTheme />
          </Theme>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default Providers;
