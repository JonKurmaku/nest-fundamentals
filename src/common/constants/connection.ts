export const connection: Connection = {
    CONNECTION_STRING: 'CONNECTION_STRING',
    DB: 'MySQL',
    DBNAME: 'NEST_TEST'
};  

export type Connection = {
    CONNECTION_STRING: string;
    DB: string;
    DBNAME: string;
};