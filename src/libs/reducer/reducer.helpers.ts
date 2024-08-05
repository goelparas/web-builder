import { EditorAction } from "../actions/editor.actions";
import { Editor } from "../types/editor";
import { EditorActionType } from "../types/editor-action.types";
import { EditorElement } from "../types/editor-element";

export const addAnElement = (
  currentEditorElements: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== EditorActionType.ADD_ELEMENT)
    throw Error(
      "You sent the wrong action type to the Add Element editor State"
    );

  return [...currentEditorElements, action.payload.elementDetails];
};
export const updateElements = (
  currentEditorState: Editor,
  action: EditorAction
): EditorElement[]=> {
  if (action.type !== EditorActionType.UPDATE_ELEMENT)
    throw Error(
      "You sent the wrong action type to the Update Element editor State"
    );
      console.log(action.payload.elementDetails);
  return currentEditorState.elements.map((element) => {
    if (element.id === action.payload.elementDetails.id) {
      return {...action.payload.elementDetails};
    }
    return element; 
  });
};
