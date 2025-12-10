import './App.css';
import Home from './Home';
import Registration from './Registration';
import Login from './Login';
import Dashboard from './Dashboard';
import ReservationPage from './ReservationPage';
import Settings from './Settings';
import History from './History';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path ="/history" element={<History />}  />  
      </Routes>
    </Router>
  );
}

export default App;
