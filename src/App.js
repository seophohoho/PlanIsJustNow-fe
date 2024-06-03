import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import serverUrl from './serverConfig';
import CalendarLoading from './components/CalendarLoading';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import './index.css'
import './styles/CalendarMain.css'
import ErrorComponent from './components/ErrorComponent';

const Signup = lazy(()=>import('./pages/SignUp'));
const SignUpPet = lazy(()=>import('./pages/SignUpPet'));
const Login = lazy(() => import('./pages/Login'));
const CalendarMain = lazy(()=>import('./pages/CalendarMain'));
const FriendBoard = lazy(()=>import('./pages/FriendsBoard'));
const Petdex = lazy(()=>import('./pages/Petdex'));
const FindPassword = lazy(()=>import('./pages/FindPassword'));
const FriendDetail = lazy(()=>import('./pages/FriendDetail'));

function App() {
  
  const location = useLocation();
  return (
    <>
    <Suspense fallback={<CalendarLoading/>}>
      <Routes key={location.pathname}>
        <Route path='/' element={<CalendarMain/>}/>
        <Route path='/connect-status' element={<ErrorComponent/>}/>
        <Route path='/test' element={<CalendarLoading/>}/>
        <Route path='/sign-in' element={<Login/>}/> {/* nested route -> id,password 찾기? */}
        <Route path='/reset-password' element={<FindPassword/>}/>
        <Route path='/petdex' element={<Petdex/>}/> {/* calendar -> nest? */}
        <Route path='/friend-board' element={<FriendBoard/>}/> {/* calendar -> nest? */}
        <Route path="/:obfuscatedEmail" element={<FriendDetail />} />
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/signup-pet' element={<SignUpPet/>}/> {/* signup -> nest? */}
        <Route path="*" element={ <div>잘못된 경로입니다!</div> }/>
      </Routes>
      </Suspense>
    </>
  );
}

export default App;