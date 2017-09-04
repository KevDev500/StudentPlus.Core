export abstract class DbConnection {
	abstract open(): any;
    abstract connect(schema: string): Promise<any>;
    abstract close(): Promise<any>
}