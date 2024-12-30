import ejs from "ejs";
import { useEffect } from "react";
import { generate as ddlGenerate } from "./templates/ddl";
import { generate as entityGenerate } from "./templates/java_entity";
import { Java } from "./utils";
import MainForm from "./components/MainForm";

function App() {
  useEffect(() => {
    const tableName = "user_orders";
    const tableFields = [
      { name: "username", type: "VARCHAR(255)" },
      { name: "password", type: "VARCHAR(255)", defaultValue: "admin" },
      {
        name: "image",
        type: "VARCHAR(255)",
        defaultValue: "https://",
        comment: "图片地址",
      },
    ];

    const ddlTmpl = ddlGenerate({
      tableName: "users",
      fields: tableFields,
      primaryKey: "id",
      // characterSet: "utf8mb4"
    });

    console.log(ddlTmpl);

    const entityTmpl = entityGenerate({
      moduleName: Java.toUpperCamel("user_order"),
      fields: tableFields.map(({ name, comment }) => {
        return {
          type: "TODO",
          name: Java.toLowerCamel(name),
          comment: comment,
        };
      }),
    });

    console.log(entityTmpl);
  }, []);

  const onFormSubmit = (values: {[key: string]: any}) => {
    console.log(values);
  }

  return (
    <>
      <MainForm onSubmit={onFormSubmit} />
    </>
  );
}

export default App;
