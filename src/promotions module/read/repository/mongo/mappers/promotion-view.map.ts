import * as _ from 'lodash';

import { IDbQueryMap } from './../../interfaces';
import { PromotionViewDto } from './../../../models/dtos';
import { PromotionsPagedQuery } from './../../../models/queries';
import { BaseMap } from './base.map';

export class PromotionViewMap extends BaseMap {

	propertyMap: { [propertyName: string]: string; } = {
		images: 'images.promotional.480x344'
	};

	destination = new PromotionViewDto();
}