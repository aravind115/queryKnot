
import { ReactNode } from "react"
import Canva from "./Canva";
import InnerItem from "./InnerItem";
const LeftSideMenu = () => {
    return (
        <div className="leftNavContainer">
            {/* Draggable Table */}
            <Canva/>
            <InnerItem id={"checkLeft"} parent="LeftMenu"/>
        </div>
    )
}
export default LeftSideMenu