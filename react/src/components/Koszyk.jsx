import {useState} from "react";
// import PropTypes from "prop-types";
import {Produkty} from "./Produkty.jsx";

function Koszyk() {
    const [cart, setCart] = useState([]);
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };


    return (
        <div>
            <Produkty addToCart={addToCart} />
            <h2>Koszyk:</h2>
            <ul>
                {cart.map((product) => (
                    <li key={product.id}>
                        {product.title}: {product.price} PLN - {product.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// TODO: podpiąć płatności pod back i zrobić widok Koszyka
// TODO: przesłać dane przez react hooks
// TODO: 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz kliencką na dockerze via docker-compose
export{Koszyk}