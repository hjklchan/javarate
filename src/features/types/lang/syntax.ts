interface Class {
  name: string;
}

interface VariableDefinition {
  dataType: string;
  name: string;
}

interface ClassProperty extends VariableDefinition {
  access: "public" | "private" | "protected" | "finally";
  dataType: string;
  name: string;
}

interface MethodParameter extends VariableDefinition {}
