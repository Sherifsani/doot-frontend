import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Todos from "./pages/Todos";
import "./App.css";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const PrivateRoute = ({ element }) => {
    return localStorage.getItem("accessToken") ? (
      element
    ) : (
      <Navigate to="/login" />
    );
  };
  return (
    <main className="josefin-sans-regular">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/todos" />} />
          <Route path="/todos" element={<PrivateRoute element={<Todos />} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
