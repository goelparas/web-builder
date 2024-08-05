"use client";

import { useParams } from "next/navigation";
import React from "react";
import BuilderEditor from "../_components/Editor/BuilderEditor";
import BuilderSideBar from "../_components/Sidebar/BuilderSideBar";
import { EditorProvider } from "@/libs/context/editor.context";
import BuilderNavigation from "../_components/Navigation/BuilderNavigation";

type Props = {};

const Editor = () => {
  const { editorid } = useParams();
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
      <EditorProvider pageId={editorid as string}>
        <BuilderNavigation pageId={editorid as string} />
        <div className="h-full flex justify-center">
          <BuilderEditor pageId={editorid as string} />
        </div>
        <BuilderSideBar pageId={editorid as string} />
      </EditorProvider>
    </div>
  );
};

export default Editor;
