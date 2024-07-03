
import "./Register.css";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../features/authSlice";
import { toast } from "react-hot-toast";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
} from "../../utils/validationUtils"; 

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.userInfo && auth.userInfo._id) {
      navigate("/dashboard");
    }
  }, [navigate, auth]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    const firstNameError = validateFirstName(user.firstName);
    const lastNameError = validateLastName(user.lastName);
    const emailError = validateEmail(user.email);
    const passwordError = validatePassword(user.password);

    if (firstNameError || lastNameError || emailError || passwordError) {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }

    
    if (user.password !== user.confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    setLoading(true);
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    dispatch(registerUser(newUser))
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("Registration successful!");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message || "Registration failed");
      });
  };

  return (
    <div className="login">
      <div className="login-main">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <span className="login-title">Create Your Account</span>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              required
              placeholder="Enter First Name"
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
              placeholder="Enter Last Name"
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              placeholder="Enter Email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="Enter Password"
              autoComplete="new-password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
            <button type="submit">{loading ? <Loader /> : "Register"}</button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
