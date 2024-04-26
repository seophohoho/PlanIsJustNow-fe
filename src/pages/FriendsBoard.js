import { useState, useEffect } from "react";
import {Col, Row, Stack, Button, Form} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Tabs, Avatar } from 'antd';
import { TeamOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { friendDelete, friendRefuse, friendAccept } from "../store/store";
import NavbarComponent from "../components/NavbarComponent";
import TabChildrenComponent from "../components/TabChildrenConponent";
import axios from "axios";
import serverUrl from "../serverConfig.js";
import { useNavigate } from "react-router-dom";

function FriendBoard() {
  const state = useSelector((state)=>state.friendList)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(()=>{
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


  return (
    <>
    <header>
      <NavbarComponent/>
    </header>
    <body className="beak-point">
    <Tabs
      className="m-auto text-center"
      defaultActiveKey="0"/*tab 최초 시작지점*/
      items={[TeamOutlined, UserAddOutlined].map((Icon, i) => {
        const id = String(i + 1);
        const tabTitle = ["친구목록", "친구추가"]
        return {
          key: id,
          label: tabTitle[i],
          children: 
          <Stack gap={3}>{/*redux state와 i에 따라 map*/}
            {i === 0 ? 
              <Form.Group as={Row} className="mb-4">
                      <Col sm={3}></Col>
                      <Col className='mb-3 m-auto' sm={3}>{/** input칸 */}
                      <Form.Control
                        type="eamil" 
                        className='form-Control'
                        placeholder='Friend@email.com'
                        onChange={(e)=>{console.log(e.target.value)}
                      }/>
                      </Col>
                      <Col sm="auto">
                        <Button onClick={(e)=>{}}>친구요청</Button>
                      </Col>
                      <Col sm={3}></Col>
              </Form.Group>
            : ""}
            {//tab1,2에 따라 다르게 목록을 출력
                state[i === 0 ? "userList" : "userRequest"].map((user, index) => {
                  return (
                    <TabChildrenComponent key={index} i={i} index={index} user={user} list={i === 0 ? "userList" : "userRequest"}/>
                  );
                })
            }
          </Stack>,
          icon: <Icon />,
        };
      })}
    />
    </body>
    <footer>
    </footer>
    </>
    );
}


export default FriendBoard;