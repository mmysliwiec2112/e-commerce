import {CartItem, CartItemList} from "../models/CartItem";
import {createContext} from "react";

export interface CartContextType<TItemType extends CartItem> {

    cart: CartItemList<TItemType>[]

    addProductToCart: (item: CartItemList<TItemType>) => void

    removeProductFromCart: (item: TItemType) => void
}

const defaultContext: CartContextType<any> = {
    cart: [],
    addProductToCart: () => {},
    removeProductFromCart: () => {}
}
export function CreateCartContext<TItemType extends CartItem>() {
    return createContext < CartContextType < TItemType >> (defaultContext)
}