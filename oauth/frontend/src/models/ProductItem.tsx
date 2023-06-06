import {CartItem} from "./CartItem";

export interface ProductItem {
    id: string
    title: string
    price: number
    description: string}

export interface ProductItemList<ProductItem> {
    item: ProductItem
}

