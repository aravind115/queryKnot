import {useState}from "react"
import { useDrop } from "react-dnd"
import Canva from "./Canva"
import { InnerItemProps } from "../types";
import uuid from "react-uuid";
interface DropzoneProps {
    droppedItems: string[];
    setDroppedItems: React.Dispatch<React.SetStateAction<string[]>>;
    innerItems?:InnerItemProps[];
    setInnerItems?:React.Dispatch<React.SetStateAction<InnerItemProps[]>>;
    setCopyText?:React.Dispatch<React.SetStateAction<string[]>>;
    copyText?:string[];
  }
const Dropzone:React.FC<DropzoneProps>=({droppedItems,setDroppedItems,innerItems,
    setInnerItems,setCopyText,copyText})=>{
    const[,ref]=useDrop({
        accept:'CANVA',
        drop:()=>{
            let tableName:string = prompt("enter table name") as string;
            if (tableName !==null) {
              tableName = tableName.replace(/\s+/g, '_').toLowerCase();
                setDroppedItems(prev => [...prev, tableName]);
                setInnerItems?.([{
                  id:uuid(),
                  label:"id"
                }])
                const sqlCommand = `CREATE TABLE ${tableName} (id INTEGER PRIMARY KEY);`;
                setCopyText?.(prev => [...prev, sqlCommand]);
            }
        },
    })
    return(
        <div
        ref={ref}
        className="h-1/2"
        style={{
          // height:'50%',
            border: '2px dashed gray',
            position: 'relative',
          }}
        >
        {droppedItems.map(id => (
        <Canva 
        key={id} 
        id={id} 
        hideIcon={true}
        innerItems={innerItems}
        setInnerItems={setInnerItems}
        />
      ))}
        </div>
    )
}
export default Dropzone