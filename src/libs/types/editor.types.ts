import { EditorElement } from "./editor-element";

export type DeviceType = "mobile" | "desktop" | "tablet";

export type Editor = {
  elements: EditorElement[];
  selectedElement: EditorElement;
  device: DeviceType;
  previewMode: boolean;
  editorId: string;
};

export type HistoryState = {
  historyStack: Editor[];
  currentHistoryPointer: number;
};

export type WebBuilder = {
  editor: Editor;
  history: HistoryState;
};
