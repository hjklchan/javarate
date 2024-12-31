
export interface Column {
    name: string;
    comment?: string;
    dataType: string;
    isNull: boolean;
    defaultValue?: string;
}

export interface Table {
    name: string;
    columns: Column[];
    primaryKey: string | "id";
    comment?: string;
}