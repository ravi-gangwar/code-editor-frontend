import { RootState } from "@/app/store";
import { EDITOR_DEFAULTS } from "@/constants/constants";
import { TExecutionResponse } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TLangs = "Javascript" | "Python" | "Java";
export type TFiles = "index.js" | "main.py" | "MyClass.java";
type TTabs = {
  name: string;
  language: string;
  content: string;
};

type TInitialState = {
  ActiveLanguage: TLangs | string;
  multiTabs: TTabs[];
  executionResponse: TExecutionResponse | null;
  isActive: boolean;
};

const initialState: TInitialState = {
  ActiveLanguage: EDITOR_DEFAULTS.ACTIVE_LANGUAGE,
  multiTabs: [...EDITOR_DEFAULTS.MULTI_TABS],
  executionResponse: null,
  isActive: false,
};

const editor = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<TLangs | string>) => {
      state.ActiveLanguage = action.payload;
    },
    setExecutionResponse: (state, action: PayloadAction<TExecutionResponse>) => {
      state.executionResponse = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      if(state.ActiveLanguage === "Javascript") {
        state.multiTabs[0].content = action.payload;
      }
      if(state.ActiveLanguage === "Python") {
        state.multiTabs[1].content = action.payload;
      }
      if(state.ActiveLanguage === "Java") {
        state.multiTabs[2].content = action.payload;
      }
    },  
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
},
});

export const { setLanguage, setExecutionResponse, setContent, setIsActive } = editor.actions;
export default editor.reducer;

// Selectors
export const Activelanguage = (state: RootState) => state.editor.ActiveLanguage;
export const executionResponse = (state: RootState) => state.editor.executionResponse;
export const tabs = (state: RootState) => state.editor.multiTabs;
export const isActive = (state: RootState) => state.editor.isActive;