import React, { useState } from "react"
import { useDrag, useDrop } from "react-dnd";
import InnerItem from "./InnerItem";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import uuid from 'react-uuid';
import { InnerItemProps } from "../types";
interface CanvaProps {
    id?: string,
    onDelete?: (id: string) => void;
    hideIcon?: boolean;
    innerItems?: InnerItemProps[];
    setInnerItems?: React.Dispatch<React.SetStateAction<InnerItemProps[]>>;
}
const Canva: React.FC<CanvaProps> = ({ id, hideIcon, innerItems, setInnerItems }) => {
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
            console.log("er")
            const uniqueId = uuid()
            if (item.parent !== "LeftMenu") {
                return
            }
            if (innerItems) {
                const itemsArray = [...innerItems]
                itemsArray.push({ id: uniqueId })
                setInnerItems?.(itemsArray)
            }
        }
    })
    const handleMove = (dragId: number, hoverId: string) => {
        if (!innerItems) return; 
        const dragIndex = innerItems?.findIndex(item => item.id === hoverId);
        if (innerItems) {
        const updatedItems = [...innerItems]
        const [draggedItem] = updatedItems.splice(dragIndex, 1)
        updatedItems.splice(dragId, 0, draggedItem)
        setInnerItems?.(updatedItems)
        }
    }
    if (hideIcon) {
        return (
            <div style={{ border: '1px solid black', textAlign: "center" }}>
                {id}
                <div
                    ref={dropRef}
                    style={{
                        height:"100px",
                        border: '1px solid black',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    {
                        innerItems?.map((itemId, index) => {
                            return <InnerItem
                                index={index}
                                key={itemId.id}
                                hideIcon={true}
                                onMove={handleMove}
                                id={itemId?.label || itemId.id}
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