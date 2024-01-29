import { Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/SignUp';
import SignUpPet from './pages/SignUpPet';
import Login from './pages/Login'

function App() {
  return (
    <>
    <Login/>
    
    <Routes>
      <Route path='/signup' element={Signup}/>
    </Routes>
    </>
  );
}

export default App;