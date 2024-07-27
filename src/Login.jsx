import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { toast } from 'react-toastify';


 export const Login = () => {
    const [data, setData] = useState({ username: '', password: '' });

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', data);
            if (response.data.success) {
                toast.success('Login successful');
                navigate('/job');
            } else {
                toast.error('Invalid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <div className="input-group">
                    <label>Username:</label>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={data.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={data.password}
                        onChange={handleChange}
                    />
                </div>
                <button className='btn'>Login</button>
            </form>
        </div>
    );
};


