import { Lang } from "../types";

export interface Parameters {
  identities: Lang.Java.Identities;
}

export const serviceGenerator = (params: Parameters) => {
  const {
    identities: {
      naming: { lowerCamel, upperCamel },
    },
  } = params;

  const typeVar = `${upperCamel} ${lowerCamel}`;
  const mapper = (isUpper: boolean) =>
    `${isUpper ? upperCamel : lowerCamel}Mapper`;

  return (
    "@Service\n" +
    `public class ${upperCamel}Service {\n` +
    `\t@Resource\n\tprivate ${mapper(true)} ${mapper(false)};\n\n` +
    // add
    `\t// 新增\n\tpublic void add(${typeVar}) {` +
    `\t\t${mapper(false)}.insert(${lowerCamel});\n` +
    `\t}\n\n` +

    `\t// 删除\n\tpublic void deleteById(Integer id) {\n` +
    `\t\t${mapper(false)}.deleteById(id);` +
    "\t}\n\n"
  );
};
