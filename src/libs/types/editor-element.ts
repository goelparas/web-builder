export type EditorBtns =
  | "text"
  | "video"
  | "image"
  | "button"
  | "body"
  | null
  | "link"
  | "div";

export type EditorElement = {
  id: string;
  style: React.CSSProperties;
  name: string;
  type: EditorBtns;
  content: { [key: string]: any } | undefined;
};
