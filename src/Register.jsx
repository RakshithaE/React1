import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import axios from 'axios';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        console.log('Register button is triggered!!');

        try {
            const response = await axios.post('http://localhost:5005/api/auth/register', { username, password });
            setMessage('Registered successfully!'); // Set success message
            console.log(response.data); // Optionally log the response data
            // Navigate to another page or perform other actions
            navigate('/'); // Redirect to login or another page after successful registration
        } catch (error) {
            console.error('Registration error:', error);
            setMessage('Registration failed: ' + (error.response ? error.response.data.message : error.message));
        }
    };
    const styles = {
        container: {
            backgroundColor: '#f0f0f0', // Light gray background
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            margin: 'auto',
        },
        title: {
            color: '#333', // Darker text color
            textAlign: 'center',
            marginBottom: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        input: {
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc', // Light border
            borderRadius: '4px',
            transition: 'border-color 0.3s',
        },
        inputFocus: {
            borderColor: '#007bff', // Blue border on focus
            outline: 'none',
        },
        button: {
            padding: '10px',
            backgroundColor: '#007bff', // Blue button
            color: 'white', // White text
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#0056b3', // Darker blue on hover
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Register</h1>
            <form onSubmit={handleSubmit}>
                <input className='me-4'
                    style={styles.input}
                    type='text' 
                    placeholder='Enter Username' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
                    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
            
                />
                <input
                    style={styles.input} 
                    type='password' 
                    placeholder='Enter Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
                    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
                />
                <button type='submit'
               style={styles.button}
               onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
               onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >Register</button>
                <button type='button' onClick={() => navigate('/')}>Go to Login</button>
            </form>
            {message && <p>{message}</p>} {/* Display the message if it exists */}
        </div>
    );
}

export default Register;