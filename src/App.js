import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
   <Router> 
         <div>
          <Navbar />
          <ToastContainer />
        </div>
     <Routes>
       <Route path="/" element={<Home/>} />  
       <Route path="/login" element={<Login/>} />  

   </Routes>
   </Router>
  );
}

export default App;
