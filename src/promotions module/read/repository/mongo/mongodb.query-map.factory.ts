import { Inject } from '@nestjs/common';
import * as _ from 'lodash';

import { IDbQueryMap, DbQueryMapFactory } from './../interfaces';

export class MongoDbQueryMapFactory extends DbQueryMapFactory {

	constructor(@Inject('mongodbQueryMaps') public mappers: IDbQueryMap[]) {
		super();
	}

	create<T>(destination: { new(obj?): T }): IDbQueryMap {
		let mapper = this.mappers.find((mapper) => _.isEqual(mapper.destination, new destination()));

		if (!mapper)
			throw new ReferenceError(`No mongodb entity mapper registered for type ${typeof (new destination())}`)

		return mapper;
	}
}