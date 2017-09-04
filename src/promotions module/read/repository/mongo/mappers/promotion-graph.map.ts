import { PromotionGraphDto } from './../../../models/dtos';
import { BaseMap } from './base.map';

export class PromotionGraphMap extends BaseMap {

	propertyMap: { [propertyName: string]: string; } = {
		images: 'images.promotional.480x344',
		partnerName: 'partner.name',
		partnerId: 'partner.id'
	};

	destination = new PromotionGraphDto();
}