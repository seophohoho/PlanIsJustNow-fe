import {Col, Row} from "react-bootstrap"
import React from 'react';
import Marquee from 'react-fast-marquee';
import { useSelector, useDispatch } from "react-redux"
import { EllipsisOutlined, StarTwoTone } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useState } from "react";
import { Checkbox } from "pretty-checkbox-react";
import { scheduleDelete, scheduleComplete } from "../store/store";
import ScheduleEditModal from "./ScheduleEditModal";
import ConfirmModal from "./ConfirmModal";
import axios from "axios";
import serverUrl from "../serverConfig";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

function Schedule(props){
    const state = useSelector((state)=> state)/*자주 쓰는거 변수로 줄여야겠음 --> root로 가져오지마셈 나중에 수정*/
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {i, clickedDate} = props
    /* confirm modal control */
    const [confirmShow, setConfirmShow] = useState(false);
    const confirmHandleClose = ()=>{setConfirmShow(false);}
    const confirmHandler = (e)=>{setConfirmShow(e)};
    /* edit modal control */
    const [editShow, setEditShow] = useState(false);
    const editHandleClose = () => {setEditShow(false);}
    const editHandleShow = () => {setEditShow(true);}
    /* 일정완료 체크박스 당일 확인용 */
    const today = dayjs().format('YYYY-MM-DD');
    const isToday = dayjs(clickedDate).format('YYYY-MM-DD') === today;

    function scheduleDeleteHandler(){
        /* confirm 추가 */
        axios.put(`${serverUrl}/api/todolist/delete`, {
            "idx" : state.dateSchedule[clickedDate][i].idx
        },{withCredentials: true})
        .then((response)=>{
            console.log(response)
            dispatch(scheduleDelete({index : i, clickedDate : clickedDate}))
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
        });
    }

    function confirmEvent(){
        confirmHandleClose();
        axios.post(`${serverUrl}/api/todolist/complete`,
        {idx : state.dateSchedule[clickedDate][i].idx},
        {withCredentials: true})
        .then((response)=>{
          dispatch(scheduleComplete({clickedDate: clickedDate, index: i, package: true }))
        })
        .catch((error) => {
            if(error.response){ // 런타임 에러방지 error.response가 있는지 먼저 확인함
                if(error.response.status === 401) { // 토큰 만료 리다이렉트
                    console.log("Error status: " + error.response.status);
                    alert("로그인을 다시해주세요!");
                    confirmHandleClose();/*모달 닫기*/
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
        });
      }

    const ScheduleState = state.dateSchedule[clickedDate][i];
    
    const defaultItems = [
        { //issue: 현재 <label> 바깥 태그(li) 클릭 시 이벤트가 발생하지 않는 문제 존재
          label: <label className="color-violet" onClick={editHandleShow}>일정 수정</label>,
          key: '0',
        },
        {type: 'divider'},
        {
          label: <label className="color-violet" onClick={scheduleDeleteHandler}>일정 삭제</label>,
          key: '1',
        }
    ]

    const completItems = [
        {
          label: <label className="color-violet" onClick={scheduleDeleteHandler}>일정 삭제</label>,
          key: '1',
        }
    ]
    
    

    return(
        <Row className='section__item-schedule'>
            <ConfirmModal 
                confirmShow={confirmShow} 
                confirmHandleClose={confirmHandleClose} 
                i={i} 
                clickedDate={clickedDate} 
                Message="한번 완료된 일정은 되돌릴 수 없습니다." 
                eventHandler={confirmEvent}>
            </ConfirmModal>
            
            <ScheduleEditModal 
                show={editShow} 
                handleClose={editHandleClose} 
                i={i} 
                clickedDate={clickedDate}
            />

            <Col sm={2} className='text-center'>
                <Checkbox
                className="margin-left"
                icon={<i className="zmdi zmdi-check"/>}
                onChange={(e)=>{ confirmHandler(e.target.checked) }}
                checked={ScheduleState.complete}
                disabled={!isToday || ScheduleState.complete}
                />
            </Col>
            <Col sm={2} className='m-auto color-darkBlue'>
                { "[" + ScheduleState.time + "]" }
            </Col>
            {/*말 줄임 표시 추후 추가 50자 제한, 툴팁 형태로 전체 표현 고민*/}
            <Col sm={5} className={ScheduleState.complete ? 'm-auto color-darkBlue p-zero cancel_line' : 'm-auto color-darkBlue p-zero'}>
                
            <Marquee pauseOnHover gradient={false}>
                { ScheduleState.title }
            </Marquee>
            </Col>
            <Col sm={1} className='m-auto'>
                {ScheduleState.important ? <StarTwoTone twoToneColor="orange"/> : "" }
            </Col>
            <Col sm={2} className='m-auto text-center' >
                <Dropdown 
                    className={ScheduleState.complete ? '' : 'cursor-pointer'}
                    //item이라는 고정된 key에 대응하는 value를 보내야함 default: menu={{item}}
                    //두가지 버전의 dropdown을 보내려면 아래와 같이 item에 대응하는 value로 보내면됨
                    menu={{items : ScheduleState.complete ? completItems :  defaultItems}}
                    trigger={['click']}
                    >
                    <EllipsisOutlined/>
                </Dropdown> 
            </Col>
        </Row>
    )
}

export default Schedule