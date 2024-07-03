// Validate First Name
export const validateFirstName = (firstName) => {
    if (!firstName) {
      return "First Name is required";
    } else if (!/^[a-zA-Z]*$/.test(firstName)) {
      return "First Name should only contain alphabetic characters";
    }
    return null;
  };
  
  // Validate Last Name
  export const validateLastName = (lastName) => {
    if (!lastName) {
      return "Last Name is required";
    } else if (!/^[a-zA-Z]*$/.test(lastName)) {
      return "Last Name should only contain alphabetic characters";
    }
    return null;
  };
  
  
  // Validate Email
  export const validateEmail = (email) => {
    if (!email) {
      return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email is invalid";
    }
    return null;
  };
  
  // Validate Password
  export const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    return null;
  };
  