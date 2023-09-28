import React, { useState } from "react"
import { useDrag, useDrop } from "react-dnd";
import InnerItem from "./InnerItem";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
interface CanvaProps {
    id: string,
    onDelete?: (id: string) => void;
    hideIcon?: boolean
}
const Canva: React.FC<CanvaProps> = ({ id, hideIcon }) => {
    const [items, setItems] = useState<string[]>([]);
    const [, dragRef] = useDrag({
        type: 'CANVA',
        item: { id }
    })
    const [, dropRef] = useDrop({
        accept: "INNER_ITEM",
        drop: (item: { id: string }) => {
            setItems(prev => [...prev, item.id])
        }
    })
    if (hideIcon) {
        return (
        <div  style={{  border: '1px solid black',textAlign:"center"}}>
                    Canvas {id}
            <div
                ref={dropRef}
                style={{
                    height: '80px',
                    border: '1px solid black',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                
                {
                    items.map(itemId => (<InnerItem key={itemId} id={itemId} hideIcon={true}/>))
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
                   <ViewColumnsIcon style={{width:"25px"}}/>
                </div>
            </>
        )
    }

};
export default Canva;