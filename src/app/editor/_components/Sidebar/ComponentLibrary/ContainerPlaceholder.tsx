import { EditorBtns } from "@/libs/types/editor-element";
import { Container } from "lucide-react";
import React from "react";

type Props = {};

const ContainerPlaceholder = ( ) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "div")}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Container size={40} className="text-muted-foreground" />
    </div>
  );
};

export default ContainerPlaceholder;