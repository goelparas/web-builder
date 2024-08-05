"use client";
import { createContext, Dispatch, useReducer } from "react";
import { DeviceType, WebBuilder } from "../types/editor";
import { EditorReducer, initialState } from "../reducer";
import { EditorAction } from "../actions/editor.actions";
import React from "react";

// type EditorContextType = {
//   device: DeviceType;
//   previewMode: boolean;
//   setPreviewMode: (previewMode: boolean) => void;
//   setDevice: (device: DeviceType) => void;
// };
type EditorProps = {
  children: React.ReactNode;
  pageId: string;
  // pageDetails: FunnelPage
};
export const EditorContext = createContext<{
  state: WebBuilder;
  dispatch: Dispatch<EditorAction>;
  pageId: string;
}>({
  state: initialState,
  dispatch: () => {},
  pageId: "",
});

export const EditorProvider = ({ children, pageId }: EditorProps) => {
  const [state, dispatch] = useReducer(EditorReducer, initialState);
  return (
    <>
      <EditorContext.Provider
        value={{
          state,
          dispatch,
          pageId,
        }}
      >
        {children}
      </EditorContext.Provider>
    </>
  );
};
