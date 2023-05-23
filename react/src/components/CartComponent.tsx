import {useContext} from "react";
import {CreateCartContext} from "../context/CartContext";
import {ProductItem} from "../models/ProductItem";

const contextObject = CreateCartContext<ProductItem>();
function CartComponent() {
    const MockCartDisplay = () => {
        const context = useContext(contextObject)
        return (
            <div>
                <h2>Cart:</h2>
                {context.cart.map((cartItem, index) => {
                    return (
                        <div key={index}>
                            <h2>{cartItem.item.title}</h2>
                            <p> {cartItem.item.price}</p>
                            <button
                                onClick={() => context.removeProductFromCart(cartItem.item)}
                            >
                                Remove from Cart
                            </button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export{CartComponent}