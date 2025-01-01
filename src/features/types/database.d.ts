
export interface Column {
    name: string;
    comment?: string;
    dataType: string;
    length?: number;
    point?: number;
    isNull: boolean;
    defaultValue?: string;
}

export interface Table {
    name: string;
    columns: Column[];
    primaryKey: string | "id";
    comment?: string;
}