import { Dispatch, SetStateAction } from "react"
import { useDrop } from "react-dnd"
import Canva from "./Canva"
import {SchemaItemProps, activeTableProps } from "../types";
import uuid from "react-uuid";
interface DropzoneProps {
  tableSchema?: SchemaItemProps[];
  setTableSchema?: Dispatch<React.SetStateAction<SchemaItemProps[]>>;
  activeId?:activeTableProps;
  setActiveId?:Dispatch<SetStateAction<activeTableProps | undefined>>
}
const Dropzone = (props: DropzoneProps) => {
  const {
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
        const tableId=uuid()
        const columnId=uuid()
        /* for global object */
        const newSchemaItem: SchemaItemProps = {
          id: tableId,
          tableName: tableName,
          columns: [{
            id: columnId,
            name: "id",
            dataType: "INTEGER",
            constraints: "PRIMARY KEY",
            length:""
          }]
        }

        setTableSchema?.(prev => [...prev, newSchemaItem])
        setActiveId?.({tableId:tableId,columnId:columnId})
        /* for global object */
      }
    },
  })
  return (
    <div
      ref={ref}
      style={{
        height:'70%',
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