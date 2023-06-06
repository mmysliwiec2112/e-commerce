import {useState, useEffect, Fragment, useContext} from "react";
import {CartContext} from "../context/CartContext";
function ProductComponent() {
    const context = useContext(CartContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:8000/product");
            const data = await response.json();
            setProducts(data);
        }

        fetchData().catch();
    }, []);

    const handleSubmit = async (event, product) => {
        event.preventDefault();
        const response = await fetch("http://localhost:8000/cart/add", {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
        context.addProductToCart(data)
        console.log(context.cart.map((product) => {console.log(product)}))
    };

    return (
        <Fragment><h1>Lista produktów:</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.title}: {product.price} PLN - {product.description}
                        <br/>
                        <button onClick={(event) => handleSubmit(event, product)}>
                            Dodaj do koszyka
                        </button>
                    </li>
                ))}
            </ul>
        </Fragment>

    );
}

export {ProductComponent};