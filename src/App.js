import { Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/SignUp';
import SignUpPet from './pages/SignUpPet';
import Login from './pages/Login'
import CalendarMain from './pages/CalendarMain';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/Calendar' element={<CalendarMain/>}/>
        <Route path="*" element={ <div>잘못된 경로입니다!</div> } />
      </Routes>
    </>
  );
}

export default App;