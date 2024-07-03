import "./Login.css";
import { Tilt } from "react-tilt";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../features/authSlice";
import { toast } from "react-hot-toast";
import { validateEmail, validatePassword } from "../../utils/validationUtils"; 

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
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

  const defaultOptions = {
    reverse: false,
    max: 55,
    perspective: 1000,
    scale: 1.1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    const emailError = validateEmail(user.email);
    const passwordError = validatePassword(user.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setLoading(true);
    dispatch(loginUser(user))
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("Login successful!");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message || "Login failed");
      });
  };

  return (
    <div className="login">
      <div className="login-main">
        <div className="left">
          <Tilt
            options={defaultOptions}
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              className="left-img w-2/3 p-3 md:w-full"
              src="https://res.cloudinary.com/dztkzhtla/image/upload/v1684817261/html%20mailer/bglogin_spn4f2.webp"
              alt=""
            />
          </Tilt>
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <span className="login-title">Login to Your Account</span>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              placeholder="Enter Email"
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="Enter Password"
              autoComplete="current-password"
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
            <button type="submit">{loading ? <Loader /> : "Login"}</button>
            <p>
              Don't have an account? &nbsp; &nbsp;<Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
