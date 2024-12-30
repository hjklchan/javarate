
export interface DBField {
  name: string;
  comment?: string;
  type: string;
  characterSet?: string;
  isNull?: boolean;
  defaultValue?: string;
  // ...
}