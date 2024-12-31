import { Lang } from "../types";
import { toLowerCamel, toUpperCamel } from "../utils";

export interface Parameters {
  moduleName: Lang.Java.ModuleName;
  properties: Lang.Java.Properties;
}

const mapperGenerator = (params: Parameters) => {
  const { moduleName, properties } = params;

  const type = toUpperCamel(moduleName);
  const typeVar = toLowerCamel(moduleName);

  return (
    `public interface ${moduleName} {\n` +
    `\t// 新增\n\tint insert(${type} ${typeVar});\n\n` +
    `\t// 删除\n\tint deleteById(Integer id);\n\n` +
    `\t// 修改\n\tint updateById(${type} ${typeVar});\n\n` +
    `\t// 根据 ID 查询\n\tint selectById(Integer id);\n\n` +
    `\t// 查询所有\n\tList<${type}> selectAll(${type} ${typeVar});\n` +
    `}`
  );
};

export { mapperGenerator };
