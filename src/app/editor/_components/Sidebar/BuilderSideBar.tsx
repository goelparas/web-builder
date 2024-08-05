"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditorContext } from "@/libs/context/editor.context";
import React, { useContext } from "react";
import { cn } from "@/libs/utils/utils";
import TabList from ".";
import SettingsTab from "./Sections/StyleSection";
import ComponentsTab from "./Sections/ComponentSection";

type Props = {
  pageId: string;
};

const BuilderSideBar = ({ pageId }: Props) => {
  const { state, dispatch } = useContext(EditorContext);
  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full " defaultValue="Settings">
        <SheetContent
          showX={false}
          side="right"
          className={cn(
            "mt-[97px] w-16 z-[80] shadow-none  p-0 focus:border-none transition-all overflow-hidden",
            { hidden: state.editor.previewMode }
          )}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          side="right"
          className={cn(
            "mt-[97px] w-80 z-[40] shadow-none p-0 mr-16 bg-background h-full transition-all overflow-hidden ",
            { hidden: state.editor.previewMode }
          )}
        >
          <div className="grid gap-4 h-full pb-36 overflow-scroll">
            <TabsContent value="Settings">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                 Style the components on the canvas
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>

            <TabsContent value="Components">
              <SheetHeader className="text-left p-6 ">
                <SheetTitle>Components</SheetTitle>
                <SheetDescription>
                 you can drag and drop the components
                </SheetDescription>
              </SheetHeader>
              <ComponentsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
};

export default BuilderSideBar;
