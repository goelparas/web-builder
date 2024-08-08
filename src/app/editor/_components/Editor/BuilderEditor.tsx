"use client";
import { EditorContext } from "@/libs/context/editor.context";
import { EditorActionType } from "@/libs/types/editor-action.types";
import { cn } from "@/libs/utils/utils";
import { EyeOffIcon } from "lucide-react";
import React, { useContext } from "react";
import RenderComponent from "./EditorComponent/ElementComponents/RenderComponent";
const BuilderEditor = () => {
  const { state, dispatch } = useContext(EditorContext);
  const { device, previewMode, elements } = state.editor;

  const handlePreview = () =>
    dispatch({ type: EditorActionType.TOGGLE_PREVIEW_MODE });

  return (
    <div
      className={cn(
        "h-full relative overflow-scroll duration-100  border  bg-white transition-all rounded-md shadow-sm",
        {
          "!p-0 !mr-0 fixed w-full h-full":
            previewMode === true,
          "!w-[850px]  ": device === "tablet",
          "!w-[420px] ": device === "mobile",
          "w-full": device === "desktop",
        }
      )}
    >
      {previewMode && (
        <div className="absolute top-4 left-4  z-50" onClick={handlePreview}>
          <EyeOffIcon stroke="black" />
        </div>
      )}
      {Array.isArray(elements) &&
        elements.map((element) => (
          <RenderComponent key={element.elementId} element={element} />
        ))}
    </div>
  );
};

export default BuilderEditor;
