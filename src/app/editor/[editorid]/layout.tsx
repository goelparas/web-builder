"use client";
import { EditorContext, EditorProvider } from "@/libs/context/editor.context";
import React, { useContext } from "react";
import BuilderNavigation from "../_components/Navigation/BuilderNavigation";
import BuilderSideBar from "../_components/Sidebar/BuilderSideBar";
import { useParams } from "next/navigation";
import { cn } from "@/libs/utils/utils";
import { Toaster } from "@/components/ui/toaster";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { state } = useContext(EditorContext);

  return (
    <>
      <Toaster />
      <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden flex flex-col ">
        <BuilderNavigation />
        <div className="w-full h-full relative flex">
          <div
            className={cn(
              `w-3/4 flex items-center transition-all duration-300 ease-in-out h-full justify-center bg-gray-500 border relative `,
              { "w-full": state.editor.previewMode }
            )}
          >
            {children}
          </div>
          <div className={cn(`1/4`, { "w-0": state.editor.previewMode })}>
            <BuilderSideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
