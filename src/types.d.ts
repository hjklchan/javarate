export interface DBField {
  name: string;
  comment?: string;
  type: string;
  characterSet?: string;
  isNull?: boolean;
  defaultValue?: string;
  // ...
}

export namespace Lang {
  export namespace Java {
    export type ModuleName = string;
    export type Property = {name: string, type: string, comment?: string};
    export type Properties = Property[];

    export interface Identities {
      naming: {
        lowerCamel: string;
        upperCamel: string;
      }
    }
  }
}

export interface JavaIdentity {
  moduleName: string;
  properties: [];
}
