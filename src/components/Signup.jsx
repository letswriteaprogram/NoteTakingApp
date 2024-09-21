import React, { useState } from "react";
import { signupUser } from "../features/UserSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "./util/Input";
import Button from "./util/Button";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
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
      await dispatch(signupUser({ email, password, name })).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Signup failed", err);
      setErrors({ server: "Signup failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-8 m-4 border-2 border-black rounded-lg">
        <h1 className="text-2xl text-center mb-8">Join us! Sign up today.</h1>

        {errors.server && <p className="text-red-500 text-center">{errors.server}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Username"
            required
            message={errors.name}
          />

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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Signup"}
          </Button>

          <p>
            Already have an account?{" "}
            <Link to="/login" className="cursor-pointer font-semibold">
              Log in
            </Link>{" "}
            here to access your dashboard!
          </p>
        </form>
      </div>
    </section>
  );
}

export default Signup;
