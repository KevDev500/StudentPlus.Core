import { Test } from '@nestjs/testing';
import { Res } from '@nestjs/common';
import * as chai from 'chai';
import * as spies from 'chai-spies';
import { Observable } from 'Rxjs/rx';

import { PromotionsController } from './promotions.controller';
import { PromotionFinder } from './../read/promotion-finder';

chai.use(spies);
let should = chai.should(),
	expect = chai.expect,
	assert = chai.assert;

describe("Promotions Controller", () => {

	let spy_has_been_called = false;

	const fakePromotionFinder = {
		searchPaged: () => {
			spy_has_been_called = true;
			return Observable.fromPromise(Promise.resolve({}))
		}
	};

	Test.createTestingModule({
		controllers: [PromotionsController],
		components: [
			{ provide: PromotionFinder, useValue: fakePromotionFinder }
		]
	});

	const target = Test.get<PromotionsController>(PromotionsController);

	describe('the promotion finder service', () => {

		it('should be injected and defined', () => {
			expect(target.promotionFinder).to.exist.and.not.to.be.null;
		});

		describe('when searchPaged is called', () => {

			it('should promotionFinder searchPaged', () => {
				var res = {
					status: () => { return { json: () => { } } }
				};

				target.searchPaged(res, {})
				expect(spy_has_been_called).to.be.true;
			});

		});
	});
});