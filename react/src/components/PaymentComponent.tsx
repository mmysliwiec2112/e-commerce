import { useState } from "react";
function PaymentComponent() {
    const [formData, setFormData] = useState({
        name: "",
        cardNumber: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:9000/payment", {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Formularz płatności:</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Imię:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Numer karty:
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Zapłać</button>
            </form>
        </div>
    );
}

export { PaymentComponent };