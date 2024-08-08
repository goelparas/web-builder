import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditorBtns } from "@/libs/types/editor-element";
import React from "react";
import ButtonPlaceHolder from "../ComponentLibrary/ButttonPlaceholder";
import TextPlaceholder from "../ComponentLibrary/TextPlaceHolder";

import ImagePlaceHolder from "../ComponentLibrary/ImagePlaceHolder";
import VideoPlaceHolder from "../ComponentLibrary/VideoPlaceHolder";
import ContainerPlaceholder from "../ComponentLibrary/ContainerPlaceholder";
type Props = {};

const ComponentsTab = () => {
  const elements: {
    Component: React.ReactNode;
    label: string;
    id: EditorBtns;
  }[] = [
    {
      Component: <TextPlaceholder />,
      label: "Text",
      id: "text",
    },
    {
      Component: <ButtonPlaceHolder />,
      label: "Button",
      id: "button",
    },

    {
      Component: <ImagePlaceHolder />,
      label: "Image",
      id: "image",
    },
    {
      Component: <VideoPlaceHolder />,
      label: "Video",
      id: "video",
    },
    {
      Component: <ContainerPlaceholder />,
      label: "Container",
      id: "div",
    },
  ];

  return (
    <Accordion type="multiple" className="w-full" defaultValue={["Elements"]}>
      <AccordionItem value="Elements" className="px-6 py-0 border-t ">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements.map((element) => (
            <div
              key={element.id}
              className="flex-col items-center justify-center flex"
            >
              {element.Component}
              <span className="text-muted-foreground">{element.label}</span>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ComponentsTab;
