"use client";
import React, { ChangeEvent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext } from "react";
import { EditorContext } from "@/libs/context/editor.context";
import { EditorActionType } from "@/libs/types/editor-action.types";
import { EditorElement } from "@/libs/types/editor-element";
import { removePx } from "@/libs/helpers";

type Props = {};

const StylingTab = (props: Props) => {
  const { state, dispatch } = useContext(EditorContext);
  const { selectedElement } = state.editor;

  const handleOnChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const styleObject = { [id]: value };

    dispatch({
      type: EditorActionType.UPDATE_ELEMENT,
      payload: {
        elementDetails: {
          ...selectedElement,
          style: {
            ...selectedElement?.style,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleMediaElementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    dispatch({
      type: EditorActionType.UPDATE_ELEMENT,
      payload: {
        elementDetails: {
          ...selectedElement,
          content: {
            ...selectedElement?.content,
            [id]: value,
          },
        },
      },
    });
  };
  const handleSelection = (value: string) => {
    dispatch({
      type: EditorActionType.UPDATE_ELEMENT,
      payload: {
        elementDetails: {
          ...selectedElement,
          style: {
            ...selectedElement?.style,
            fontWeight: `font-${value}`,
          },
        },
      },
    });
  };

  const handleDimensionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let { id, value } = event.target;
    dispatch({
      type: EditorActionType.UPDATE_ELEMENT,
      payload: {
        elementDetails: {
          ...selectedElement,
          style: {
            ...selectedElement?.style,
            [id]: `${value}px`,
          },
        },
      },
    });
  };

  const dimensions = {
    height: "Height",
    width: "Width",
  };

  const margin = {
    marginTop: "Top",
    marginBottom: "Bottom",
    marginLeft: "Left",
    marginRight: "Right",
  };

  const padding = {
    paddingTop: "Top",
    paddingBottom: "Bottom",
    paddingLeft: "Left",
    paddingRight: "Right",
  };

  const renderInputs = (
    obj: { [key: string]: string },
    selectedElement: EditorElement,
    handleDimensionChange: (event: ChangeEvent<HTMLInputElement>) => void
  ) =>
    Object.keys(obj).map((key) => (
      <div key={key} className="flex gap-4">
        <div>
          <Label className="text-muted-foreground">{obj[key]}</Label>
          <Input
            id={key}
            placeholder="px"
            onChange={handleDimensionChange}
            value={removePx(selectedElement?.style[key])}
          />
        </div>
      </div>
    ));

  return (
    <>
      {selectedElement.type !== null ? (
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={["Typography", "Dimensions", "Decorations"]}
        >
          <AccordionItem value="Custom" className="px-6 py-0">
            <AccordionTrigger className="!no-underline">
              Custom
            </AccordionTrigger>
            <AccordionContent>
              {selectedElement.type === "link" && (
                <div className="flex flex-col gap-2">
                  <p className="text-muted-foreground">Link Path</p>
                  <Input
                    id="href"
                    placeholder="https:domain.example.com/pathname"
                    onChange={handleOnChanges}
                    value={selectedElement.content.href}
                  />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="Typography"
            className="px-4 py-0  border-y-[1px]"
          >
            <AccordionTrigger className="!no-underline">
              Typography
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 ">
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Font Family</p>
                <Input
                  id="fontFamily"
                  onChange={handleOnChanges}
                  value={selectedElement?.style?.fontFamily ?? ""}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Color</p>
                <Input
                  id="color"
                  onChange={handleOnChanges}
                  value={selectedElement?.style.color ?? ""}
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <Label className="text-muted-foreground">Weight</Label>
                  <Select onValueChange={handleSelection}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Font Weights</SelectLabel>
                        <SelectItem value="bold">Bold</SelectItem>
                        <SelectItem value="normal">Regular</SelectItem>
                        <SelectItem value="lighter">Light</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-muted-foreground">Size</Label>
                  <Input
                    placeholder="px"
                    id="fontSize"
                    onChange={handleOnChanges}
                    value={selectedElement?.style.fontSize ?? ""}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Dimensions" className="px-4 py-0">
            <AccordionTrigger className="!no-underline">
              Dimensions
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {renderInputs(
                    dimensions,
                    selectedElement,
                    handleDimensionChange
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p>Margin px</p>
                  <div className="grid grid-cols-2 gap-4">
                    {renderInputs(
                      margin,
                      selectedElement,
                      handleDimensionChange
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p>Padding px</p>
                  <div className="grid grid-cols-2 gap-4">
                    {renderInputs(
                      padding,
                      selectedElement,
                      handleDimensionChange
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Decorations" className="px-4 py-0 ">
            <AccordionTrigger className="!no-underline">
              Decorations
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-muted-foreground">
                  Background Color
                </Label>
                <div className="flex  border-[1px] rounded-md overflow-clip">
                  <div
                    className="w-12"
                    style={{
                      backgroundColor: selectedElement?.style.backgroundColor,
                    }}
                  />
                  <Input
                    placeholder="#HFI245"
                    className="!border-y-0 rounded-none !border-r-0 mr-2"
                    id="backgroundColor"
                    onChange={handleOnChanges}
                    value={selectedElement?.style.backgroundColor ?? ""}
                  />
                </div>
              </div>
              {selectedElement.type === "image" && (
                <div className="flex flex-col gap-2">
                  <Label className="text-muted-foreground">
                    Background Image
                  </Label>
                  <div className="flex  border-[1px] rounded-md overflow-clip">
                    <div
                      className="w-12 "
                      style={{
                        objectFit: "cover",
                        backgroundImage: `url(${selectedElement?.content.href}?? "/public/placeholderImage.jpg")`,
                      }}
                    />
                    <Input
                      placeholder="Add Image url"
                      className="!border-y-0 rounded-none !border-r-0 mr-2"
                      id="href"
                      onChange={handleMediaElementChange}
                      value={selectedElement?.content.href}
                    />
                  </div>
                </div>
              )}

              {selectedElement.type === "video" && (
                <div className="flex flex-col gap-2">
                  <Label className="text-muted-foreground">Video Source</Label>
                  <div className="flex  border-[1px] rounded-md overflow-clip">
                    <Input
                      placeholder="Add Video url"
                      className="!border-y-0 rounded-none !border-r-0 mr-2"
                      id="href"
                      onChange={handleMediaElementChange}
                      value={selectedElement?.content.href ?? '/sample.mp4'}
                    />
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <p className=" p-4 text-sm border border-red-500 ">
          {" "}
          Select the element to Start Styling
        </p>
      )}
    </>
  );
};

export default StylingTab;
