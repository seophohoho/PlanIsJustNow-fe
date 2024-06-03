import { useState } from "react";
import { friendDelete, subCount } from "../store/store";
import { UserOutlined } from '@ant-design/icons';
import { Col, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Avatar } from 'antd';
import obfuscateEmail from "../function/obfuscateEmail";
import ConfirmModal from "./ConfirmModal";
import serverUrl from "../serverConfig";
import handleError from "../function/errorHandler";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TabChildrenComponent(props) {
  const { i, index, user, setRefresh, refresh } = props
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmShow, setConfirmShow] = useState(false);
  const confirmHandleClose = () => { setConfirmShow(false); };

  const handleExploreClick = (email) => {
    const obfuscatedEmail = obfuscateEmail(email); // 이메일 난독화
    navigate(`/${obfuscatedEmail}`);
  };

  const deleteHandler = async (user) => {
    try{
      const response = await axios.post(`${serverUrl}/api/friend/delete`,{ email: user.email },{ withCredentials: true })
      if (response.status === 200) {
        setRefresh(!refresh); // 상태 변경으로 useEffect 트리거
        setConfirmShow(false);
      }
    }
    catch(error){
      handleError(error, navigate);
    }
    setRefresh(!refresh); // 상태 변경으로 useEffect 트리거
  }

  const refuseHandler = async (user) => {
    try{
      const response = await axios.post(`${serverUrl}/api/friend/request-reject`,{ email: user.email },{ withCredentials: true })
      if (response.status === 200) {
        dispatch(subCount())
        setRefresh(!refresh); // 상태 변경으로 useEffect 트리거
      }
    }
    catch(error){
      handleError(error, navigate);
    }
  }

  const acceptHandler = async (user) => {
    try{
      const response = await axios.post(`${serverUrl}/api/friend/request-accept`,{ email: user.email },{ withCredentials: true })
      if (response.status === 200) {
        dispatch(subCount())
        setRefresh(!refresh); // 상태 변경으로 useEffect 트리거
      }
    }
    catch(error){
      handleError(error, navigate);
    }
  }

  return (
    <Row className='section__item-schedule'>
      <ConfirmModal
        confirmShow={confirmShow}
        confirmHandleClose={confirmHandleClose}
        i={index}
        titleMessage={"정말로 하시겠습니까?"}
        Message="삭제하시겠습니까?"
        eventHandler={() => deleteHandler(user)}
      />
      <Col sm={3} className='text-center impo-margin-zero p-zero'>
      </Col>
      <Col sm={1} className='color-darkBlue text-right'>
        <Avatar
          size={64}
          src={user.profile}
          icon={<UserOutlined />}
        />
      </Col>
      <Col sm={2} className='m-auto color-darkBlue p-zero'>
        <p className='color-darkBlue text-left'>{user.nickname}</p>
        <p className='color-violet text-left'>{user.email}</p></Col>
      <Col sm="auto">
        <Button className='font-weight-800'
          onClick={() => i === 0 ? handleExploreClick(user.email) : acceptHandler(user)}
        >{i === 0 ? "살펴보기" : "친구수락"}</Button>

        <Button className='margin-left bg-darkblue font-weight-800'
          onClick={() => i === 0 ? setConfirmShow(true) : refuseHandler(user)}
        >{i === 0 ? "친구삭제" : "거절하기"}</Button>
      </Col>
      <Col sm={3}>
      </Col>
    </Row>
  );
}

export default TabChildrenComponent;
