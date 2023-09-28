import LeftSideMenu from "./shared/LeftSideMenu";
import RightSideMenu from "./shared/RightSideMenu";
import Dropzone from "./shared/Dropzone";

const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left navbar */}
      <LeftSideMenu/>
      {/* Center canvas area */}
      <div className="flex-grow relative z-10">
        <Dropzone />
      </div>
      {/* Right navbar */}
     <RightSideMenu/>
    </div>
  )
}
export default AppLayout