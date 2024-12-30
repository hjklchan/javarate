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

export const defaultTypeInfoFrom = (
  dbType: DatabaseTypes
): { length: number; point: number } | undefined => {
  switch (dbType) {
    case DatabaseTypes.TINYINT:
      return { length: 1, point: 0 };
    case DatabaseTypes.INT:
      return { length: 11, point: 0 };
    case DatabaseTypes.BIGINT:
      return { length: 20, point: 0 };
    case DatabaseTypes.DECIMAL:
      return { length: 10, point: 2 };
    case DatabaseTypes.VARCHAR:
      return { length: 255, point: 0 };
    default:
      return undefined;
  }
};

export const javaTypeFrom = (dbType: DatabaseTypes) => {
  switch (dbType) {
    case DatabaseTypes.TINYINT:
    case DatabaseTypes.INT:
    case DatabaseTypes.BIGINT:
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
