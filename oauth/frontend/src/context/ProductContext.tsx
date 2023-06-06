import {ProductItem, ProductItemList} from "../models/ProductItem";
import {createContext} from "react";

export interface ProductContextType<ProductItem> {

    productList: ProductItemList<ProductItem>[]
    handleSubmit: (event, product) => void
}

const defaultContext: ProductContextType<any> = {
    productList: [],
    handleSubmit: () => {}
}
export function CreateProductContext() {
    return createContext (defaultContext)
}