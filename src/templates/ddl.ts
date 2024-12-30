export interface Field {
  name: string;
  comment?: string;
  type: string;
  characterSet?: string;
  isNull?: string;
  defaultValue?: string;
  // ...
}

export interface DDLPayload {
  tableName: string;
  fields: Field[];
  primaryKey: string;
  characterSet?: string;
}

export function generate(payload: DDLPayload) {
  const { tableName, fields, characterSet, primaryKey } = payload;
  const ensureCharacterSet = characterSet
    ? " DEFAULT CHARSET=".concat(characterSet)
    : "";

  return (
    `CREATE TABLE \`${tableName}\` (\n` +
    fields
      .map(({ name, type, defaultValue, comment }) => {
        const ensureDefaultValue = defaultValue
          ? " ".concat('DEFAULT "', defaultValue, '"')
          : "";
        const ensureComment = comment ? ` COMMENT "${comment}"` : "";

        return `\t\`${name}\` ${type}${ensureDefaultValue}${ensureComment},\n`;
      })
      .join("") +
    `\t PRIMARY KEY (\`${primaryKey}\`)\n` +
    `)${ensureCharacterSet};`
  );
}
