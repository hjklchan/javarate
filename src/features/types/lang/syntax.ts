export interface Class {
  name: string;
}

export interface Comment {
  comment?: string;
}

export interface VariableDefinition extends Comment {
  dataType: string;
  name: string;
}

export interface ClassProperty extends VariableDefinition {
  access: "public" | "private" | "protected" | "finally";
  dataType: string;
  name: string;
}

export interface MethodParameter extends VariableDefinition {}
