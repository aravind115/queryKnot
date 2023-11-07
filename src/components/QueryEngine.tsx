import { SchemaItemProps } from "./types";
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
  

  interface DataTypeMapping {
    [key: string]: {
      type: string;
      format?: string;
      maxLength?: number;
      maximum?: number;
      minimum?: number;
    };
  }
  
  interface Property {
    type: string;
    format?: string;
    maxLength?: number;
    maximum?: number;
    required?: boolean;
  }
  
  export function convertSQLToJSONSchema(sql: string):string {
    if (!sql) {
      return "";
    }
  
    // Define the type mapping
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
  
    // Function to process each CREATE TABLE statement
    const processCreateTable = (statement: string): string => {
      const lines = statement.split('\n').map(line => line.trim().replace(/,$/, ''));
      const tableNameMatch = lines[0].match(/CREATE TABLE (\w+)/i);
      if (!tableNameMatch) {
        throw new Error('Table name not found in statement');
      }
      const tableName = tableNameMatch[1];
      const properties: { [key: string]: Property } = {};
  
      lines.slice(1, -1).forEach(line => {
        const match = line.match(/(\w+)\s+(\w+)(?:\((\d+)\))?.*/);
        if (!match) return;
  
        const [, name, type, length] = match;
        const property: Property = { ...typeMapping[type.toUpperCase()] };
  
        if (length) {
          property.maxLength = parseInt(length, 10);
        }
  
        // Set property required if NOT NULL exists in the line
        property.required = line.includes("NOT NULL");
  
        properties[name] = property;
      });
  
      return JSON.stringify({
        tableName,
        title: tableName.charAt(0).toUpperCase() + tableName.slice(1),
        type: 'object',
        properties,
        additionalProperties: false
      }, null, 4);
    };
  
    // Remove transaction statements and split the input SQL into separate statements for each table
    const cleanedSql = sql.replace(/BEGIN;|COMMIT;/gi, '');
    const tableStatements = cleanedSql.match(/CREATE TABLE[\s\S]+?;\s*$/gm);
  
    if (!tableStatements) {
      throw new Error('No CREATE TABLE statements found');
    }
  
    // Process each CREATE TABLE statement and convert it to a JSON schema
    const jsonSchemas = tableStatements.map(processCreateTable);
  
    // Combine all JSON schemas into a single JSON array
    // return jsonSchemas.length > 1 ? jsonSchemas : jsonSchemas[0];
    return `[${jsonSchemas.join(",\n")}]`;
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

  
  