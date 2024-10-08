import { EditorBtns } from "@/libs/types/editor-element";
import { Image, Link2Icon } from "lucide-react";
import React from "react";

type Props = {};

const ImagePlaceHolder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "image")}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Image size={40} className="text-muted-foreground" />
    </div>
  );
};

export default ImagePlaceHolder;
