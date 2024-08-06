import { EditorContext } from "@/libs/context/editor.context";
import { EditorActionType } from "@/libs/types/editor-action.types";
import { EditorElement } from "@/libs/types/editor-element";
import { cn } from "@/libs/utils/utils";
import React, { useContext } from "react";

type Props = {
  element: EditorElement;
};

const VideoComponent = ({ element }: Props) => {
  const { content } = element;
  const { state, dispatch } = useContext(EditorContext);
  const { selectedElement } = state.editor;
  const handleClick = () => {
    console.log("clicked");
    event.preventDefault();
    event.stopPropagation();
    dispatch({
      type: EditorActionType.CHANGE_CLICKED_ELEMENT,
      payload: {
        elementDetails: element,
      },
    });
  };

  return (
    <div
      className={cn(
        "border rounded-2xl m-2 h-40 w-60 overflow-hidden relative z-50",
        selectedElement.elementId === element.elementId &&
          "border-blue-500 border-2"
      )}
      style={{ ...element.style }}
      onClick={handleClick}
    >
      <iframe
        style={{
          ...element.style,
        }}
        className="w-full h-full pointer-events-none"
        src={content.href ??'/sample.mp4'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

      ></iframe>
    </div>
  );
};

export default VideoComponent;
