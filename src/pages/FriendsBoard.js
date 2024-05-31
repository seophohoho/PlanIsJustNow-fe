import { useState, useEffect } from "react";
import {Col, Row, Stack, Button, Form} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Tabs, Avatar } from 'antd';
import { TeamOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { friendDelete, initFriendList, initFriendRequest, userDataInit } from "../store/store";
import handleError from "../function/errorHandler.js";
import NavbarComponent from "../components/NavbarComponent";
import TabChildrenComponent from "../components/TabChildrenConponent";
import axios from "axios";
import serverUrl from "../serverConfig.js";
import { useNavigate } from "react-router-dom";

function FriendBoard() {
  const stateFriendList = useSelector((state) => state.friendList);
  const stateFriendRequest = useSelector((state) => state.friendsRequest);
  const userDataState = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [requestEmail, setRequestEmail] = useState("");
  // 친구 목록, 친구 요청 handler 작동시 업데이트 요청 state
  const [refresh, setRefresh] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const friendListResponse = await axios.get(`${serverUrl}/api/friend/select`, { withCredentials: true });
        if (friendListResponse.status === 200) {
          dispatch(initFriendList(friendListResponse.data.data));
        }

        const friendRequestResponse = await axios.get(`${serverUrl}/api/friend/request-select`, { withCredentials: true });
        if (friendRequestResponse.status === 200) {
          dispatch(initFriendRequest(friendRequestResponse.data.data));
        }

        const userResponse = await axios.get(`${serverUrl}/api/user/has-pet`, { withCredentials: true });
        if (userResponse.data.messageDetail === "nothing") {
          alert("사용자의 펫이 정해지지 않은 상태입니다!");
          navigate('/signup-pet'); // 로그인 상태 + 펫
        } else {
          dispatch(userDataInit(userResponse.data.userInfo));
        }
      } catch (error) {
        handleError(error, navigate);
      }
    };

    fetchData();
  }, [refresh]); // refresh 상태가 변경될 때마다 useEffect 실행

  const friendRequestHandler = async () => {
    try{
      if(requestEmail.length === 0){
        alert("입력란을 비워둘 수 없습니다!")
      }
      else{
        const response = await axios.post(`${serverUrl}/api/friend/request`, { "email": requestEmail }, { withCredentials: true })
        if (response.status === 200) {
          alert("친구요청이 완료되었습니다!");
          setRefresh(!refresh); // 상태 변경으로 useEffect 트리거
        } 
      }
    }
    catch(error){
      if (error.response && error.response.data && error.response.data.messageDetail) {
        if (error.response.data.messageDetail === "Self Request error") {
          alert("본인에게 친구추가를 할 수 없습니다!")
        } else if (error.response.data.messageDetail === "Exist Request error") {
          alert("이미 친구 요청 대기중인 상대입니다.")
        } else if (error.response.data.messageDetail === "Exist Target Request error") {
          alert("상대에게 온 친구요청이 이미 존재합니다.")
        } else if (error.response.data.messageDetail === "Exist Friend error") {
          alert("이미 친구 상태인 대상입니다!")
        } else if (error.response.data.messageDetail === "Not Exist User"){
          alert("존재하지 않는 유저입니다!")
        }
          else {
          handleError(error, navigate);
        }
      } else {
        handleError(error, navigate);
      }
    }
  }
  

  return (
    <>
      <header>
        <NavbarComponent userData={userDataState} />
      </header>
      <body className="beak-point">
        <Tabs
          className="m-auto text-center"
          defaultActiveKey="0"
          items={[TeamOutlined, UserAddOutlined].map((Icon, i) => {
            const id = String(i + 1);
            const tabTitle = ["친구목록", "친구추가"];
            const list = i === 0 ? stateFriendList : stateFriendRequest;
            return {
              key: id,
              label: tabTitle[i],
              children: (
                <Stack gap={3}>
                  {i === 0 && (
                    <Form.Group as={Row} className="mb-4">
                      <Col sm={3}></Col>
                      <Col className="mb-3 m-auto" sm={3}>
                        <Form.Control
                          type="email"
                          className="form-Control"
                          placeholder="Friend@email.com"
                          onChange={(e) => {
                            setRequestEmail(e.target.value);
                          }}
                        />
                      </Col>
                      <Col sm="auto">
                        <Button onClick={friendRequestHandler}>친구요청</Button>
                      </Col>
                      <Col sm={3}></Col>
                    </Form.Group>
                  )}
                  {list && list.length > 0 ? (
                    list.map((user, index) => (
                      <TabChildrenComponent key={index} i={i} index={index} user={user} setRefresh={setRefresh} refresh={refresh} />
                    ))
                  ) : (
                    <div className="color-violet m-top-5em">조용합니다... 너무조용해요</div>
                  )}
                </Stack>
              ),
              icon: <Icon />,
            };
          })}
        />
      </body>
      <footer></footer>
    </>
  );
}

export default FriendBoard;