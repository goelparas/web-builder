import { Input } from "@/components/ui/input";
import { EditorContext } from "@/libs/context/editor.context";
import { getTextOrLink } from "@/libs/helpers";
import { EditorActionType } from "@/libs/types/editor-action.types";
import { EditorElement } from "@/libs/types/editor-element";
import { cn } from "@/libs/utils/utils";
import React, { useContext } from "react";

type Props = {
  element: EditorElement;
};

const ImageComponent = ({ element }: Props) => {
  const { content } = element;
  const { state, dispatch } = useContext(EditorContext);
  const { selectedElement } = state.editor;
  const handleClick = (event) => {
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
        "border rounded-2xl m-2  h-20 w-20 overflow-hidden relative ",
        selectedElement.elementId === element.elementId &&
          " border-blue-500 border-2"
      )}
      style={{ ...element.style }}
      onClick={handleClick}
    >
      <img
        style={{
          ...element.style,
        }}
        className="w-full h-full object-cover"
        src={getTextOrLink(element) ?? "/placeholderImage.jpg"}
      />
    </div>
  );
};

export default ImageComponent;
