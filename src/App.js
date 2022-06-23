import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

function App() {
  return (
   <Router> 
         <ToastContainer />
     <Routes>
       <Route path="/" element={<Home/>} />  
       <Route path="/login" element={<Login/>} />  

   </Routes>
   </Router>
  );
}

export default App;
