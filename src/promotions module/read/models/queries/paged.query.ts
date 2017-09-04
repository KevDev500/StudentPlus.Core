export abstract class PagedQuery {

    sortAscending = false;
    fields: any;
    limit: number;
    query: any;
    paginatedField: string;
    next: string;
    previous: string;

    constructor(obj) {
        if (obj) {
            this.limit = +obj.limit || undefined;
            this.query = obj.query || undefined;
            this.paginatedField = obj.paginatedField || undefined;
            this.next = obj.next || undefined;
            this.previous = obj.previous || undefined;
            this.sortAscending = !!obj.sortAscending;
        }
    }
}