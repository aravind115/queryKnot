import { ReactNode } from 'react';
import { useDrag } from 'react-dnd';
interface DragItem {
    id: string;
    name:string;
    icon:ReactNode;
  }
function DraggableItem({ item }:{item:DragItem}) {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM_TYPE',
    item: { id: item.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div className="w-8 h-8 my-5 cursor-pointer hover:text-ceruleanBlue" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {item.icon}
    </div>
  );
}
export default DraggableItem