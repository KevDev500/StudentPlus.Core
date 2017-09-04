import { Component } from '@nestjs/common';
import * as MongoPaging from 'mongo-cursor-pagination';

import { DbQuery, DbConnection } from './../interfaces';

@Component()
export class MongoDbQuery extends DbQuery {

	constructor(private connection: DbConnection) {
		super();
	}

	async pagedFind(schema: string, queryParams): Promise<any> {

		let collection;
		try {
			collection = await this.connection.connect(schema);
		} catch (error) {
			return Promise.reject(`${error} - Mongodb collection connection error`);
		}

		const deferred = new Promise((resolve, reject) => {
			MongoPaging.find(collection, queryParams, (err, result) => {
				if (err) reject(err);
				else resolve(result);
			});
		});

		return deferred;
	}

	async find(schema: string, queryParams): Promise<any> {
		let collection;

		try {
			collection = await this.connection.connect(schema);
		} catch (error) {
			return Promise.reject(`${error} - Mongodb collection connection error`);
		}

		const deferred = new Promise((resolve, reject) => {
			collection.findOne(queryParams.query, queryParams.fields, (err, result) => {
				if (err) reject(err);
				else resolve(result);
			})
		});

		return deferred;
	}

}