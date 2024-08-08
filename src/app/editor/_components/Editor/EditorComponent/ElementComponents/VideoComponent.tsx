import { EditorContext } from "@/libs/context/editor.context";
import { getTextOrLink } from "@/libs/helpers";
import { EditorActionType } from "@/libs/types/editor-action.types";
import { EditorElement } from "@/libs/types/editor-element";
import { cn } from "@/libs/utils/utils";
import React, { useContext } from "react";
import Delete from "../components/Delete";

type Props = {
  element: EditorElement;
};

const VideoComponent = ({ element }: Props) => {
  const { state, dispatch } = useContext(EditorContext);
  const { selectedElement } = state.editor;
  const handleClick = (event) => {
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
        "border rounded-2xl m-2 h-40 w-60  relative z-50",
        selectedElement.elementId === element.elementId &&
          "border-blue-500 border-4"
      )}
      style={{ ...element.style }}
      onClick={handleClick}
    >
      <video
        style={{
          ...element.style,
        }}
        className="w-full h-full pointer-events-none"
        src={getTextOrLink(selectedElement) ?? "/sample.mp4"}
        controls
        autoPlay
      />
      <Delete element={element} />
    </div>
  );
};

export default VideoComponent;
