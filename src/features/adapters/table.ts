import { Table } from "../types/database";
import { Form } from "../types/form";

export const fromFormData = (formData: Form): Table => {
  const { tableName, primaryKey, columns } = formData;

  return {
    name: tableName,
    columns: columns.map(
      ({ name, comment, dataType, isNull, defaultValue }) => {
        return {
          name,
          comment,
          dataType,
          isNull: isNull ?? true,
          defaultValue,
        };
      }
    ),
    primaryKey: primaryKey ?? "id",
  };
};
