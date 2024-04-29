import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './pages/SignUp';
import SignUpPet from './pages/SignUpPet';
import Login from './pages/Login'
import CalendarMain from './pages/CalendarMain';
import FriendBoard from './pages/FriendsBoard';
import Petdex from './pages/Petdex';
import FindPassword from './pages/FindPassword';
import axios from 'axios';
import serverUrl from './serverConfig';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/> {/* nested route -> id,password 찾기? */}
        <Route path='/reset-password' element={<FindPassword/>}></Route>
        <Route path='/Calendar' element={<CalendarMain/>}/>
        <Route path='/petdex' element={<Petdex/>}/> {/* calendar -> nest? */}
        <Route path='/friend-board' element={<FriendBoard/>}/> {/* calendar -> nest? */}
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/signup-pet' element={<SignUpPet/>}/> {/* signup -> nest? */}
        <Route path="*" element={ <div>잘못된 경로입니다!</div> }/>
      </Routes>
    </>
  );
}

export default App;