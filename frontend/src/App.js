import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import TeacherPage from './pages/TeacherPage';
import StudentPage from './pages/StudentPage';
import IndividualQuizPage from './pages/IndividualQuizPage';
import ScorePage from './pages/ScorePage';
import StudentQuizPage from './pages/StudentQuizPage';

function App() {
  return (
    <>
  <Router className='app'>
    <Routes>
        <Route exact path="/" element={<MainPage/>}/>
        <Route exact path="/login" element={<LoginPage/>}/>
        <Route exact path="/teacher" element={<TeacherPage/>}/>
        <Route exact path="/student" element={<StudentPage/>}/>
        <Route exact path="/quiz/:id" element={<IndividualQuizPage/>}/>
        <Route exact path="/score/:id" element={<ScorePage/>}/>
        <Route exact path="/student-quiz/:id" element={<StudentQuizPage/>}/>
    </Routes>
  </Router>
  </>
  );
}

export default App;