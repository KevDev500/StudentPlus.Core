export class PromotionViewDto {

	title: string = '';
	images: string[] = [];

	constructor(obj?: any) {

		this.title = '';
		this.images = [];

		if (!obj) { return; }

		Object.keys(obj).map((key) => {
			if (this.hasOwnProperty(key)) {
				this[key] = obj[key];
			}
		});
	}
}