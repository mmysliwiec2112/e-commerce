import './App.css'
import {PaymentComponent} from "./components/PaymentComponent";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {ProductComponent} from "./components/ProductComponent";
import {LoginScreenComponent} from "./components/LoginScreenComponent";
import {useContext} from "react";
import {CartContextProvider} from "./context/CartContextProvider";
import {CartContext} from "./context/CartContext";
import {CartComponent} from "./components/CartComponent";
const MockCartDisplay = () => {
    const context = useContext(CartContext);
    return (
        <div>
            <h2>Cart:</h2>
            {context.cart.map((cartItem, index) => {
                return (
                    <div key={index}>
                        <h2>{cartItem.title}</h2>
                        <p> {cartItem.price}</p>
                        <button onClick={() => context.removeProductFromCart(cartItem)}>
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
        <CartContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <> <ProductComponent/>
                            <div>
                                <Link to={"/koszyk"}>Koszyk</Link>
                            </div>
                        </>}/>
                    <Route path="/koszyk" element={
                        <>
                        <CartComponent/>
                        <MockCartDisplay/>
                        </>
                    }/>
                    <Route path="/loginscreen" element={<LoginScreenComponent/>}/>
                    <Route path="/signupscreen" element={<LoginScreenComponent/>}/>
                    <Route path="/platnosci" element={<PaymentComponent/>}/>
                </Routes>
            </BrowserRouter>
        </CartContextProvider>
    );
}

export default App;
