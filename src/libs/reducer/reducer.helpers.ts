import { EditorAction } from "../actions/editor.actions";
import { Editor } from "../types/editor.types";
import { EditorActionType } from "../types/editor-action.types";
import { EditorElement } from "../types/editor-element";

export const addAnElement = (
  currentParentChildrens: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== EditorActionType.ADD_ELEMENT)
    throw Error(
      "You sent the wrong action type to the Add Element editor State"
    );

  return currentParentChildrens.map((item) => {
    if (item.content && Array.isArray(item.content)) {
      if (item.elementId === action.payload.containerId) {
        return {
          ...item,
          content: [...item.content, action.payload.elementDetails],
        };
      } else {
        return {
          ...item,
          content: addAnElement(item.content, action),
        };
      }
    }

    return item;
  });
};
export const updateElements = (
  currentEditorState: Editor["elements"],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== EditorActionType.UPDATE_ELEMENT)
    throw Error(
      "You sent the wrong action type to the Update Element editor State"
    );
  return currentEditorState.map((item) => {
    if (item.elementId === action.payload.elementDetails.elementId) {
      return { ...item, ...action.payload.elementDetails };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateElements(item.content, action),
      };
    }
    return item;
  });
};

export const deleteAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== "DELETE_ELEMENT") return editorArray;
  return editorArray.filter((item) => {
    if (item.elementId === action.payload.elementDetails.elementId) {
      return false;
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action);
    }
    return true;
  });
};
