export type EditorBtns =
  | "text"
  | "link"
  | "video"
  | "image"
  | "button"
  | "div"
  | "body"
  | null

export type EditorElement = {
  elementId: string;
  style: React.CSSProperties;
  name: string;
  type: EditorBtns;
  content: EditorElement[]| { innerText?: string , href?:string  }; 
};
