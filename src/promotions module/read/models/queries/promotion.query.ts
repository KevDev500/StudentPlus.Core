export class PromotionQuery {

    query: any[];

    constructor(public readonly id: string) {

        let query: any = {};

        Object.getOwnPropertyNames(this)
            .filter(prop => prop != 'query')
            .map(prop => query[prop] = this[prop]);

        this.query = query;
    }
}