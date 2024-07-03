import React, { useState, useEffect } from 'react';
import { validateFirstName, validateLastName, validateEmail, validatePassword } from '../utils/validationUtils';


const ContactForm = ({ onAddContact, contact }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setEmail(contact.email);
      setPassword(contact.password); 
      setRole(contact.role);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setRole('user');
    }
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    const firstNameError = validateFirstName(firstName);
    const lastNameError = validateLastName(lastName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (firstNameError || lastNameError || emailError || passwordError) {
      setError(firstNameError || lastNameError || emailError || passwordError);
      return;
    }

    const newContact = {
      id: contact ? contact.id : Date.now(),
      firstName,
      lastName,
      email,
      password,
      role,
    };

    onAddContact(newContact);

    if (!contact) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setRole('user');
    }
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md mx-auto">
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
              className="form-radio h-4 w-4 text-blue-500"
            />
            <span className="ml-2 text-gray-700">User</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
              className="form-radio h-4 w-4 text-blue-500"
            />
            <span className="ml-2 text-gray-700">Admin</span>
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {contact ? 'Update Contact' : 'Add Contact'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
