import { Dispatch, SetStateAction, useEffect, useState } from "react"
import DropdownMenu from "../UIComponents/DropdownMenu";
import InputBox from "../UIComponents/InputBox";
import _ from 'lodash';
import { ColumnSchema, SchemaItemProps, activeTableProps } from "../types";

interface RightSideMenuProps {
  tableSchema: SchemaItemProps[];
  setTableSchema: Dispatch<SetStateAction<SchemaItemProps[]>>;
  activeId: activeTableProps | undefined;
}
type formValues = {
  name: string;
  dataType: string;
  length: string;
  constraints?: string;
  id?: string
}

const RightSideMenu = (props: RightSideMenuProps) => {
  const {
    activeId,
    setTableSchema,
    tableSchema
  } = props
  const [formValues, setFormValues] = useState<formValues>({
    name: "",
    dataType: "",
    length: "",
    constraints: "",
    id: ""
  })
  useEffect(() => {
    if (activeId) {
      const getTableObj = tableSchema.find(obj => obj.id === activeId?.tableId);
      if (getTableObj) {
        const readColumnsValue = getTableObj.columns.find(col => col.id === activeId.columnId);
        if (readColumnsValue) {
          setFormValues(readColumnsValue);
        }
      }
    }
  }, [activeId])
  const constraint = [
    { id: 'PRIMARY_KEY', label: 'PRIMARY_KEY' },
    { id: 'FOREIGN_KEY', label: 'FOREIGN_KEY' },
    { id: 'UNIQUE', label: 'UNIQUE' },
    { id: 'NOT_NULL', label: 'NOT_NULL' },
    { id: 'CHECK', label: 'CHECK' },
    { id: 'DEFAULT', label: 'DEFAULT' },
    { id: 'INDEX', label: 'INDEX' },
    { id: 'AUTO_INCREMENT', label: 'AUTO_INCREMENT' },
    { id: 'SERIAL', label: 'SERIAL' }
];

  const dataTypeOptions = [
    { id: 'INTEGER', label: 'INTEGER' },
    { id: 'VARCHAR', label: 'VARCHAR' },
    { id: 'CHAR', label: 'CHAR' },
    { id: 'TEXT', label: 'TEXT' },
    { id: 'DATE', label: 'DATE' },
    { id: 'TIMESTAMP', label: 'TIMESTAMP' },
    { id: 'BOOLEAN', label: 'BOOLEAN' },
    { id: 'FLOAT', label: 'FLOAT' },
    { id: 'DOUBLE', label: 'DOUBLE' },
    { id: 'DECIMAL', label: 'DECIMAL' },
    { id: 'BINARY', label: 'BINARY' },
    { id: 'BLOB', label: 'BLOB' },
    { id: 'BIGINT', label: 'BIGINT' },
    { id: 'SMALLINT', label: 'SMALLINT' },
    { id: 'TINYINT', label: 'TINYINT' },
    { id: 'BIT', label: 'BIT' },
    { id: 'ENUM', label: 'ENUM' },
    { id: 'SET', label: 'SET' },
    { id: 'DATETIME', label: 'DATETIME' },
    { id: 'TIME', label: 'TIME' },
    { id: 'YEAR', label: 'YEAR' },
    { id: 'JSON', label: 'JSON' },
    { id: 'UUID', label: 'UUID' },
    { id: 'CLOB', label: 'CLOB' }
];

  const handleFromChange = (key: keyof ColumnSchema, value: any) => {
    const clonedTableSchema = _.cloneDeep(tableSchema); // Create a deep copy
    const getTableObj = clonedTableSchema.find((obj: SchemaItemProps) => obj.id === activeId?.tableId);
    let columnObj: ColumnSchema | undefined;

    if (getTableObj) {
      columnObj = getTableObj.columns.find((col: ColumnSchema) => col.id === activeId?.columnId);
      if (columnObj) {
        columnObj[key] = value;
      }
    }
    if (columnObj !== undefined) {
      setFormValues(columnObj);
      setTableSchema(clonedTableSchema)
    }
  }

  if(activeId){
    return (
      <div className="rightNavContainer">
        <InputBox
          label="Column Name"
          placeholder="Enter Column Name"
          id="columnLength"
          onChange={(value) => handleFromChange("name", value)}
          value={formValues?.name || ""} />
  
        <DropdownMenu
          label="Data Types:"
          options={dataTypeOptions}
          onSelect={(selectedOption) => {
            handleFromChange("dataType", selectedOption.id)
            console.log('Selected:', selectedOption);
          }}
          value={formValues?.dataType || dataTypeOptions[0].label}
        />
  
        <InputBox
          label="Column Length"
          placeholder="Enter column length"
          id="columnLength"
          onChange={(value) => /^\d*$/g.test(value) && handleFromChange("length", value)}
          value={formValues?.length || ""} />
  
        <DropdownMenu
          label="Constraints:"
          options={constraint}
          onSelect={(selectedOption) => {
            handleFromChange("constraints", selectedOption.id)
            console.log('Selected:', selectedOption);
          }}
          value={formValues?.constraints || constraint[0].label}
        />
  
      </div>
    )
  }else{
    return(
      <div className="rightNavContainer">
  <h1 className="font-bold mb-4">Welcome to Query knot</h1>
  <p className="mb-2">Effortlessly generate SQL code with our drag-and-drop interface:</p>
  <ul className="list-disc pl-5 mb-4">
    <li className="mb-2">Simply drag tables and columns into our workspace, and SQLGen will instantly craft the SQL command for you.</li>
    <li className="mb-2">Click on tables or columns to highlight and easily adjust your query.</li>
    <li className="mb-2">Rearrange tables and columns, and SQLGen instantly updates the SQL command in real-time.</li>
    <li>After finalizing your command, easily copy it from our dedicated area, ready for execution.</li>
  </ul>
  <p>Experience effortless query creation with SQLGen. No SQL expertise needed.</p>
  </div>
    )
  }
}
export default RightSideMenu
