import { Editor } from "@/libs/types/editor.types";
import { EditorBtns, EditorElement } from "@/libs/types/editor-element";
import React from "react";
import TextComponent from "./TextComponent";
import VideoComponent from "./VideoComponent";

import ImageComponent from "./ImageComponent";
import ButtonComponent from "./ButtonComponent";
import ContainerComponent from "../LayoutComponent/ContainerComponent";
import DragDeleteComponent from "../components/ParentComponent";

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
    case "button":
      return <ButtonComponent element={element} />;
    case "div":
      return <ContainerComponent element={element} />;
    case "body":
      return <ContainerComponent element={element} />;
    default:
      return null;
  }
};

export default RenderComponent;
