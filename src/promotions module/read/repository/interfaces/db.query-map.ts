export interface IDbQueryMap {
	destination: any;
	propertyMap: { [propertyName: string]: string; };
	map<T>(source: any): {};
	reverseMap<T>(source: any): {};
}