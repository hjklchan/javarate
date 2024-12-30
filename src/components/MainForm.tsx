import {
  Button,
  Card,
  Form,
  FormItemProps,
  Input,
  Select,
  SelectProps,
  Space,
  Switch,
} from "@arco-design/web-react";
import useForm from "@arco-design/web-react/es/Form/useForm";
import Col from "@arco-design/web-react/es/Grid/col";
import Row from "@arco-design/web-react/es/Grid/row";
import { useEffect, useMemo } from "react";
import { DatabaseTypes, defaultTypeInfoFrom } from "../constants";

export interface MainFormProps {
  onSubmit?: (values: { [key: string]: any }) => void;
}

const MainForm = (props: MainFormProps) => {
  const { onSubmit } = props;
  const [form] = useForm();

  const fieldTypeOptions = useMemo(() => {
    let options: SelectProps["options"] = [];

    Object.keys(DatabaseTypes).map((value, index) => {
      console.log(DatabaseTypes[index]);
      const typeInfo = defaultTypeInfoFrom(index);
      let label: string;

      if (typeInfo !== undefined) {
        let { length, point } = typeInfo;

        label = DatabaseTypes[index].concat(
          length > 0
            ? "(" + length + (point > 0 ? ", " + point + ")" : ")")
            : ""
        );
      } else {
        label = DatabaseTypes[index];
      }

      options.push({ label, value: index });
    });

    return options;
  }, []);

  useEffect(() => {
    console.log(fieldTypeOptions);
  }, []);

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Form.List
        field="fields"
        children={(fields, _operations) => {
          return (
            <Card title="Database DDL">
              <Row
                gutter={{ md: 8, lg: 24, xl: 32 }}
                style={{ paddingBottom: "10px" }}
              >
                <Col span={4}>字段名</Col>
                <Col span={6}>备注</Col>
                <Col span={6}>类型</Col>
                <Col span={2}>是否为空</Col>
                <Col span={6}>默认值</Col>
              </Row>
              {fields.map((item) => {
                return (
                  <div key={item.key} style={{ marginBottom: "15px" }}>
                    {/* <Form.Item> */}
                    <Row gutter={{ md: 8, lg: 24, xl: 32 }}>
                      <Col span={4}>
                        <Form.Item
                          field={item.field + ".name"}
                          rules={[{ required: true }]}
                          noStyle
                        >
                          <Input placeholder="字段名" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item field={item.field + ".comment"} noStyle>
                          <Input placeholder="备注" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          field={item.field + ".type"}
                          rules={[{ required: true }]}
                          noStyle
                        >
                          <Select options={fieldTypeOptions} placeholder="字段类型" />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Form.Item field={item.field + ".isNull"} noStyle>
                          <Switch />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item field={item.field + ".defaultValue"} noStyle>
                          <Input placeholder="默认值" />
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* </Form.Item> */}
                  </div>
                );
              })}
              <Form.Item>
                <Space>
                  <Button
                    status="warning"
                    onClick={() => {
                      _operations.add();
                    }}
                  >
                    新增字段
                  </Button>
                  <Button type="primary" onClick={form.submit}>
                    开始生成
                  </Button>
                </Space>
              </Form.Item>
            </Card>
          );
        }}
      />
    </Form>
  );
};

export default MainForm;
