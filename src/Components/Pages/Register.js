import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  const createUser = (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();

    const user = {
      name: name,
    };

    const userData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    fetch('http://localhost:3000/api/v1/register', userData)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('id', data.id);
        localStorage.setItem('name', data.name);
        setAlert('Logged in. Redirecting to main page.');
        return data;
      })
      .catch((error) => console.error(error));

    setName('');
    setTimeout(() => {
      setAlert('');
      navigate('/motorcycles');
      window.location.reload();
    }, 1500);
  };
  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={createUser}
        className="flex flex-col bg-gray-300 p-8 gap-4 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <label htmlFor="name" className="hidden">
          Name:
        </label>
        <input
          id="name"
          type="text"
          className="py-2 px-4 border rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-cyan-900 hover:bg-cyan-800 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
      {alert && <span className="text-red-600 mt-2">{alert}</span>}
    </div>
  );
}
export default Login;