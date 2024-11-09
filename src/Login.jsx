import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import loadingGif from './giphy.webp';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <img 
                    src={loadingGif} 
                    alt="Loading..." 
                    style={{ width: '150px', height: '150px', justifyContent: 'center' }} 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/placeholder/image.png'; }}
                />
            </div>
        );
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading state to true
        setMessage(''); // Clear previous messages

        try {
            const response = await axios.post('http://localhost:5005/api/auth/login', { username, password });
            setMessage('Login successful!'); // Set success message
            console.log(response.data); // Log the response data
            navigate('/'); // Redirect to the home page after successful login
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response ? error.response.data.message : error.message;
            setMessage('Login failed: ' + errorMessage); // Set error message
        } finally {
            setLoading(false); // Set loading state to false
        }
    }

    const styles = {
        container: {
            textAlign: 'center',
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div style={styles.container}>
                <form onSubmit={handleLogin}>
                    <h1>FlipKart</h1>
                    <input className='me-4 mb-4'
                        type="text"
                        placeholder='Enter your name'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input className='me-4 mb-4'
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary mb-2 me-4">
                        Login
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate("/register")}
                        className="btn btn-success"
                    >
                        To Register
                    </button>
                </form>
                {message && <p>{message}</p>} {/* Display the message if it exists */}
            </div>
        </div>
    );
}

export default Login;