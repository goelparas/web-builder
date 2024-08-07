"use client";
import { EditorContext } from "@/libs/context/editor.context";
import { EditorActionType } from "@/libs/types/editor-action.types";
import { Editor } from "@/libs/types/editor.types";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const page = () => {
  const [ids, setIds] = useState<Editor[]>([]);
  useEffect(() => {
    const fetchTemplates = () => {
      const storedTemplates: Editor[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("template-")) {
          storedTemplates.push(JSON.parse(localStorage.getItem(key)));
        }
      }
      setIds(storedTemplates);
    };
    fetchTemplates();
  }, []);
  const { state, dispatch } = useContext(EditorContext);
  const router = useRouter();
  const handleSetEditor = (obj: Editor) => {
    dispatch({
      type: EditorActionType.LOAD_EDITOR,
      payload: {
        elements: [...obj.elements],
        ...obj,
      },
    });
    router.push(`/editor/${obj.editorId}`);
  };

  const createNewTemplate = () => {
    let newId = uuidv4();
    dispatch({
      type: EditorActionType.LOAD_EDITOR,
      payload: {
        ...state.editor,
        editorId: newId,
      },
    });
    router.push(`/editor/${newId}`);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 my-auto">
      {ids.length > 0 && (
        <>
          <h1 className="font-bold text-2xl w-full text-center">
            Select Our  Template to Edit
          </h1>
          <div className="w-full  flex gap-3 justify-center">
            {ids.map((editor) => {
              return (
                <div
                  key={editor.editorId}
                  className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-100 hover:shadow-lg transition-transform duration-300 cursor-pointer flex items-center justify-center"
                  onClick={() => handleSetEditor(editor)}
                >
                  <h2 className="text-lg font-semibold">
                    Editor ID: {editor.editorId}
                  </h2>
                </div>
              );
            })}
          </div>
          <p className="text-xl antialiased font-thin w-full text-center"> ----- OR -------</p>
        </>
      )}
     
      <div
        className="bg-white font-bold flex items-center gap-2 justify-center shadow-md rounded-lg p-6 hover:bg-gray-100 hover:shadow-lg transition-transform duration-300 cursor-pointer mx-auto"
        onClick={() => createNewTemplate()}
      >  Create New Template
        <h2 className="text-lg font-semibold ">
        
          <PlusIcon />
        </h2>
      </div>
    </div>
  );
};

export default page;
