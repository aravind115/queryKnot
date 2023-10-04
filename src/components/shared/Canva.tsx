import React from "react"
import { useDrag, useDrop } from "react-dnd";
import InnerItem from "./InnerItem";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import uuid from 'react-uuid';
import {SchemaItemProps } from "../types";
interface CanvaProps {
    id?: string,
    tableName?:string,
    onDelete?: (id: string) => void;
    hideIcon?: boolean;
    tableSchema?: SchemaItemProps[];
    setTableSchema?: React.Dispatch<React.SetStateAction<SchemaItemProps[]>>;
}
const Canva: React.FC<CanvaProps> = (props) => {
    const { id, hideIcon,tableName,setTableSchema,
        tableSchema} =props
    
        const updateTableSchema =[...tableSchema ||[]]
        const findTableIndex=updateTableSchema.findIndex(obj=>obj.id===id)
        const columnItem=updateTableSchema?.[findTableIndex]?.columns

    const [, dragRef] = useDrag({
        type: 'CANVA',
        item: { id }
    })
    const [, dropRef] = useDrop({
        accept: "INNER_ITEM",
        drop: (item: {
            parent: string;
            id: string
        }) => {
            const uniqueId = uuid()
            if (item.parent !== "LeftMenu") {
                return
            }  
                if(tableSchema){
                    const updateTableSchema =[...tableSchema]
                    const findTableIndex=updateTableSchema.findIndex(obj=>obj.id===id)
                    const columnItem=updateTableSchema?.[findTableIndex]
                    const updateColumn = {
                        id:uniqueId,
                        name:`column-${columnItem?.columns?.length ?? 0}`,
                        dataType:"VARCHAR",
                        constraints:"",
                        length:30
                    }
                    columnItem["columns"].push(updateColumn)
                    setTableSchema?.(updateTableSchema)
               }
        }
    })
    const handleMove = (dragId: number, hoverId: string) => {

        if(tableSchema){
            const updateTableSchema =[...tableSchema]
            const findTableIndex=updateTableSchema.findIndex(obj=>obj.id===id)
            const tableItem=updateTableSchema?.[findTableIndex]
            if (!tableItem.columns) return; 
            const dragIndex = tableItem?.columns?.findIndex(item => item.name === hoverId);
            
            const updatedItems = [...tableItem.columns]
            const [draggedItem] = updatedItems.splice(dragIndex, 1)
            updatedItems.splice(dragId, 0, draggedItem)
            
            tableItem.columns=updatedItems

            setTableSchema?.(updateTableSchema)
        }
    }
    if (hideIcon) {
        return (
            <div className="canvaContainer">
                {tableName || id}
                <div ref={dropRef} className="innerItemContainer">
                    {
                        columnItem?.map((itemId, index) => {
                            return <InnerItem
                                index={index}
                                key={itemId.id}
                                hideIcon={true}
                                onMove={handleMove}
                                id={itemId?.name || itemId.id}
                                parent="Canvas" />
                        })
                    }
                </div>
            </div>
        )
    } else {
        return (
            <>
                <div
                    ref={dragRef}
                    style={{ cursor: 'grab' }}
                >
                    <ViewColumnsIcon style={{ width: "25px" }} />
                </div>
            </>
        )
    }

};
export default Canva;