import { EditorContext } from "@/libs/context/editor.context";
import { getTextOrLink } from "@/libs/helpers";
import { EditorActionType } from "@/libs/types/editor-action.types";
import { EditorElement } from "@/libs/types/editor-element";
import { cn } from "@/libs/utils/utils";
import { Badge, Trash } from "lucide-react";
import React, { ChangeEvent, useContext } from "react";

type Props = {
  element: EditorElement;
};

const TextComponent = ({ element }: Props) => {
  const { dispatch, state } = useContext(EditorContext);
  const { style, elementId, content } = element;
  const { selectedElement, previewMode } = state.editor;
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
      payload: { elementDetails: element },
    });
  };
  const handleblur = (event: ChangeEvent<HTMLSpanElement>) => {
    const spanElement = event.target;
    dispatch({
      type: EditorActionType.UPDATE_ELEMENT,
      payload: {
        elementDetails: {
          ...element,
          content: {
            innerText: spanElement.innerText,
          },
        },
      },
    });
  };
  return (
    <div
      style={style}
      className={cn(
        "p-4 w-full m-1 min-h-11 relative text-base transition-all ",
        {
          "!border-blue-500": selectedElement.elementId === elementId,
          "!border-solid": selectedElement.elementId === elementId,
          "border-dashed border border-slate-300": !previewMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      <span
        contentEditable={!previewMode}
        onBlur={handleblur}
        className="min-h-11 p-4 outline-none"
      >
        {getTextOrLink(element)}
      </span>
      {selectedElement.elementId === elementId && !previewMode && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={handleDeleteElement}
          />
        </div>
      )}
    </div>
  );
};

export default TextComponent;
