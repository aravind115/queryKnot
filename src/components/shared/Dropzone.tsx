import {useState}from "react"
import { useDrop } from "react-dnd"
import Canva from "./Canva"
const Dropzone:React.FC=()=>{
    const [droppedItems,setDroppedItems]=useState<string[]>([])
    const[,ref]=useDrop({
        accept:'CANVA',
        drop:(item:{id:string})=>{
            setDroppedItems(prev=>[...prev,item.id])
        },
    })
    // const handleCanvasDelete = (canvasId: string) => {
    //     setDroppedItems(prev => prev.filter(id => id !== canvasId));
    //   };
    return(
        <div
        ref={ref}
        className="h-full"
        style={{
            // width: '400px',
            // height: '400px',
            border: '2px dashed gray',
            position: 'relative',
          }}
        >
        {droppedItems.map(id => (
        <Canva key={id} id={id} hideIcon={true}/>
      ))}
        </div>
    )
}
export default Dropzone