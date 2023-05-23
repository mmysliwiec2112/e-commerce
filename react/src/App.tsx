import './App.css'
import {PaymentComponent} from "./components/PaymentComponent";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {ProductComponent} from "./components/ProductComponent";
import {Fragment, useContext} from "react";
import {CartContextProvider} from "./context/CartContextProvider";
import {cartContext} from "./context/CartContextProvider";

const MockCartDisplay = () => {
    const context = useContext(cartContext);

    return (
        <div>
            <h2>Cart:</h2>
            {context.cart.map((cartItem, index) => {
                return (
                    <div key={index}>
                        <h2>{cartItem.item.title}</h2>
                        <p> {cartItem.item.price}</p>
                        <button onClick={() => context.removeProductFromCart(cartItem.item)}>
                            Remove from Cart
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <Fragment> <ProductComponent/>
                            <div>
                                <Link to={"/koszyk"}>Koszyk</Link>
                            </div>
                        </Fragment>}/>
                    <Route path="/koszyk" element={<CartContextProvider context={cartContext}>
                        <MockCartDisplay/>
                    </CartContextProvider>}/>
                    <Route path="/platnosci" element={<PaymentComponent/>}/>
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App;
