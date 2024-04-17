import { useState } from "react";
import { friendDelete, friendRefuse, friendAccept } from "../store/store";
import { UserOutlined } from '@ant-design/icons';
import { Col, Row, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Avatar } from 'antd';
import ConfirmModal from "./ConfirmModal";

function TabChildrenComponent(props){ 
    const state = useSelector((state)=>state.friendList)
    const {i, index, user, list} = props
    const dispatch = useDispatch();

    const [confirmShow, setConfirmShow] = useState(false);
    const confirmHandleClose = ()=>{setConfirmShow(false);}
    
    // axios 요청 결과에 따라 then, catch로 함수 동작 결정
    function deleteHandler(list, index){
        setConfirmShow(false)
        dispatch(friendDelete({list, index}));//친구목록삭제
    }
    function refuseHandler(list, index){
      dispatch(friendRefuse({list, index}))
    }
    function acceptHandler(){
      dispatch(friendAccept())
    }
    return(
      <Row className='section__item-schedule'>
            <ConfirmModal 
                confirmShow={confirmShow} 
                confirmHandleClose={confirmHandleClose} 
                i={index} 
                Message="정말로 제거하시겠습니까?"
                eventHandler={() => deleteHandler(list, props.index)}
            />
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
              onClick={() => i === 0 ? setConfirmShow(true) : refuseHandler(list, index)}
              >{i === 0 ? "친구삭제" : "거절하기"}</Button>
            </Col>
            <Col sm={3}>
            </Col>
      </Row>
    );
  }
  
  export default TabChildrenComponent