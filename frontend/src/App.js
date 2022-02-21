import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
  <Router className='app'>
    <Routes>
        <Route exact path="/" element={<MainPage/>}/>
        <Route exact path="/login" element={<LoginPage/>}/>
    </Routes>
  </Router>
  </>
  );
}

export default App;