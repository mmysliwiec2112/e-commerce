import { useState } from 'react';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Login successful, perform further actions
                console.log('Login successful');
            } else {
                // Login failed, handle the error
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }

        // Reset input fields
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export {LoginScreen};
