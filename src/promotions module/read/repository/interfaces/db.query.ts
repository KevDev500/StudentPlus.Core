export abstract class DbQuery {
	abstract pagedFind(schema: string, queryParams): Promise<any>;
	abstract find(schema: string, queryParams): Promise<any>;
}