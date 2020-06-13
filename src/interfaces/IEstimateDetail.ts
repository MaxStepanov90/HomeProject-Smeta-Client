export interface IEstimateDetail {
    id: number,
    category: string,
    name: string,
    unit: string,
    quantity: number,
    price: number,
    cost: number,
    priceClient: number,
    costClient: number
    complete?: boolean,

}