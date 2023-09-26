import { CodeBracketSquareIcon, TableCellsIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react"
import { useDrag,useDrop } from 'react-dnd';
import DraggableItem from "./shared/DraggableItem";
interface AppLayoutProps {
  children: ReactNode
}
type DraggableItem = {
  id: string;
  name:string;
  icon:ReactNode;
};
const AppLayout = () => {
  const items: DraggableItem[] = [
    { id: 'table', name:"Table",icon:<TableCellsIcon/> },
    { id: 'column', name:"Column",icon:<ViewColumnsIcon/>},
    { id: 'queryBlock', name:"Query Block",icon: <CodeBracketSquareIcon/> }
  ];

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'ITEM_TYPE',
    drop: (item:{id:string}, monitor) => {
      console.log('Dropped item:', item);
      alert("You dropped "+ item?.id)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Left navbar */}
      <div className="flex flex-col h-full w-20 p-5 bg-deepSpace text-platinum text-center shadow-custom border-solid border-1 border-gunmetal shadow-custom">
        {/* Draggable Table Icon */}
        {items.map(item => (
        <DraggableItem key={item.id} item={item} />
      ))}
      </div>

      {/* Center canvas area */}
      <div className="flex-grow relative z-10" ref={drop} style={{ backgroundColor: canDrop ? '#E5E5E5' : '#414A4C' }}>
      </div>

      {/* Right navbar */}
      <div className={`w-64 bg-deepSpace text-platinum p-3`}>
        Right Navbar Content
      </div>
    </div>
  )
}
export default AppLayout