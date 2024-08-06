import { Editor } from "@/libs/types/editor.types";
import { EditorBtns, EditorElement } from "@/libs/types/editor-element";
import React from "react";
import TextComponent from "./EditorComponent/TextComponent";
import VideoComponent from "./EditorComponent/VideoComponent";
import LinkComponent from "./EditorComponent/LinkComponent";
import ImageComponent from "./EditorComponent/ImageComponent";
import ButtonComponent from "./EditorComponent/ButtonComponent";

type Props = {
  element: EditorElement;
};

const RenderComponent = ({ element }: Props) => {
  switch (element.type as EditorBtns) {
    case "text":
      return <TextComponent element={element} />;
    case "video":
      return <VideoComponent element={element} />;
    case "image":
      return <ImageComponent element={element} />;
    case "link":
      return <LinkComponent element={element} />;
    case "button":
      return <ButtonComponent element={element} />;
    default:
      return null;
  }
};

export default RenderComponent;
