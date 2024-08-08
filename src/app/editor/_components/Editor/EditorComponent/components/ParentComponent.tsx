import { EditorContext } from "@/libs/context/editor.context";
import { EditorActionType } from "@/libs/types/editor-action.types";
import React, { useContext } from "react";

const DragDeleteComponent = ({ children }) => {
  const { dispatch, state } = useContext(EditorContext);
  const { selectedElement } = state.editor;
  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch({
      type: EditorActionType.DELETE_ELEMENT,
      payload: {
        elementDetails: selectedElement,
      },
    });
  };
  const enhancedChildren = React.Children.map(children, (child) => 
  React.cloneElement(child, {
    draggable: 'true',
    style: { ...child.props.style, position: 'relative' },
  })
);
  return (
    <div className="relative">
      {children}
      <div onClick={handleDelete} className="z-10">Delete</div>
    </div>
  );
};

export default DragDeleteComponent;
