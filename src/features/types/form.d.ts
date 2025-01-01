
export interface DbColumn {
    name: string;
    comment?: string;
    dataType: string;
    length?: number;
    point?: number;
    isNull?: boolean
    defaultValue?: string;
}

export interface Form {
    tableName: string;
    comment?: string;
    columns: DbColumn[];
    primaryKey?: string;
}