import './App.css'
import {Koszyk} from "./components/Koszyk.jsx";
import {Platnosci} from "./components/Platnosci.jsx";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Koszyk/>}/>
                    <Route path="/koszyk" element={<Platnosci/>}/>
                </Routes>
                <div>
                    <Link to={"/koszyk"}>Platnosc</Link>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
