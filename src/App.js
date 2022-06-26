import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./PrivateRoutes";
import "./App.css";
import Home from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Edit from "./components/EditSlot/EditSlot";
import Booking from "./components/BookingSlot/BookingSlot";
import Request from "./components/RequestSlot/RequestSlot";
import Approve from "./components/ApproveRequest/ApproveRequest";



function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <ToastContainer />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/request" element={<Request />} />
        <Route path="/approve" element={<Approve />} />

        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/" element={<PrivateRoutes component={Home} />} />
      </Routes>
    </Router>
  );
}

export default App;