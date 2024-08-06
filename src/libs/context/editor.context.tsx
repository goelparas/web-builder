"use client";
import { createContext, Dispatch, useReducer } from "react";
import { DeviceType, WebBuilder } from "../types/editor.types";
import { EditorReducer, initialState } from "../reducer";
import { EditorAction } from "../actions/editor.actions";
import React from "react";
type EditorProps = {
  children: React.ReactNode;
  
};
export const EditorContext = createContext<{
  state: WebBuilder;
  dispatch: Dispatch<EditorAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const EditorProvider = ({ children }: EditorProps) => {
  const [state, dispatch] = useReducer(EditorReducer, initialState);
  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
