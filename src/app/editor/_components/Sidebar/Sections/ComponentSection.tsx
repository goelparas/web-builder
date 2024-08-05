import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditorBtns } from "@/libs/types/editor-element";
import React from "react";
import ContainerPlaceholder from "../ComponentLibrary/ContainerPlaceholder";
import TextPlaceholder from "../ComponentLibrary/TextPlaceHolder";
import LinkPlaceholder from "../ComponentLibrary/LinkPlaceholder";
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
      Component: <ContainerPlaceholder />,
      label: "Container",
      id: "div",
    },

    {
      Component: <LinkPlaceholder />,
      label: "Link",
      id: "link",
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
