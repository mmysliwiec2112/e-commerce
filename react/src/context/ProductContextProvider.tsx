import {ProductItem} from "../models/ProductItem";
import {HTMLAttributes, useEffect, useState} from "react";
import {ProductContextType} from "./ProductContext";
import {CartContextType} from "./CartContext";

export type ProductContextProps<TItemType extends ProductItem> = {
    context: React.Context<CartContextType<TItemType>>
} & HTMLAttributes<HTMLDivElement>

export function ProductContextProvider<TItemType extends ProductItem>({
                                                                    children,
                                                                    context
                                                                }: ProductContextProps<TItemType>) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:9000/product");
            const data = await response.json();
            setProducts(data);
        }

        fetchData().catch();
    }, []);

    const handleSubmit = async (event, product) => {
        event.preventDefault();
        const response = await fetch("http://localhost:9000/cart/add", {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        context.addProductToCart(data)
        console.log(context.cart);
    };

    const contextValue: ProductContextType<TItemType> = {
        handleSubmit()
    }

    return <context.Provider value={contextValue}>{children}</context.Provider>
}