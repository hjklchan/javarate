import { typeString } from "../constants";
import { DBField } from "../types";

export interface DDLPayload {
  tableName: string;
  fields: DBField[];
  primaryKey: string;
  characterSet?: string;
}

export function generate(payload: DDLPayload) {
  const { tableName, fields, characterSet, primaryKey } = payload;
  const ensureCharacterSet = characterSet
    ? " DEFAULT CHARSET=".concat(characterSet)
    : "";

  return (
    `CREATE TABLE IF NOT EXISTS \`${tableName}\` (\n` +
    fields
      .map(({ name, type, defaultValue, comment, isNull }) => {
        const ensureNotNull = isNull !== undefined ? (!isNull ? " NOT NULL" : "") : "";
        const ensureDefaultValue = defaultValue
          ? " ".concat('DEFAULT "', defaultValue, '"')
          : "";
        const ensureComment = comment ? ` COMMENT "${comment}"` : "";
        const ensureType = typeString({ type: Number.parseInt(type), length: null, point: null });

        return `\t\`${name}\` ${ensureType}${ensureNotNull}${ensureDefaultValue}${ensureComment},\n`;
      })
      .join("") +
    `\t PRIMARY KEY (\`${primaryKey}\`)\n` +
    `)${ensureCharacterSet};`
  );
}
