import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PromotionsController } from './gateway/promotions.controller';
import { PromotionFinder } from './read/promotion-finder';
import { DbQuery, DbConnection, DbQueryMapFactory } from './read/repository/interfaces';
import { MongoDbQuery, MongoDbConnection, MongoDbQueryMapFactory } from './read/repository/mongo';
import { PromotionViewMap, PromotionGraphMap } from './read/repository/mongo/mappers';


@Module({
	controllers: [ PromotionsController ],
    components: [ 
		PromotionFinder,
		{ provide: DbQuery, useClass: MongoDbQuery },
		{ provide: DbConnection, useClass: MongoDbConnection },
		{ provide: DbQueryMapFactory, useClass: MongoDbQueryMapFactory },
		{ provide: 'mongodbQueryMaps', useValue: [new PromotionViewMap(), new PromotionGraphMap()] }		
	]
})
export class PromotionsModule {
	constructor() {}
}