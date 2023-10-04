import { Dispatch, SetStateAction, useState } from "react"
import { useDrop } from "react-dnd"
import Canva from "./Canva"
import {SchemaItemProps, activeTableProps } from "../types";
import uuid from "react-uuid";
interface DropzoneProps {
  setCopyText?:Dispatch<SetStateAction<string[]>>;
  copyText?: string[];
  tableSchema?: SchemaItemProps[];
  setTableSchema?: Dispatch<React.SetStateAction<SchemaItemProps[]>>;
  activeId?:activeTableProps;
  setActiveId?:Dispatch<SetStateAction<activeTableProps | undefined>>

}
const Dropzone = (props: DropzoneProps) => {
  const {
    setCopyText,
    setTableSchema,
    tableSchema,
    activeId,
    setActiveId
  } = props

  const [, ref] = useDrop({
    accept: 'CANVA',
    drop: () => {
      let tableName: string = prompt("enter table name") as string;
      if (tableName !== null) {
        tableName = tableName.replace(/\s+/g, '_').toLowerCase();

        /* for global object */
        const newSchemaItem: SchemaItemProps = {
          id: uuid(),
          tableName: tableName,
          columns: [{
            id: uuid(),
            name: "id",
            dataType: "INTEGER",
            constraints: "PRIMARY KEY",
            length:30
          }]
        }
        setTableSchema?.(prev => [...prev, newSchemaItem])
        /* for global object */
        const sqlCommand = `CREATE TABLE ${tableName} (id INTEGER PRIMARY KEY);`;
        setCopyText?.(prev => [...prev, sqlCommand]);
      }
    },
  })
  return (
    <div
      ref={ref}
      style={{
        height:'50%',
        border: '2px dashed gray',
        position: 'relative',
      }}
    >
      {
        tableSchema?.map(obj => {
          return (
            <Canva
              key={obj.id}
              id={obj.id}
              tableName={obj.tableName}
              hideIcon={true}
              setTableSchema={setTableSchema}
              tableSchema={tableSchema}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          )
        })
      }
    </div>
  )
}
export default Dropzone