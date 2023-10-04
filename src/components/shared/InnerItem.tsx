import { TableCellsIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
interface InnerItemProps {
    id?: string;
    onDelete?: () => void;
    hideIcon?: boolean;
    onMove?: (dragId: number, hoverId: string) => void;
    name?: string;
    parent: string;
    index?: number
    activeId?: string;
    handleColSelection?:(colId:string)=>void
}
type DraggedItemType = {
    id: string;
    parent: string;
};
const InnerItem: React.FC<InnerItemProps> = ({ id, hideIcon, parent, onMove, index, name, activeId, handleColSelection }) => {
    const [,ref] = useDrag({
        type: 'INNER_ITEM',
        item: { id, parent } as DraggedItemType,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const [, dropRef] = useDrop({
        accept: "INNER_ITEM",
        hover: (draggedItem: any) => {
            if (index !== undefined) {
                onMove?.(index, draggedItem.id);
            }
        },
    })
    const combinedRef = (node: any) => {
        ref(node);
        dropRef(node)
    };
    if (hideIcon) {
        return (
            <div ref={combinedRef} className={`innerItem ${activeId === id ? "bg-ceruleanBlue text-platinum" : ""}`} onClick={() => id && handleColSelection?.(id)}>
                {name}
            </div>
        )
    } else {
        return (
            <div ref={ref} className={"cursor-grab"} >
                <TableCellsIcon className="w-25px" />
            </div>
        )
    }

}
export default InnerItem