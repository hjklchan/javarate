import { useEffect, useState } from "react";
import { generate as ddlGenerate } from "./templates/ddl";
import { generate as entityGenerate } from "./templates/java_entity";
import MainForm, { FormData } from "./components/MainForm";
import { Card, Input } from "@arco-design/web-react";
import { Java } from "./utils";
import { javaTypeFrom } from "./constants";

function App() {
  const [ddlText, setDdlText] = useState<string>("");
  const [entityCodeText, setEntityCodeText] = useState<string>("");

  useEffect(() => {}, []);

  const onFormSubmit = (formData: FormData) => {
    const { tableName, fields } = formData;

    setDdlText(
      ddlGenerate({
        tableName,
        fields,
        primaryKey: "id",
      })
    );

    setEntityCodeText(
      entityGenerate({
        moduleName: Java.toUpperCamel(tableName),
        fields: fields.map(({ name, type, comment }) => {
          return {
            name: Java.toLowerCamel(name),
            type: javaTypeFrom(Number.parseInt(type)),
            comment,
          };
        }),
      })
    );
  };

  return (
    <>
      <MainForm onSubmit={onFormSubmit} />
      <Card title="DDL 数据库表">
        <Input.TextArea value={ddlText} autoSize />
      </Card>
      <Card title="Entity 代码">
        <Input.TextArea value={entityCodeText} autoSize />
      </Card>
    </>
  );
}

export default App;
