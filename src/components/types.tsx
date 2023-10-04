
  export interface ColumnSchema{
    id:string;
    name:string;
    dataType:string;
    constraints:string;
    length:number;
  }
  export interface SchemaItemProps{
    id:string;
    tableName:string;
    columns:ColumnSchema[]
  }