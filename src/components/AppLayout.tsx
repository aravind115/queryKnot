import LeftSideMenu from "./shared/LeftSideMenu";
import RightSideMenu from "./shared/RightSideMenu";
import Dropzone from "./shared/Dropzone";
import { useEffect, useState } from "react";
import { SchemaItemProps, activeTableProps } from "./types";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { createMongoDBCommandsFromData, createSQLFromSchemas } from "./QueryEngine";

const AppLayout = () => {
  const [tableSchema, setTableSchema] = useState<SchemaItemProps[]>([])
  const [copyText, setCopyText] = useState<string>();
  const [NoSQLcopyText, setNoSQlCopyText] = useState<string>();
  const [activeId,setActiveId]=useState<activeTableProps | undefined>()
  const handleCopy = () => {
    alert('Content copied to clipboard!');
  };

  

  useEffect(() => {
    const fullSQL = createSQLFromSchemas(tableSchema);
    const mongoDBCommands = createMongoDBCommandsFromData(tableSchema);
    setCopyText(fullSQL)
    setNoSQlCopyText(mongoDBCommands)


  }, [tableSchema])

  console.log(tableSchema)
  return (
    <div className="flex h-screen overflow-hidden justify-between">
      {/* Left navbar */}
      <LeftSideMenu />
      {/* Center canvas area */}
      <div className="canvasArea">
        <Dropzone
          tableSchema={tableSchema}
          setTableSchema={setTableSchema}
          activeId={activeId}
          setActiveId={setActiveId}
        />

        
        <div className="clipboardArea" style={{height:"50%"}}>
          <div className="flex h-full">
            
            <div className="w-1/2 bg-eclipse text-platinum p-2 border-r border-solid border-outerSpace">
            <label>PSQL Query</label>
            <div className="relative w-full h-full">
            <CopyToClipboard text={copyText ?? ""} onCopy={handleCopy}>
              <ClipboardIcon className="m-2 absolute top-2 right-2 cursor-pointer w-25px text-platinum" />
            </CopyToClipboard>

            <textarea
              className="textArea"
              value={copyText}
              readOnly
            >
            </textarea>
          </div>
          {/* No SQL */}
            </div>
            <div className="w-1/2 bg-eclipse text-platinum p-2">
            <label>NoSQL Query</label>
            <div className="relative w-full h-full">
            <CopyToClipboard text={NoSQLcopyText ?? ""} onCopy={handleCopy}>
              <ClipboardIcon className="m-2 absolute top-2 right-2 cursor-pointer w-25px text-platinum" />
            </CopyToClipboard>

            <textarea
              className="textArea"
              value={NoSQLcopyText}
              readOnly
            >
            </textarea>
          </div>
            </div>

          </div>

        </div>
      </div>

      {/* Right navbar */}
      <RightSideMenu 
      tableSchema={tableSchema}
      setTableSchema={setTableSchema}
      activeId={activeId}
      />
    </div>
  )
}
export default AppLayout