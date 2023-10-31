import LeftSideMenu from "./shared/LeftSideMenu";
import RightSideMenu from "./shared/RightSideMenu";
import Dropzone from "./shared/Dropzone";
import { useEffect, useState } from "react";
import { SchemaItemProps, activeTableProps } from "./types";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { createMongoDBCommandsFromData, createSQLFromSchemas,convertSQLToJSONSchema,convertMongoDBToJSONSchema } from "./QueryEngine";
import DropdownMenu from "./UIComponents/DropdownMenu";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const AppLayout = () => {
  const [tableSchema, setTableSchema] = useState<SchemaItemProps[]>([])
  const [copyText, setCopyText] = useState<string>();
  const [NoSQLcopyText, setNoSQlCopyText] = useState<string>();
  const [jsonSchema,setJsonSchema]=useState<string>("")
  const [activeId, setActiveId] = useState<activeTableProps | undefined>()
  const [SchemaData, setSchemaData] = useState<"psql" | "nosql">("psql")
  const handleCopy = () => {
    alert('Content copied to clipboard!');
  };
  interface DropdownOption {
    id: "psql" | "nosql";
    label: string;
  }
  const DropdownOptions: DropdownOption[] = [
    { id: "psql", label: "PSQL" },
    { id: "nosql", label: "MONGODB" }
  ]


useEffect(() => {
  const fullSQL = createSQLFromSchemas(tableSchema);
  const mongoDBCommands = createMongoDBCommandsFromData(tableSchema);
  setCopyText(fullSQL)
  setNoSQlCopyText(mongoDBCommands)
  const jsonSchema = convertSQLToJSONSchema(fullSQL);
  setJsonSchema(jsonSchema || "")
}, [tableSchema])

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

        <div className="clipboardArea" style={{ height: "50%" }}>
          <div className="flex h-full">
            <div className="w-1/2 bg-eclipse text-platinum p-2 border-r border-solid border-outerSpace">
            <label>Schema</label>
              <div className="flex content-center">
              <div className="w-1/2">
              <DropdownMenu
                options={DropdownOptions}
                onSelect={(selectedOption: any) => setSchemaData(selectedOption.id)}
                value={SchemaData} />
              </div>
              <div className="w-1/2 flex justify-end">
              <CopyToClipboard text={ SchemaData === "nosql" ? NoSQLcopyText ?? "" : copyText ?? ""} onCopy={handleCopy}>
              <div className="my-auto cursor-pointer">
                  <ContentCopyIcon/>
                </div>
              </CopyToClipboard>
              </div>
              </div>
              <div className="relative w-full h-full">           
                <textarea
                  className="textArea"
                  value={SchemaData === "nosql"? NoSQLcopyText :copyText}
                  readOnly
                >
                </textarea>
              </div>
              {/* No SQL */}
            </div>
            <div className="w-1/2 bg-eclipse text-platinum p-2">
            <div className="flex content-center">
              <div className="w-1/2 p-5">
              <label>JSON Schema</label>
              </div>
              <div className="w-1/2 flex justify-end pb-5">
              <CopyToClipboard text={jsonSchema ?jsonSchema :"" } onCopy={handleCopy}>
              <div className="my-auto cursor-pointer">
                  <ContentCopyIcon/>
                </div>
              </CopyToClipboard>
              </div>
              </div>
              
              <div className="relative w-full h-full">
                <textarea
                  className="textArea"
                  value={jsonSchema}
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