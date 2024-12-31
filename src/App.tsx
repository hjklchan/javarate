import { useEffect, useState } from "react";
import { generate as ddlGenerate } from "./templates/ddl";
import { generate as entityGenerate } from "./templates/java_entity";
import MainForm, { FormData } from "./components/MainForm";
import { Card, Input } from "@arco-design/web-react";
import { Java, toUpperCamel } from "./utils";
import { javaTypeFrom } from "./constants";
import { mapperGenerator } from "./templates/java_mapper";

function App() {
  const [ddlText, setDdlText] = useState<string>("");
  const [entityCodeText, setEntityCodeText] = useState<string>("");
  const [mapperCodeText, setMapperCodeText] = useState<string>("");

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

    setMapperCodeText(mapperGenerator({
      moduleName: toUpperCamel(tableName),
      properties: [],
    }))
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
      <Card title="Mapper 代码">
        <Input.TextArea value={mapperCodeText} autoSize />
      </Card>
    </>
  );
}

export default App;
