import * as _ from 'lodash';

export class PagedResult<T> {
	data: T[] = [];
	previous: string = null;
	next: string = null;
	hasPrevious: boolean = false;
	hasNext: boolean = false;

	constructor(pagedResult: any, type: { new(): T }) {

		Object.keys(pagedResult).map((key) => {
			if (this.hasOwnProperty(key)) {
				this[key] = pagedResult[key];
			}
		});

		if (!this.hasNext) this.next = null;
		if (!this.hasPrevious) this.previous = null;

						console.log(pagedResult);


		this.setData(pagedResult.results, type);
	}

	private setData(results: any[], type: { new(): T }): any {
		results.forEach((result) => {
			let dto: T = new type();
			Object.getOwnPropertyNames(dto).map(k => {
				let value = _.get(result, k);
				if (value) dto[k] = value;
			});
			this.data.push(dto);
		});
	}
}