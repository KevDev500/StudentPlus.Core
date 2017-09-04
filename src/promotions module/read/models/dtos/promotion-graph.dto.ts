import * as _ from 'lodash';

export class PromotionGraphDto {

	id: string = '';
	title: string = '';
	images: string[] = [];
	subtitle: string = '';
	discount: string = '';
	partnerName: string = '';
	partnerId: string = '';


	constructor(obj?) {

		if (!obj) return;

		Object.getOwnPropertyNames(this).map(k => {
			let value = _.get(obj, k);
			if (value) this[k] = value;
		});
	}
}