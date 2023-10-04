import LeftSideMenu from "./shared/LeftSideMenu";
import RightSideMenu from "./shared/RightSideMenu";
import Dropzone from "./shared/Dropzone";
import { useEffect, useState } from "react";
import { SchemaItemProps } from "./types";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardIcon } from "@heroicons/react/24/outline";

const AppLayout = () => {
  const [tableSchema, setTableSchema] = useState<SchemaItemProps[]>([])
  const [copyText, setCopyText] = useState<string[]>([]);
  const handleCopy = () => {
    alert('Content copied to clipboard!');
  };
  useEffect(() => {

  }, [])
  return (
    <div className="flex h-screen overflow-hidden justify-between">
      {/* Left navbar */}
      <LeftSideMenu />
      {/* Center canvas area */}
      <div className="canvasArea">
        <Dropzone
          setCopyText={setCopyText}
          tableSchema={tableSchema}
          setTableSchema={setTableSchema}
          copyText={copyText}
        />
        <div className="clipboardArea" style={{height:"50%"}}>
          <div className="relative w-full h-full">
            <CopyToClipboard text={copyText.join()} onCopy={handleCopy}>
              <ClipboardIcon className="m-2 absolute top-2 right-2 cursor-pointer w-25px" />
            </CopyToClipboard>

            <textarea
              className="textArea"
              value={copyText}
              readOnly
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