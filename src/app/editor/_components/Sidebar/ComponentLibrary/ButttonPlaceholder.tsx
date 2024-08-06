import { EditorBtns } from '@/libs/types/editor-element'
import { BoxIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const ButtonPlaceHolder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "button")}
      className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px] items-center justify-center"
    >
      <BoxIcon/>
    </div>
  )
}

export default ButtonPlaceHolder
