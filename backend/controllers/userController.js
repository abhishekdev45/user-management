const User = require("../models/User");
const {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
} = require("../utils/validation");

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a user
// @route   POST /api/users
// @access  Private/Admin
const createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  const errors = {};
  let hasErrors = false;

  const firstNameError = validateFirstName(firstName);
  if (firstNameError) {
    errors.firstName = firstNameError;
    hasErrors = true;
  }

  const lastNameError = validateLastName(lastName);
  if (lastNameError) {
    errors.lastName = lastNameError;
    hasErrors = true;
  }

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
    hasErrors = true;
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
    hasErrors = true;
  }

  if (hasErrors) {
    return res.status(400).json({ errors });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  const { firstName, lastName, email, role } = req.body;

  const errors = {};
  let hasErrors = false;

  const firstNameError = validateFirstName(firstName);
  if (firstNameError) {
    errors.firstName = firstNameError;
    hasErrors = true;
  }

  const lastNameError = validateLastName(lastName);
  if (lastNameError) {
    errors.lastName = lastNameError;
    hasErrors = true;
  }

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
    hasErrors = true;
  }

  if (hasErrors) {
    return res.status(400).json({ errors });
  }

  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.role = role || user.role;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
