"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { EditorContext } from "@/libs/context/editor.context";
import { DeviceType } from "@/libs/types/editor.types";
import { EditorActionType } from "@/libs/types/editor-action.types";
import { cn } from "@/libs/utils/utils";
import {
  EyeIcon,
  Laptop,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";
import React, { useContext } from "react";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
 
const BuilderNavigation = () => {
  const { state, dispatch } = useContext(EditorContext);
  const handlePreviewClick = () =>dispatch({ type: EditorActionType.TOGGLE_PREVIEW_MODE });
  const handleUndo = () => dispatch({ type: EditorActionType.UNDO });
  const handleRedo = () => dispatch({ type: EditorActionType.REDO });
  const {editorid} = useParams();
  const handleOnSave = async () => {
     localStorage.setItem(`template-${editorid}` as string, JSON.stringify(state.editor));
     toast({
      title: "Saved the template",
      color: "bg-green-500",


     })
  };
  return (
    <nav
      className={cn(
        "border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all",
        { "!h-0 !p-0 !overflow-hidden": state.editor.previewMode }
      )}
    >
      <aside>
        <Tabs
          defaultValue="desktop"
          className="w-fit"
          value={state.editor.device}
          onValueChange={(value) => {
            dispatch({
              type: EditorActionType.CHANGE_DEVICE,
              payload: { device: value as DeviceType },
            });
          }}
        >
          <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
            <TabsTrigger
              value="desktop"
              className="data-[state=active]:bg-muted w-10 h-10 p-0"
            >
              <Laptop />
            </TabsTrigger>

            <TabsTrigger
              value="tablet"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <Tablet />
            </TabsTrigger>

            <TabsTrigger
              value="mobile"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <Smartphone />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </aside>
      <aside className="flex items-center gap-2">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-slate-800"
          onClick={handlePreviewClick}
        >
          <EyeIcon  />
        </Button>
        <Button
          disabled={!(state.history.currentHistoryPointer > 0)}
          onClick={handleUndo}
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-slate-400"
        >
          <Undo2  />
        </Button>
        <Button
          disabled={
            !(
              state.history.currentHistoryPointer < state.history.historyStack.length - 1
            )
          }
          onClick={handleRedo}
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-slate-800 mr-4"
        >
          <Redo2  />
        </Button>
        <Button onClick={handleOnSave}>Save</Button>
      </aside>
    </nav>
  );
};

export default BuilderNavigation;
