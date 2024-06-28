import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile'
import Home from './pages/home/Home'
import Register from './pages/Register/Register'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const {user}= useContext(AuthContext);
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={user? <Home /> : <Register/>} />
        <Route path="/login" element={user ? <Navigate to ="/"/> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App;
