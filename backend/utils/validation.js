// utils/validation.js

const validateFirstName = (firstName) => {
    if (!firstName || typeof firstName !== 'string' || firstName.trim().length === 0) {
      return 'First Name is required';
    }
    if (!/^[A-Za-z]+$/.test(firstName.trim())) {
      return 'First Name must only contain letters';
    }
    return null;
  };
  
  const validateLastName = (lastName) => {
    if (!lastName || typeof lastName !== 'string' || lastName.trim().length === 0) {
      return 'Last Name is required';
    }
    if (!/^[A-Za-z]+$/.test(lastName.trim())) {
      return 'Last Name must only contain letters';
    }
    return null;
  };
  
  const validateEmail = (email) => {
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email address';
    }
    return null;
  };
  
  const validatePassword = (password) => {
    if (!password || typeof password !== 'string' || password.trim().length === 0) {
      return 'Password is required';
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      return 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special symbol';
    }
    return null;
  };
  
  module.exports = {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword,
  };
  