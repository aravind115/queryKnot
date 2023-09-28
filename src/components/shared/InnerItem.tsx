import { TableCellsIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDrag } from "react-dnd";
interface InnerItemProps{
    id:string;
    onDelete?: () => void;
    hideIcon?:boolean;
}
const InnerItem:React.FC<InnerItemProps>=({id,hideIcon})=>{
    const [,ref]=useDrag({
        type:'INNER_ITEM',
        item:{id}
    })

    if(hideIcon){
        return(
            <div
            // ref={ref}
            style={{
                padding:"10px",
                border: '1px solid blue',
                cursor: 'grab',
                margin: '5px',
              }}>
                Item {id}
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