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



    // console.log("isDragging",isDragging)
    const [,dropRef]=useDrop({
        accept:"INNER_ITEM",
        hover:(draggedItem:any,monitor:any)=>{
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
            <div
            ref={combinedRef}
            style={{
                padding:"10px",
                border: '1px solid blue',
                cursor: 'grab',
                margin: '5px',
              }}>
                {id}
            </div>
        )
    }else{
        return(
            <div
            ref={ref}
            style={{cursor: 'grab'}}
            >
              <TableCellsIcon style={{width:"25px"}}/>
            </div>
        )
    }
   
}
export default InnerItem