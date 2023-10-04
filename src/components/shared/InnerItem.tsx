import { TableCellsIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDrag,useDrop } from "react-dnd";
interface InnerItemProps{
    id?:string;
    onDelete?: () => void;
    hideIcon?:boolean;
    onMove?:(dragId:number,hoverId:string)=>void;
    label?:string;
    parent: string; 
    index?:number
}
type DraggedItemType = {
    id: string;
    parent: string;
  };
const InnerItem:React.FC<InnerItemProps>=({id,hideIcon,parent,onMove,index})=>{
    const [{ isDragging },ref]=useDrag({
        type:'INNER_ITEM',
        item:{id,parent} as DraggedItemType,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
          }),
    })
    const [,dropRef]=useDrop({
        accept:"INNER_ITEM",
        hover:(draggedItem:any)=>{
            console.log("draggedItem",draggedItem)
            if (index !== undefined) {
                onMove?.(index, draggedItem.id);
            }
        },
    })
const  combinedRef=(node:any)=>{
    ref(node);
    dropRef(node)
};
    if(hideIcon){
        return(
            <div ref={combinedRef} className="innerItem">
                {id}
            </div>
        )
    }else{
        return(
            <div ref={ref} className={"cursor-grab"} >
              <TableCellsIcon className="w-25px"/>
            </div>
        )
    }
   
}
export default InnerItem