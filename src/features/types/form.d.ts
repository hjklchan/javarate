
export interface DbColumn {
    name: string;
    comment?: string;
    dataType: string;
    isNull?: boolean
    defaultValue?: string;
}

export interface Form {
    tableName: string;
    comment?: string;
    columns: DbColumn[];
    primaryKey?: string;
}