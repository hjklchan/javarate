export interface EntityPayload {
  moduleName: string;
  fields: {
    name: string;
    type: string;
    comment?: string;
  }[];
}

export const generate = (payload: EntityPayload) => {
  const { moduleName, fields } = payload;
  return (
    `public class ${moduleName} implements Serializable {\n` +
    fields
      .map((field) => {
        return `\t/** COMMENT **/\n\tprivate ${field.type} ${field.name};\n`;
      })
      .join("") +
    "}"
  );
};
