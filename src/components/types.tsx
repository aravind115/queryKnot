
  export interface ColumnSchema{
    id:string;
    name:string;
    dataType:string;
    constraints:string;
    length:string;
  }
  export interface SchemaItemProps{
    id:string;
    tableName:string;
    columns:ColumnSchema[]
  }
  export interface activeTableProps{tableId:string,columnId:string}