import React, { useEffect, useState } from "react";
import { fetchCurrentUser, loginUser } from "../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "./util/Input";
import Button from "./util/Button";
import Loader from "./util/Loader";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user) {
      navigate("/"); // Navigate if user is already logged in
    }
  }, [auth.user, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({}); // Reset errors on new submission

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/"); // Navigate to the dashboard after successful login
    } catch (err) {
      console.error("Login failed", err);
      setErrors({ server: "Login failed. Please check your credentials." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (auth.loading) {
    return <Loader />; // Show loading component
  }

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-4 m-4 sm:p-8 sm:m-8 border-2 border-black rounded-lg">
        <h1 className="text-2xl text-center mb-8 mt-2">Welcome back! Please log in.</h1>

        {errors.server && <p className="text-red-500 text-center">{errors.server}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
            message={errors.email}
          />

          <div className="relative">
            <Input
              type="password"
              value={password}
              className="w-full"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
              message={errors.password}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Login"}
          </Button>

          <p className="text-center text-md">
            New to our platform?{" "}
            <Link to="/signup" className="cursor-pointer font-semibold">
              Sign up
            </Link>{" "}
            here to get started!
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
