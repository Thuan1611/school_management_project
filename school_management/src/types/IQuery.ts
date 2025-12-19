export interface IProductQuery {
    _page?: number; // current page
    _limit?: number; // items per page
    _sort?: string; // dạng "price:asc" hoặc "createdAt:desc"
    q?: string; // search text,
    sex?: string,
    class?:string,
    category?: string; // filter theo category
}
