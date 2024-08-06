"use client";
import { defaultStyling } from "@/libs/constant";
import { EditorContext } from "@/libs/context/editor.context";
import { EditorActionType } from "@/libs/types/editor-action.types";
import { EditorBtns } from "@/libs/types/editor-element";
import { cn } from "@/libs/utils/utils";
import { EyeOffIcon } from "lucide-react";
import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import RenderComponent from "./RenderComponent";
import { toast } from "@/components/ui/use-toast";
const BuilderEditor = () => {
  const { state, dispatch } = useContext(EditorContext);
  const { editor } = state;
  const dispatcher = (
    type: EditorBtns,
    content?: { href?: string; innerText?: string }
  ) => {
    console.log("dispatching");
    dispatch({
      type: EditorActionType.ADD_ELEMENT,
      payload: {
        elementDetails: {
          elementId: uuidv4(),
          type: type,
          style: {
            ...defaultStyling,
          },
          content: {
            ...content,
          },
          name: type,
        },
      },
    });
  };
  const addNewElementInEditor = (type: EditorBtns) => {
    switch (type) {
      case "text":
        {
          dispatcher("text");
        }
        break;
      case "image":
        {
          dispatcher("image");
        }
        break;
      case "button":
        {
          dispatcher("button");
        }
        break;
      case "video":
        {
          dispatcher("video");
        }
        break;
      default:
        break;
    }
  };
  const handleDrop = (event: React.DragEvent) => {
    event.stopPropagation();
    let droppedComponentType = event.dataTransfer.getData(
      "componentType"
    ) as EditorBtns;
    addNewElementInEditor(droppedComponentType);
  };
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };
  const handlePreview = () => dispatch({ type: EditorActionType.TOGGLE_PREVIEW_MODE });
  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    
  };
  return (
    <div
      className={cn(
        "h-full relative overflow-scroll duration-100 p-8 border  bg-white transition-all rounded-md shadow-sm",
        {
          "!p-0 !mr-0 fixed w-full h-full top-0 left-0":
            editor.previewMode === true,
          "!w-[850px]  ": editor.device === "tablet",
          "!w-[420px] ": editor.device === "mobile",
          "w-full": editor.device === "desktop",
        }
      )}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {editor.previewMode && (
        <div className="absolute top-4 left-4  z-50" onClick={handlePreview}>
          <EyeOffIcon stroke="black" />
        </div>
      )}
      {Array.isArray(editor.elements) &&
        editor.elements.map((element) => (
          <RenderComponent key={element.elementId} element={element} />
        ))}
    </div>
  );
};

export default BuilderEditor;
