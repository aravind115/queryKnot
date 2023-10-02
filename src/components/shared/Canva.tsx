import React, { useState } from "react"
import { useDrag, useDrop } from "react-dnd";
import InnerItem from "./InnerItem";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import uuid from 'react-uuid';
interface CanvaProps {
    id: string,
    onDelete?: (id: string) => void;
    hideIcon?: boolean
}
interface InnerItemProps{
    id: string,
}
const Canva: React.FC<CanvaProps> = ({ id, hideIcon }) => {
    const [items, setItems] = useState<InnerItemProps[]>([]);
    const [, dragRef] = useDrag({
        type: 'CANVA',
        item: { id }
    })

    const [, dropRef] = useDrop({
        accept: "INNER_ITEM",
        drop: (item: {
            parent: string; 
            id: string}) => {
            const uniqueId=uuid()
            // console.log("items",items)
            if(item.parent !=="LeftMenu"){
                return 
            }
            const itemsArray=[...items]
            itemsArray.push({id:uniqueId})
            setItems(itemsArray)
           
        }
    })
    const handleMove=(dragId:number,hoverId:string)=>{
        const dragIndex=items.findIndex(item=>item.id===hoverId);
        const updatedItems=[...items]
        const [draggedItem]=updatedItems.splice(dragIndex,1)
        updatedItems.splice(dragId,0,draggedItem)
        setItems(updatedItems)
    }



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
                    items.map((itemId,index) =>{
                    return <InnerItem 
                    index={index}
                    key={itemId.id} 
                    hideIcon={true} 
                    onMove={handleMove} 
                    id={itemId.id} 
                    parent="Canvas"/>
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
                   <ViewColumnsIcon style={{width:"25px"}}/>
                </div>
            </>
        )
    }

};
export default Canva;