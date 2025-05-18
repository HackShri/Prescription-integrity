import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
    age: '',
    weight: '',
    height: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...form };
      if (form.role === 'patient') {
        payload.age = parseInt(form.age);
        payload.weight = parseFloat(form.weight);
        payload.height = parseFloat(form.height);
      } else {
        delete payload.age;
        delete payload.weight;
        delete payload.height;
      }
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', payload);
      login(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Create Account</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="input-style" required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} type="email" className="input-style" required />
          <input name="password" placeholder="Password" value={form.password} onChange={handleChange} type="password" className="input-style" required />

          <select name="role" value={form.role} onChange={handleChange} className="input-style">
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="shop">Medical Shop Owner</option>
            <option value="admin">Admin</option>
          </select>

          {form.role === 'patient' && (
            <>
              <input name="age" placeholder="Age" value={form.age} onChange={handleChange} type="number" className="input-style" />
              <input name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} type="number" className="input-style" />
              <input name="height" placeholder="Height (cm)" value={form.height} onChange={handleChange} type="number" className="input-style" />
            </>
          )}

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
