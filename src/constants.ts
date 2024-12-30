import { SelectProps } from "@arco-design/web-react";

export enum DatabaseTypes {
  TINYINT,
  INT,
  BIGINT,
  FLOAT,
  DOUBLE,
  DECIMAL,
  DATE,
  DATETIME,
  TIME,
  TIMESTAMP,
  VARCHAR,
  TEXT,
  LONGTEXT,
  // etc.
}

export const typeOptions = (): SelectProps["options"] => {
  return [
    { label: "TINYINT", value: DatabaseTypes.TINYINT },
    { label: "INT", value: DatabaseTypes.INT },
    { label: "BIGINT", value: DatabaseTypes.BIGINT },
    { label: "FLOAT", value: DatabaseTypes.FLOAT },
    { label: "DOUBLE", value: DatabaseTypes.DOUBLE },
    { label: "DECIMAL", value: DatabaseTypes.DECIMAL },
    { label: "DATE", value: DatabaseTypes.DATE },
    { label: "DATETIME", value: DatabaseTypes.DATETIME },
    { label: "TIME", value: DatabaseTypes.TIME },
    { label: "TIMESTAMP", value: DatabaseTypes.TIMESTAMP },
    { label: "VARCHAR", value: DatabaseTypes.VARCHAR },
    { label: "TEXT", value: DatabaseTypes.TEXT },
    { label: "LONGTEXT", value: DatabaseTypes.LONGTEXT },
  ]
}

type DbTypeInfo = { type: number, length: number | null, point: number | null } | null;

export const typeString = (typeInfo: DbTypeInfo): string => {
  if (typeInfo === null) return "";

  const { type, length, point } = typeInfo;

  let template = DatabaseTypes[type].toString();

  if (!length) return template;
  template = `(${length}`;
  if (!point) return template += ")";
  template += `, ${point}`;
  template += ")";

  return template;
}

export const javaTypeFrom = (dbType: DatabaseTypes) => {
  switch (dbType) {
    case DatabaseTypes.TINYINT:
    case DatabaseTypes.INT:
    case DatabaseTypes.BIGINT:
      return "Integer";
    case DatabaseTypes.TIMESTAMP:
      return "java.sql.Timestamp";
    case DatabaseTypes.DATE:
      return "java.sql.Date";
    case DatabaseTypes.TIME:
      return "java.sql.Time";
    case DatabaseTypes.DATETIME:
      return "java.sql.LocalDateTime";
    case DatabaseTypes.VARCHAR:
    case DatabaseTypes.TEXT:
    case DatabaseTypes.LONGTEXT:
      return "String";
    case DatabaseTypes.FLOAT:
      return "Float";
    case DatabaseTypes.DOUBLE:
      return "Double";
    case DatabaseTypes.DECIMAL:
      return "Decimal";
  }
};
