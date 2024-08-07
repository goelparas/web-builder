import { EditorContext } from "@/libs/context/editor.context";
import { EditorActionType } from "@/libs/types/editor-action.types";
import { EditorElement } from "@/libs/types/editor-element";
import { Trash } from "lucide-react";
import React, { useContext } from "react";

const Delete = ({ element }:{element:EditorElement}) => {
  const { state, dispatch } = useContext(EditorContext);
  const { selectedElement, previewMode } = state.editor;
  const handleDeleteElement = (event:any) => {
    event.stopPropagation();
    dispatch({
      type: EditorActionType.DELETE_ELEMENT,
      payload: { elementDetails: element },
    });
  };
  return (
    <>
      {selectedElement.elementId === element.elementId && !previewMode && (
        <div className="absolute   -top-4 right-0 z-50 text-black">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={handleDeleteElement}
          />
        </div>
        
      )}
    </>
  );
};

export default Delete;
