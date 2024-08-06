import { DeviceType, Editor } from "../types/editor.types";
import { EditorActionType } from "../types/editor-action.types";
import { EditorElement } from "../types/editor-element";

export type EditorAction =
  | {
      type: EditorActionType.ADD_ELEMENT;
      payload: {
        elementDetails: EditorElement;
      };
    }
  | {
      type: EditorActionType.UPDATE_ELEMENT;
      payload: {
        elementDetails: EditorElement;
      };
    }
  | {
      type: EditorActionType.DELETE_ELEMENT;
      payload: {
        elementDetails: EditorElement;
      };
    }
  | {
      type: EditorActionType.CHANGE_CLICKED_ELEMENT;
      payload: {
        elementDetails?: EditorElement;
      };
    }
  | {
      type: EditorActionType.CHANGE_DEVICE;
      payload: {
        device: DeviceType;
      };
    }
  | {
      type: EditorActionType.TOGGLE_PREVIEW_MODE;
    }
  | { type: EditorActionType.REDO }
  | { type: EditorActionType.UNDO }
  | { type: EditorActionType.LOAD_EDITOR; payload: Editor };
