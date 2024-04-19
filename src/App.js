import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './pages/SignUp';
import SignUpPet from './pages/SignUpPet';
import Login from './pages/Login'
import CalendarMain from './pages/CalendarMain';
import FriendBoard from './pages/FriendsBoard';
import Petdex from './pages/Petdex';
import axios from 'axios';
import serverUrl from './serverConfig';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { petListInit } from './store/store';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //페이지마다 할당으로 변경 삭제 예정
  
  useEffect(()=>{//어느 페이지로 이동하든 
    axios.get(`${serverUrl}/api/user/has-pet`
    ,{withCredentials: true})
    .then((response)=>{
        if(response.data.messageDetail === "nothing"){
          alert("사용자의 펫이 정해지지 않은 상태입니다!")
          navigate('/signup-pet')//로그인 상태 + 펫
        }
    })
    .catch((error) => {
      if(error.response){ // 런타임 에러방지 error.response가 있는지 먼저 확인함
          if(error.response.status === 401) { // 토큰 만료 리다이렉트
              console.log("Error status: " + error.response.status);
              alert("로그인을 다시해주세요!");
              navigate('/');
          }
          else{
            alert("서버와 연결에 실패했습니다.");
          }
      }
      else{
          console.error("Error: ", error);
          if(error.message) {
            alert("에러: " + error.message);
          }
          else{
            alert("알 수 없는 에러가 발생했습니다.");
          }
      }
    })
  },[])// ignore Warnning: Check token validity on mount(redirect)

  useEffect(()=>{//mount시 펫 정보 초기화
    axios.get(`${serverUrl}/api/user/all-pet-info`,
    {withCredentials: true})
    .then(response=>{
        dispatch(petListInit(response.data))
    })
    .catch((error) => {
        if(error.response){ // 런타임 에러방지 error.response가 있는지 먼저 확인함
            if(error.response.status === 401) { // 토큰 만료 리다이렉트
                console.log("Error status: " + error.response.status);
                alert("로그인을 다시해주세요!");
                navigate('/');
            }
            else{
              alert("서버와 연결에 실패했습니다.");
            }
        }
        else{
            console.error("Error: ", error);
            if(error.message) {
              alert("에러: " + error.message);
            }
            else{
              alert("알 수 없는 에러가 발생했습니다.");
            }
        }
      })
    //petlist init dispatch
  },[])

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/> {/* nested route 필요 -> id,password 찾기 */}
        <Route path='/petdex' element={<Petdex/>}/> {/* calendar -> nest? */}
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/Calendar' element={<CalendarMain/>}/>
        <Route path='/friend-board' element={<FriendBoard/>}/> {/* calendar -> nest? */}
        <Route path='/signup-pet' element={<SignUpPet/>}/> {/* signup -> nest */}
        <Route path="*" element={ <div>잘못된 경로입니다!</div> }/>
      </Routes>
    </>
  );
}

export default App;