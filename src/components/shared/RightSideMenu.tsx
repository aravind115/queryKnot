import { ReactNode, useState } from "react"
import DraggableItem from "../shared/DraggableItem";

type DraggableItem = {
    id: string;
    name:string;
    icon:ReactNode;
  };
  const  RightSideMenu=()=>{
      return(
        <div className={`w-64 bg-deepSpace text-platinum p-3`}>
        Right Navbar Content
      </div>
      )


  }
  export default RightSideMenu