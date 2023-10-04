import { SchemaItemProps } from "./types";

export const createTableFromSchema = (schema: SchemaItemProps): string => {
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
