import { useState } from "react";
import { friendDelete, friendRefuse, friendAccept } from "../store/store";
import { TeamOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import {Col, Row, Stack, Button, Form} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Tabs, Avatar } from 'antd';
import ConfirmModal from "./ConfirmModal";

function TabChildrenComponent(props){ 
    const state = useSelector((state)=>state.friendList)
    const {i, index, user, list} = props
    const dispatch = useDispatch();

    const [confirmShow, setConfirmShow] = useState(false);
    const confirmHandleClose = ()=>{setConfirmShow(false);}
    const confirmHandler = (e)=>{setConfirmShow(e)};

    const [Message, setMessage] = useState("일정 완료를 결정하시면 이전 상태로 돌아갈 수 없습니다!")
  
    function deleteHandler(list, index){
      console.log(list, index)
      dispatch(friendDelete({list, index}))
    }
  
    function refuseHandler(list, index){
      dispatch(friendRefuse({list, index}))
    }
    function acceptHandler(){
      dispatch(friendAccept())
    }
    return(
      <Row className='section__item-schedule'>
            <ConfirmModal confirmShow={confirmShow} confirmHandleClose={confirmHandleClose} i={index} Message={Message}/>
            <Col sm={3} className='text-center impo-margin-zero p-zero'>
            </Col>
            <Col sm={1} className='color-darkBlue text-right'>
              <Avatar className='' size={64} icon={<UserOutlined/>} />
            </Col>
            <Col sm={2} className='m-auto color-darkBlue p-zero'>
              <p className='color-darkBlue text-left'>{user.userName}</p>
              <p className='color-violet text-left'>{user.userEmail}</p></Col>
            <Col sm="auto">
              <Button className='font-weight-800'
              onClick={i === 0 ? undefined : undefined}
              >{i === 0 ? "살펴보기" : "친구수락"}</Button>
              
              <Button className='margin-left bg-darkblue font-weight-800'
              onClick={() => i === 0 ? deleteHandler(list, index) : refuseHandler(list, index)}
              >{i === 0 ? "친구삭제" : "거절하기"}</Button>
            </Col>
            <Col sm={3}>
            </Col>
      </Row>
    );
  }
  
  export default TabChildrenComponent