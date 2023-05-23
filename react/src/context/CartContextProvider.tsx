import {CartItem, CartItemList} from "../models/CartItem";
import {CartContextType, CreateCartContext} from "./CartContext";
import {HTMLAttributes, useState} from "react";
import {ProductItem} from "../models/ProductItem";

export type CartContextProps<TItemType extends CartItem> = {
    context: React.Context<CartContextType<TItemType>>
} & HTMLAttributes<HTMLDivElement>

export function CartContextProvider<TItemType extends CartItem>({
                                                                    children,
                                                                    context
                                                                }: CartContextProps<TItemType>) {
    const [products, setProducts] = useState<CartItemList<TItemType> []>([])
    const getProductById = (id: string): CartItemList<TItemType> | undefined => {
        return products.find(p => p.item.id === id)
    }
    const addProductToCart = (product: CartItemList<TItemType>): void => {
        {
            const existingProduct = product
            let newState: ({ item: any; price: any } | CartItemList<TItemType>)[] = []
            if (existingProduct) {
                newState = products.map((newProduct) => {
                    if (newProduct.item.id === existingProduct.item.id) {
                        return {
                            item: newProduct.item,
                            price: newProduct.price,
                        }
                    }
                    return newProduct
                })
                setProducts(newState)
            }
            setProducts([...products, product])
        }
    }
    const removeProductFromCart = (product: TItemType) => {
        const newProducts = products.filter(p => p.item.id !== product.id)
        setProducts(newProducts)
    }
    const contextValue: CartContextType<TItemType> = {
        cart: products,
        addProductToCart,
        removeProductFromCart
    }
    return <context.Provider value={contextValue}>{children}</context.Provider>
}
export const cartContext = CreateCartContext<ProductItem>();
