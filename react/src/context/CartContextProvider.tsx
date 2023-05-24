import {CartItem, CartItemList} from "../models/CartItem";
import {CartContextType, CartContext} from "./CartContext";
import {HTMLAttributes, useState} from "react";
import {ProductItem} from "../models/ProductItem";

export type CartContextProps<TItemType extends CartItem> = {
    context: React.Context<CartContextType<TItemType>>
} & HTMLAttributes<HTMLDivElement>

export function CartContextProvider<TItemType extends CartItem>({
                                                                    children,
                                                                }) {
    const [cart, setCart] = useState<ProductItem[]>([])
    const getProductById = (product: ProductItem): ProductItem | undefined => {
        return cart.find((p) => p.id === product.id)
    }
    const addProductToCart = (product: ProductItem): void => {
        {
            console.log(product)
            const existingProduct = getProductById(product)
            if (existingProduct) {
                setCart((prevItems) =>
                    prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: + 1 }
                        : item
                )
            )
            } else {
                setCart((items) => [...items, {...product, quantity: 1}])
            }

        }
    }
    const removeProductFromCart = (product: TItemType) => {
        const newProducts = cart.filter(p => p.id !== product.id)
        setCart(newProducts)
    }
    const contextValue: CartContextType<TItemType> = {
        cart: cart,
        addProductToCart,
        removeProductFromCart
    }
    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export default CartContextProvider
