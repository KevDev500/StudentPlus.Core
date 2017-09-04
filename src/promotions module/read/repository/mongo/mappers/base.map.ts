import * as _ from 'lodash';

import { IDbQueryMap } from './../../interfaces';

export abstract class BaseMap implements IDbQueryMap {

	abstract propertyMap: { [propertyName: string]: string; };
	abstract destination: any;

	map(source: any): {} {
		let projectionFields: { [name: string]: number } = {}

		Object.getOwnPropertyNames(this.destination).map(prop => {
			let field = this.propertyMap[prop] || prop
			projectionFields[field] = 1;
		});

		source.fields = projectionFields;
		return source;
	}

	reverseMap(source: any | any[]) {
		if (!source) return source;
		if (!source.results) this.resetMappedProperties(source);
		else source.results.forEach(s => this.resetMappedProperties(s));
		return source;
	}

	private resetMappedProperties(result) {
		Object.getOwnPropertyNames(this.propertyMap).map(k => {
			let value = _.get(result, this.propertyMap[k]);
			if (value) result[k] = value;
		});
	}
}