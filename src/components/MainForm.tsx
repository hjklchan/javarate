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
import {
  IconArrowRise,
  IconArrowFall,
  IconDelete,
} from "@arco-design/web-react/icon";
import useForm from "@arco-design/web-react/es/Form/useForm";
import Col from "@arco-design/web-react/es/Grid/col";
import Row from "@arco-design/web-react/es/Grid/row";
import { useMemo } from "react";
import { typeOptions } from "../constants";
import { DBField } from "../types";

export interface FormData {
  tableName: string;
  comment?: string;
  fields: DBField[];
}

export interface MainFormProps {
  onSubmit?: (formData: FormData) => void;
}

const MainForm = (props: MainFormProps) => {
  const [form] = useForm();

  const fieldTypeOptions = useMemo(() => {
    console.log("options", typeOptions());

    return typeOptions();
  }, []);

  const onSubmit = () => {
    props.onSubmit ? props.onSubmit(form.getFieldsValue() as FormData) : null;
  };

  return (
    <Card title="Database DDL">
      <Form
        form={form}
        onSubmit={onSubmit}
        initialValues={{
          fields: [{ name: "id", type: 0, comment: "自增 ID" }],
        }}
      >
        <Space>
          <Form.Item
            field={"tableName"}
            label="表名"
            layout="vertical"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            field={"comment"}
            label="注释"
            layout="vertical"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Space>
        <Form.List
          field="fields"
          children={(fields, _operations) => {
            return (
              <div>
                <Row
                  gutter={{ md: 8, lg: 24, xl: 32 }}
                  style={{ paddingBottom: "10px" }}
                >
                  <Col span={4}>字段名</Col>
                  <Col span={6}>注释</Col>
                  <Col span={6}>类型</Col>
                  <Col span={1}>是否为空</Col>
                  <Col span={6}>默认值</Col>
                  <Col span={1}>操作</Col>
                </Row>
                {fields.map((item, index) => {
                  const disabled = index === 0;

                  return (
                    <div key={item.key} style={{ marginBottom: "15px" }}>
                      <Row gutter={{ md: 8, lg: 24, xl: 32 }}>
                        <Col span={4}>
                          <Form.Item
                            field={item.field + ".name"}
                            rules={[{ required: true }]}
                            disabled={disabled}
                            noStyle
                          >
                            <Input placeholder="字段名" />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            field={item.field + ".comment"}
                            disabled={disabled}
                            noStyle
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            field={item.field + ".type"}
                            rules={[{ required: true }]}
                            disabled={disabled}
                            noStyle
                          >
                            <Select
                              options={fieldTypeOptions}
                              placeholder="字段类型"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={1}>
                          <Form.Item
                            field={item.field + ".isNull"}
                            disabled={disabled}
                            noStyle
                          >
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            field={item.field + ".defaultValue"}
                            disabled={disabled}
                            noStyle
                          >
                            <Input placeholder="默认值" />
                          </Form.Item>
                        </Col>
                        <Col span={1}>
                          <Button
                            icon={<IconDelete />}
                            shape="circle"
                            status="danger"
                            onClick={() => _operations.remove(index)}
                            disabled={disabled}
                          ></Button>
                        </Col>
                      </Row>
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
              </div>
            );
          }}
        />
      </Form>
    </Card>
  );
};

export default MainForm;
