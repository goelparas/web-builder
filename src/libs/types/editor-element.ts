export type EditorBtns = "text" | "video" | "image" | "button" | "_body"| null;


export type EditorElement = {
    id:string;
    style:React.CSSProperties;
    name:string;
    type:EditorBtns;
    content:EditorElement[] | {}
}





