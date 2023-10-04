import { ReactNode, useState } from "react"
import DraggableItem from "../shared/DraggableItem";
import DropdownMenu from "../UIComponents/DropdownMenu";
import InputBox from "../UIComponents/InputBox";


  const  RightSideMenu=()=>{
    const constraint=[
      { id: 'PRIMARY_KEY', label: 'primaryKey' },
      { id: 'FOREIGN_KEY', label: 'foreignKey' },
      { id: 'UNIQUE', label: 'unique' },
      { id: 'NOT_NULL', label: 'notNull' },
      { id: 'CHECK', label: 'check' },
      { id: 'DEFAULT', label: 'default' },
      { id: 'INDEX', label: 'index' },
      { id: 'AUTO_INCREMENT', label: 'autoIncrement' },
      { id: 'SERIAL', label: 'serial' }  // Specifically for PostgreSQL and some others
    ]
    const dataTypeOptions =[
        { id: 'INTEGER', label: 'integer' },
        { id: 'VARCHAR', label: 'varChar' },
        { id: 'CHAR', label: 'char' },
        { id: 'TEXT', label: 'text' },
        { id: 'DATE', label: 'date' },
        { id: 'TIMESTAMP', label: 'timeStamp' },
        { id: 'BOOLEAN', label: 'boolean' },
        { id: 'FLOAT', label: 'float' },
        { id: 'DOUBLE', label: 'double' },
        { id: 'DECIMAL', label: 'decimal' },
        { id: 'BINARY', label: 'binary' },
        { id: 'BLOB', label: 'blob' },
        { id: 'BIGINT', label: 'bigInt' },
        { id: 'SMALLINT', label: 'smallInt' },
        { id: 'TINYINT', label: 'tinyInt' },
        { id: 'BIT', label: 'bit' },
        { id: 'ENUM', label: 'enum' },
        { id: 'SET', label: 'set' },
        { id: 'DATETIME', label: 'dateTime' },
        { id: 'TIME', label: 'time' },
        { id: 'YEAR', label: 'year' },
        { id: 'JSON', label: 'json' },
        { id: 'UUID', label: 'uuid' },
        { id: 'CLOB', label: 'clob' }
      ];




      return(
        <div className="rightNavContainer">
        <InputBox label="Column Name" placeholder="Enter Column Name" id="columnLength" onChange={(value) => console.log(value)} />

        <DropdownMenu  
        label="Data Types:"
        options={dataTypeOptions}
        onSelect={(selectedOption) => {
          console.log('Selected:', selectedOption);
        }}
        />

        <InputBox label="Column Length" placeholder="Enter column length" id="columnLength" onChange={(value) => console.log(value)} />
        
        <DropdownMenu  
        label="Constraints:"
        options={constraint}
        onSelect={(selectedOption) => {
          console.log('Selected:', selectedOption);
        }}
        />
        
      </div>
      )


  }
  export default RightSideMenu