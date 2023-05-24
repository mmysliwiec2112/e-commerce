import {CartItem, CartItemList} from "../models/CartItem";
import {createContext} from "react";
import {ProductItem} from "../models/ProductItem";

export interface CartContextType<TItemType extends CartItem> {

    cart: ProductItem[]

    addProductToCart: (item: ProductItem) => void

    removeProductFromCart: (item: TItemType) => void
}

const defaultContext: CartContextType<any> = {
    cart: [],
    addProductToCart: () => {},
    removeProductFromCart: () => {}
}
export const CartContext = createContext<CartContextType<ProductItem>>(defaultContext)