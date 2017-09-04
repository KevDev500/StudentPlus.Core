import { Inject } from '@nestjs/common';
import { IDbQueryMap } from './';

export abstract class DbQueryMapFactory {
	mappers: IDbQueryMap[];
	abstract create<T>(source: { new(obj?): T }): IDbQueryMap;
}