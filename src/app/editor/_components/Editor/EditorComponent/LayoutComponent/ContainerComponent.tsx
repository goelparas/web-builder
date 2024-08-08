import { defaultStyling } from "@/libs/constant";
import { EditorContext } from "@/libs/context/editor.context";
import { EditorActionType } from "@/libs/types/editor-action.types";
import { EditorBtns, EditorElement } from "@/libs/types/editor-element";
import { cn } from "@/libs/utils/utils";
import { Badge, Trash } from "lucide-react";
import React, { useContext } from "react";
import { v4 } from "uuid";
import RenderComponent from "../ElementComponents/RenderComponent";
type Props = {
  element: EditorElement;
};

const ContainerComponent = ({ element }: Props) => {
  const { state, dispatch } = useContext(EditorContext);
  const { selectedElement, previewMode } = state.editor;
  const { style, type, content, elementId } = element;
  const dispatcher = ({
    type,
    content,
  }: {
    type: EditorBtns;
    content: EditorElement["content"];
  }) => {
    dispatch({
      type: EditorActionType.ADD_ELEMENT,
      payload: {
        containerId: elementId,
        elementDetails: {
          elementId: v4(),
          type: type,
          style: {
            ...defaultStyling,

          },
          content:
            typeof content !== "undefined"
              ? typeof content === "object"
                ? { ...content }
                : [...content]
              : {},
          name: type,
        },
      },
    });
  };
  const handleOnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const componentType = e.dataTransfer.getData("componentType") as EditorBtns;

    switch (componentType) {
      case "text":
        dispatcher({
          type: componentType,
          content: { innerText: "Enter your Text Here" },
        });
        break;
      case "button":
        dispatcher({
          type: componentType,
          content: { innerText: "Button" },
        });
        break;
      case "image":
        dispatcher({
          type: componentType,
          content: { href: "/placeholderImage.jpg" },
        });
        break;

      case "video":
        dispatcher({
          type: componentType,
          content: { href: "/sample.mp4" },
        });
        break;
      case "div":
        dispatch({
          type: EditorActionType.ADD_ELEMENT,
          payload: {
            containerId: elementId,
            elementDetails: {
              content: [],
              elementId: v4(),
              name: "Container",
              style: { ...defaultStyling, display: "flex" , flexDirection: "row" },
              type: "div",
            },
          },
        });
        break;
      default:
        break;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "body") return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: EditorActionType.CHANGE_CLICKED_ELEMENT,
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: EditorActionType.DELETE_ELEMENT,
      payload: {
        elementDetails: element,
      },
    });
  };
  return (
    <div
      style={style}
      className={cn("relative p-4  m-2 transition-all group", {
        "max-w-full w-full": type === "div",
        "h-fit min-h-20": type === "div",
        "h-full": type === "body",
        "overflow-scroll ": type === "body",
        "!border-lime-700":
          selectedElement.elementId === elementId &&
          !previewMode &&
          selectedElement.type !== "body",
        "!border-yellow-400 !border-4":
          selectedElement.elementId === elementId &&
          !previewMode &&
          selectedElement.type === "body",
        "!border-solid":
          selectedElement.elementId === elementId && !previewMode,
        "border-dashed border border-slate-300": !previewMode,
      })}
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
      draggable={type !== "body"}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "container")}
    >
      {Array.isArray(content) &&
        content.map((childElement) => (
          <RenderComponent
            key={childElement.elementId}
            element={childElement}
          />
        ))}
      {selectedElement.elementId === elementId &&
        !previewMode &&
        selectedElement.type !== "body" && (
          <div className="absolute bg-white px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
            <Trash size={16} onClick={handleDeleteElement} />
          </div>
        )}
    </div>
  );
};

export default ContainerComponent;
