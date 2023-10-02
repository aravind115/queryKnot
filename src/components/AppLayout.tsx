import LeftSideMenu from "./shared/LeftSideMenu";
import RightSideMenu from "./shared/RightSideMenu";
import Dropzone from "./shared/Dropzone";
import { useState } from "react";
import { InnerItemProps } from "./types";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardIcon } from "@heroicons/react/24/outline";
const AppLayout = () => {
  const [droppedItems, setDroppedItems] = useState<string[]>([])
  const [innerItems, setInnerItems] = useState<InnerItemProps[]>([]);
  const [copyText, setCopyText] = useState<string[]>([]);
  const handleCopy = () => {
    alert('Content copied to clipboard!');
  };
  console.log({innerItems,droppedItems})
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left navbar */}
      <LeftSideMenu />
      {/* Center canvas area */}
      <div className="flex-grow relative z-10">
        <Dropzone
          droppedItems={droppedItems}
          setDroppedItems={setDroppedItems}
          innerItems={innerItems}
          setInnerItems={setInnerItems}
          setCopyText={setCopyText}
          copyText={copyText}
        />
        <div className="bg-eclipse flex flex-col justify-between text-platinum items-end" style={{ height: "100%" }}>
          <div className="relative w-full">
            <CopyToClipboard text={copyText.join()} onCopy={handleCopy}>
              <ClipboardIcon style={{ width: "25px" }} className="m-2 absolute top-2 right-2 cursor-pointer" />
            </CopyToClipboard>

            <textarea
              className="p-2 resize-none w-full bg-eclipse h-full"
              value={copyText}
            >
            </textarea>
          </div>
        </div>
      </div>

      {/* Right navbar */}
      <RightSideMenu />
    </div>
  )
}
export default AppLayout