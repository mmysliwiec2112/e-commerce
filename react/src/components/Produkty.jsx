import { Fragment, useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Produkty({addToCart}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:9000/product");
            const data = await response.json();
            setProducts(data);
        }
        fetchData();
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
        console.log(data);
        addToCart(product);
    };

    return (
        <Fragment>
            <h1>Lista produktów:</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.title}: {product.price} PLN - {product.description}
                        <br />
                        <button onClick={(event) => handleSubmit(event, product)}>
                            Dodaj do koszyka
                        </button>
                    </li>
                ))}
            </ul>

        </Fragment>
    );
}

export {Produkty}