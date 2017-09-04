import { Module } from '@nestjs/common';

import { PromotionsModule } from './promotions module/promotions.module';
import { UsersModule } from './users module/users.module';

@Module({
	modules: [
		PromotionsModule,
		UsersModule
	]
})
export class ApplicationModule { }