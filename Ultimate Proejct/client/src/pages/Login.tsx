import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            alert('Login failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full p-2 mb-2 border" />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="w-full p-2 mb-2 border" />
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
        </form>
    );
};

export default Login;