import { Input } from "@/components/ui/input";
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
        "border rounded-2xl m-2  h-28 w-28  relative ",
        selectedElement.elementId === element.elementId &&
          "border-blue-500 border-4"
      )}
      style={{ ...element.style }}
      onClick={handleClick}
    >
      <img
        style={{
          ...element.style,
        }}
        className="w-full h-full object-cover rounded-xl"
        src={getTextOrLink(element) ?? "/placeholderImage.jpg"}
      />
      <Delete element={element}/>
    </div>
  );
};

export default ImageComponent;
