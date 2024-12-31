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
    "\tprivate static final long serialVersionUID = 1L;\n\n" +
    fields
      .map((field) => {
        return `\t/** ${field.comment} **/\n\tprivate ${field.type} ${field.name};\n`;
      })
      .join("") +
    "}"
  );
};
