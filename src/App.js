import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./PrivateRoutes";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Edit from "./components/Edit/Edit";



function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <ToastContainer />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/" element={<PrivateRoutes component={Home} />} />
      </Routes>
    </Router>
  );
}

export default App;