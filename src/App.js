import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Signup from './pages/SignUp';
import SignUpPet from './pages/SignUpPet';
import Login from './pages/Login'
import CalendarMain from './pages/CalendarMain';
import FriendBoard from './pages/FriendsBoard'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import serverUrl from './serverConfig';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(()=>{//어느 페이지로 이동하든 
      axios.get(`${serverUrl}/api/user/has-pet`
      ,{withCredentials: true})
      .then((response)=>{
          if(response.data.messageDetail === "has"){
              navigate('/calendar')//로그인 상태 + 펫있음
          }else if(response.data.messageDetail === "nothing"){
              navigate('/signup-pet')//로그인 상태 + 펫
          }
      })
      .catch((error) => {
          if(error.response.status === 401){//토큰 만료 리다이렉트
              console.log("?" + error.status)
              alert("로그인을 다시해주세요!")
              navigate('/')
          }
      })
  },[])//렌더링 최초 1회 

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/Calendar' element={<CalendarMain/>}/>
        <Route path='/friend-board' element={<FriendBoard/>}/>
        <Route path='/signup-pet' element={<SignUpPet/>}/>
        <Route path="*" element={ <div>잘못된 경로입니다!</div> }/>
      </Routes>
    </>
  );
}

export default App;