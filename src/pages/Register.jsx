import React, {useState} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:3000/api/auth/register", formData);
        navigate("/login");
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed");
      }
    };
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white p-8 rounded-2xl w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
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
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-sm hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login instead
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
