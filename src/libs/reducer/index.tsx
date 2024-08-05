import { EditorAction } from "../actions/editor.actions";
import { Editor, WebBuilder, HistoryState } from "../types/editor";
import { EditorActionType } from "../types/editor-action.types";
import { addAnElement, updateElement } from "./reducer.helpers";

const intialEditorState: Editor = {
  device: "desktop",
  elements: [
    {
      id: "1",
      style: {},
      name: "_body",
      type: "_body",
      content: {},
    },
  ],
  funnelPageId: "",
  previewMode: false,
  selectedElement: {
    id: "",
    style: { position: "absolute" },
    name: "Landing Page",
    type: "text",
    content: {},
  },
};

const initialHistoryState: HistoryState = {
  historyStack: [intialEditorState],
  currentHistoryPointer: 0,
};

const initialState: WebBuilder = {
  editor: intialEditorState,
  history: initialHistoryState,
};

export const EditorReducer = (
  state: WebBuilder = initialState,
  action: EditorAction
): WebBuilder => {
  switch (action.type) {
    case EditorActionType.ADD_ELEMENT: {
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      };

      const updatedHistoryStack = [
        ...state.history.historyStack.slice(
          0,
          state.history.currentHistoryPointer + 1
        ),
        { ...updatedEditorState },
      ];

      return {
        editor: updatedEditorState,
        history: {
          historyStack: updatedHistoryStack,
          currentHistoryPointer: state.history.currentHistoryPointer++,
        },
      };
    }

    case EditorActionType.UPDATE_ELEMENT: {
      let updatedEditorState = {
        ...state.editor,
        elements: updateElement(state.editor, action),
      };
      let updatedHistoryStack = [
        ...state.history.historyStack.slice(
          0,
          state.history.currentHistoryPointer + 1
        ),
        { ...updatedEditorState },
      ];

      return {
        editor: updatedEditorState,
        history: {
          historyStack: updatedHistoryStack,
          currentHistoryPointer: state.history.currentHistoryPointer++,
        },
      };
    }

    case EditorActionType.DELETE_ELEMENT: {
      const updatedEditorState = {
        ...state.editor,
        elements: state.editor.elements.filter(
          (element) => element.id !== action.payload.elementDetails.id
        ),
      };

      const updatedHistoryStack = [
        ...state.history.historyStack.slice(
          0,
          state.history.currentHistoryPointer + 1
        ),
        { ...updatedEditorState },
      ];

      return {
        editor: updatedEditorState,
        history: {
          historyStack: updatedHistoryStack,
          currentHistoryPointer: state.history.currentHistoryPointer++,
        },
      };
    }

    case EditorActionType.CHANGE_CLICKED_ELEMENT: {
      let updatedEditorState = {
        ...state.editor,
        selectedElement: action.payload.elementDetails,
      };

      return {
        editor: updatedEditorState,
        history: {
          ...state.history,
          currentHistoryPointer: state.history.currentHistoryPointer++,
        },
      };
    }

    case EditorActionType.CHANGE_DEVICE: {
      let updatedEditorState = {
        ...state.editor,
        device: action.payload.device,
      };

      return {
        ...state,
        editor: updatedEditorState,
      };
    }

    case EditorActionType.TOGGLE_PREVIEW_MODE:
      return {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      };
    case EditorActionType.REDO: {
      if (
        state.history.currentHistoryPointer <
        state.history.historyStack.length - 1
      ) {
        return {
          editor:
            state.history.historyStack[state.history.currentHistoryPointer + 1],
          history: {
            ...state.history,
            currentHistoryPointer: state.history.currentHistoryPointer + 1,
          },
        };
      }
      return state;
    }
    case EditorActionType.UNDO: {
      if (state.history.currentHistoryPointer > 0) {
        return {
          editor:
            state.history.historyStack[state.history.currentHistoryPointer - 1],
          history: {
            ...state.history,
            currentHistoryPointer: state.history.currentHistoryPointer - 1,
          },
        };
      }
      return state;
    }
    default:
      return state;
  }
};
