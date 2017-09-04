import { Component } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

import { DbQueryMapFactory, DbQuery } from './repository/interfaces';
import { PagedQuery } from './models/queries';
import { PagedResult } from './models/dtos';

@Component()
export class PromotionFinder {

	constructor(
		private readonly query: DbQuery,
		private readonly queryMapFactory: DbQueryMapFactory
	) { }

	searchPaged<T>(query: PagedQuery, type: { new(): T }): Observable<PagedResult<T>> {
		const mapper = this.queryMapFactory.create(type);
		
		let queryParams = mapper.map(query);
		const deferred = this.query.pagedFind('promotions', queryParams);

		return Observable
			.fromPromise(deferred)
			.map((res) => mapper.reverseMap(res))
			.map((res) => new PagedResult<T>(res, type));
	}

	findOne<T>(query: any, type: { new(obj?): T }): Observable<T> {
		const mapper = this.queryMapFactory.create(type);

		let queryParams = mapper.map(query);
		const deferred = this.query.find('promotions', queryParams);

		return Observable
			.fromPromise(deferred)
			.map((res) => mapper.reverseMap(res))
			.map((res) => {
				if (!res) return null;
				return new type(res);
			});
	}
}