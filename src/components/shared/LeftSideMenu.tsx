
import { ReactNode } from "react"
import Canva from "./Canva";
import InnerItem from "./InnerItem";
import uuid from 'react-uuid';
const LeftSideMenu = () => {
    return (
        <div className="flex flex-col h-full w-20 p-5 bg-deepSpace text-platinum text-center shadow-custom border-solid border-1 border-gunmetal shadow-custom">
            {/* Draggable Table */}
            <Canva id={"re"} />
            {/* Draggable cell */}
            {/* <InnerItem id={`${uuid()}`}/> */}
            <InnerItem id={"checkLeft"} parent="LeftMenu"/>
        </div>
    )
}
export default LeftSideMenu