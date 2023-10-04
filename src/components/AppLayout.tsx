import LeftSideMenu from "./shared/LeftSideMenu";
import RightSideMenu from "./shared/RightSideMenu";
import Dropzone from "./shared/Dropzone";
import { useEffect, useState } from "react";
import { SchemaItemProps, activeTableProps } from "./types";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardIcon } from "@heroicons/react/24/outline";

const AppLayout = () => {
  const [tableSchema, setTableSchema] = useState<SchemaItemProps[]>([])
  const [copyText, setCopyText] = useState<string>();
  const [activeId,setActiveId]=useState<activeTableProps | undefined>()
  const handleCopy = () => {
    alert('Content copied to clipboard!');
  };

  const createTableFromSchema = (schema: SchemaItemProps): string => {
    const { tableName, columns } = schema;
    const columnDefs = columns.map(({ name, dataType, length, constraints }) => {
      let columnStr = `${name} ${dataType}`;
      if (length) {
        columnStr += `(${length})`;
      }
      if (constraints) {
        columnStr += ` ${constraints}`;
      }
      return columnStr;
    });
    return `CREATE TABLE ${tableName} (\n    ${columnDefs.join(',\n    ')}\n);`;
  };
  const createSQLFromSchemas = (tableSchemas:SchemaItemProps[]): string => {
    const sqlStatements = tableSchemas.map(schema => createTableFromSchema(schema));
    if (tableSchemas.length > 1) {
        return `BEGIN;\n\n${sqlStatements.join('\n\n')}\n\nCOMMIT;`;
    } else {
        return sqlStatements[0];
    }
};

  useEffect(() => {
    const fullSQL = createSQLFromSchemas(tableSchema);
    setCopyText(fullSQL)
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
        <div className="clipboardArea" style={{height:"50%"}}>
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