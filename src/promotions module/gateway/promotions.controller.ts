import { Controller, Get, Post, HttpStatus, Response, Body, Component, Query, Param } from '@nestjs/common';

import { PromotionsPagedQuery, PromotionQuery } from './../read/models/queries';
import { PromotionFinder } from './../read/promotion-finder';
import { PromotionViewDto, PromotionGraphDto } from './../read/models/dtos';


@Controller('promotions')
export class PromotionsController {

	constructor(public readonly promotionFinder: PromotionFinder) { }

	@Get('paged')
	public async searchPaged( @Response() res, @Query() queryParams) {

		const query = new PromotionsPagedQuery(queryParams);

		this.promotionFinder
			.searchPaged<PromotionViewDto>(query, PromotionViewDto)
			.subscribe((promotions) => res.status(HttpStatus.OK).json(promotions),
			(error) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
	}

	@Get(':id')
	public async get( @Response() res, @Param('id') id: string) {

		const query = new PromotionQuery(id);

		this.promotionFinder
			.findOne<PromotionGraphDto>(query, PromotionGraphDto)
			.subscribe((promotion) => {
				if (!promotion) return res.status(HttpStatus.NOT_FOUND).send();
				else res.status(HttpStatus.OK).json(promotion)
			},
			(error) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
	}
}