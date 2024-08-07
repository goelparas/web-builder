import { Button } from "@/components/ui/button";
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

const ButtonComponent = ({ element }: Props) => {
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
    <div className="relative w-fit m-4">
      <button
        className={cn(
          "border rounded-lg px-4 py-2",
          selectedElement.elementId === element.elementId &&
            "border-blue-500 border-2"
        )}
        style={{ ...element.style }}
        onClick={handleClick}
      >
        {getTextOrLink(element) ?? "Button"}
      </button>
      <Delete element={element} />
    </div>
  );
};

export default ButtonComponent;
