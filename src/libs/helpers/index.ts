import { EditorElement } from "../types/editor-element";

export const removePx = (value) => {
    return typeof value === 'string' && value.endsWith('px')
      ? value.slice(0, -2)
      : value;
  };




  export const getTextOrLink = (element:EditorElement)=>{
    if(Array.isArray(element.content))
    {
      return null
    }
    else{
      return element.content.innerText ?? element.content.href
    }
  }