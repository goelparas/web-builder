export type EditorBtns =
  | "text"
  | "link"
  | "video"
  | "image"
  | "button"
  | "div"
  | null

export type EditorElement = {
  elementId: string;
  style: React.CSSProperties;
  name: string;
  type: EditorBtns;
  content?: { innerText?: string , href?:string  }; 
};
