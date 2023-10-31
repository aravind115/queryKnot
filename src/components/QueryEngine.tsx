import { SchemaItemProps } from "./types";
type DataTypeMapping = {
    [key: string]: {
        type: string;
        format?: string;
        minimum?: number;
        maximum?: number;
    };
};
interface MongoDBSchemaField {
    bsonType: string;
    maxLength?: number;
    // Add other properties as needed
  }
  
  interface MongoDBSchema {
    validator: {
      $jsonSchema: {
        bsonType: string;
        required?: string[];
        properties: { [key: string]: MongoDBSchemaField };
      };
    };
  }
  
  interface JSONSchemaField {
    type: string;
    maxLength?: number;
    required: boolean;
    // Add other properties as needed
  }
  
  interface JSONSchema {
    tableName: string;
    title: string;
    type: string;
    properties: { [key: string]: JSONSchemaField };
    additionalProperties: boolean;
  }
  
  function getTypeMapping(bsonType: string): string {
    const typeMapping: { [key: string]: string } = {
      int: "integer",
      string: "string",
      // Add more type mappings as needed
    };
  
    return typeMapping[bsonType] || bsonType;
  }
export const createTableFromSchema = (schema: SchemaItemProps): string => {
    const { tableName, columns } = schema;
    const columnDefs = columns.map(({ name, dataType, length, constraints }) => {
        let columnStr = `${name} ${dataType}`;
        if (length) {
            columnStr += `(${length})`;
        }
        if (constraints) {
            columnStr += ` ${constraints.replace("_"," ")}`;
        }
        return columnStr;
    });
    return `CREATE TABLE ${tableName} (\n    ${columnDefs.join(',\n    ')}\n);`;
};
export const createSQLFromSchemas = (tableSchemas: SchemaItemProps[]): string => {
    const sqlStatements = tableSchemas.map(schema => createTableFromSchema(schema));
    if (tableSchemas.length > 1) {
        return `BEGIN;\n\n${sqlStatements.join('\n\n')}\n\nCOMMIT;`;
    } else {
        return sqlStatements[0];
    }
};


// NoSQL

const sqlToMongoDBType = (dataType: string): string => {
    switch (dataType) {
        case 'INTEGER': return 'int';
        case 'VARCHAR':
        case 'CHAR':
        case 'TEXT': return 'string';
        case 'DATE':
        case 'DATETIME': return 'date';
        case 'BOOLEAN': return 'bool';
        default: return 'mixed'; 
    }
};

export const createMongoDBCollection = (schema: SchemaItemProps): string => {
    const { tableName, columns } = schema;

    const fields = columns.map(({ name, dataType }) => 
        `"${name}": { "bsonType": "${sqlToMongoDBType(dataType)}" }`
    );

    return `
db.createCollection("${tableName}", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [${columns.map(column => `"${column.name}"`).join(', ')}],
         properties: {
            ${fields.join(',\n            ')}
         }
      }
   }
});
`;

};

export const createMongoDBCommandsFromData = (tableSchemas: SchemaItemProps[]): string => {
    return tableSchemas.map(schema => createMongoDBCollection(schema)).join('\n');
};

export function convertSQLToJSONSchema(sql: string): string {
    if(!sql){
      return ""
    }
      const lines = sql.split('\n').map(line => line.trim());
      const tableName = lines[0].split(' ')[2];
      const properties: { [key: string]: any } = {};
      const typeMapping: DataTypeMapping = {
          INTEGER: { type: 'integer' },
          VARCHAR: { type: 'string' },
          CHAR: { type: 'string' },
          TEXT: { type: 'string' },
          DATE: { type: 'string', format: 'date' },
          TIMESTAMP: { type: 'string', format: 'date-time' },
          BOOLEAN: { type: 'boolean' },
          FLOAT: { type: 'number' },
          DOUBLE: { type: 'number' },
          DECIMAL: { type: 'number' },
          BINARY: { type: 'string', format: 'binary' },
          BLOB: { type: 'string', format: 'binary' },
          BIGINT: { type: 'integer' },
          SMALLINT: { type: 'integer' },
          TINYINT: { type: 'integer' },
          BIT: { type: 'integer' },
          ENUM: { type: 'string' },
          SET: { type: 'array' },
          DATETIME: { type: 'string', format: 'date-time' },
          TIME: { type: 'string', format: 'time' },
          YEAR: { type: 'integer', minimum: 1901, maximum: 2155 },
          JSON: { type: 'object' },
          UUID: { type: 'string', format: 'uuid' },
          CLOB: { type: 'string' }
      };
      
      for (let i = 1; i < lines.length - 1; i++) {
          const [field, typeLength] = lines[i].split(' ');
          const [type, length] = typeLength ? typeLength.split('(') : [];
          const name = field.replace(',', '');
          const property: any = {
            ...typeMapping[type],
          };
          if (length) {
            property.maxLength = parseInt(length);
          }
          if (['BIGINT', 'SMALLINT', 'TINYINT', 'YEAR'].includes(type) && length) {
            property.maximum = Math.pow(10, parseInt(length)) - 1;
          }
          properties[name] = {
              ...typeMapping[type],
              maxLength: length ? parseInt(length) : undefined,
              maximum: ['BIGINT', 'SMALLINT', 'TINYINT', 'YEAR'].includes(type) && length ? Math.pow(10, parseInt(length)) - 1 : undefined
            
            };
            console.log("lines[i]",lines[i],lines[i].includes("NOT NULL"))
              property.required = lines[i].includes("NOT NULL");
          properties[name] = property;
      }
  
      return JSON.stringify({
          tableName,
          title: tableName.charAt(0).toUpperCase() + tableName.slice(1),
          type: 'object',
          properties,
          additionalProperties: false
      }, null, 4);
  }


export function convertMongoDBToJSONSchema(
    collectionName: string,
    schemaDefinition: MongoDBSchema
  ): string {
    const requiredFields:any = schemaDefinition.validator.$jsonSchema.required ?? {};
    const properties: { [key: string]: JSONSchemaField } = {};
  
    for (const field in schemaDefinition.validator.$jsonSchema.properties) {
      const property = schemaDefinition.validator.$jsonSchema.properties[field];
      const type = property.bsonType;
  
      properties[field] = {
        type: getTypeMapping(type),
        required: requiredFields.includes(field),
      };
  
      if (type === "string") {
        properties[field].maxLength = property.maxLength;
      }
  
      if (type === "int") {
        properties[field].type = "integer";
      }
    }
  
    const result: JSONSchema = {
      tableName: collectionName,
      title: collectionName.charAt(0).toUpperCase() + collectionName.slice(1),
      type: "object",
      properties,
      additionalProperties: false,
    };
  
    return JSON.stringify(result, null, 4);
  }

  
  