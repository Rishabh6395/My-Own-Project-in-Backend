import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'developer' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            navigate('/login');
        } catch (err) {
            alert('Registration failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <input name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 mb-2 border" />
            <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full p-2 mb-2 border" />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="w-full p-2 mb-2 border" />
            <select name="role" onChange={handleChange} className="w-full p-2 mb-2 border">
                <option value="developer">Developer</option>
                <option value="recruiter">Recruiter</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
        </form>
    );
};

export default Register;

