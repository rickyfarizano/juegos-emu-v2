import React, { useState, useEffect } from 'react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error al traer los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers((prev) => [...prev, newUser]);
        setName('');
        setEmail('');
        setPassword('');
        setSuccessMessage('Usuario registrado exitosamente!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`http://localhost:5000/api/users/name/${selectedUser}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.name !== selectedUser));
        setSelectedUser(null);
        setSuccessMessage('Usuario borrado exitosamente!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error al borrar el usuario:', error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const response = await fetch(`http://localhost:5000/api/users/name/${selectedUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName, email: editEmail }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user.name === selectedUser ? updatedUser : user)));
        setEditName('');
        setEditEmail('');
        setSuccessMessage('Usuario editado exitosamente!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      <h3>Manage Users</h3>
      <div>
        <select
          value={selectedUser || ''}
          onChange={(e) => {
            const user = users.find((user) => user.name === e.target.value);
            setSelectedUser(user ? user.name : null);
            setEditName(user ? user.name : '');
            setEditEmail(user ? user.email : '');
          }}
        >
          <option value="" disabled>Select a user to manage</option>
          {users.map((user) => (
            <option key={user.name} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={handleDelete} disabled={!selectedUser}>
          Delete User
        </button>
      </div>

      <h3>Edit User</h3>
      <form onSubmit={handleEdit}>
        <div>
          <label htmlFor="editName">Name</label>
          <input
            type="text"
            id="editName"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Edit name"
          />
        </div>
        <div>
          <label htmlFor="editEmail">Email</label>
          <input
            type="email"
            id="editEmail"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="Edit email"
          />
        </div>
        <button type="submit" disabled={!selectedUser}>
          Update User
        </button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default RegisterForm;
