import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      
      localStorage.setItem("accessToken", res.data.data.accessToken);
      navigate("/todos");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white p-8 rounded-2xl w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-sm hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            register instead
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
