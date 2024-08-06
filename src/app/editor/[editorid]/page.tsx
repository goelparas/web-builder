"use client"
import React, { useContext, useEffect } from "react";
import BuilderEditor from "../_components/Editor/BuilderEditor";
import { EditorContext } from "@/libs/context/editor.context";
import { toast } from "@/components/ui/use-toast";

const Editor = () => {

  const {state ,dispatch} = useContext(EditorContext);

 
     
  return (
    <>
      <BuilderEditor />
    </>
  );
};

export default Editor;
