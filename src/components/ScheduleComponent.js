import {Col, Row} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { EllipsisOutlined, StarTwoTone } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useState } from "react";
import { Checkbox } from "pretty-checkbox-react";
import { scheduleDelete } from "../store/store";
import ScheduleEditModal from "./ScheduleEditModal";
import ConfirmModal from "./ConfirmModal";

function Schedule(props){
    const state = useSelector((state)=> state)/*자주 쓰는거 변수로 줄여야겠음 */
    const dispatch = useDispatch();
    const {i, clickedDate} = props

    const [confirmShow, setConfirmShow] = useState(false);
    const confirmHandleClose = ()=>{setConfirmShow(false);}
    const confirmHandler = (e)=>{setConfirmShow(e)};

    const [editShow, setEditShow] = useState(false);
    const editHandleClose = () => {setEditShow(false);}
    const editHandleShow = () => {setEditShow(true);}

    function scheduleDeleteHandler(){
        /* confirm 추가 */
        dispatch(scheduleDelete({index : i, clickedDate : clickedDate}))
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
            <ConfirmModal confirmShow={confirmShow} confirmHandleClose={confirmHandleClose} i={i} clickedDate={clickedDate}></ConfirmModal>
            <ScheduleEditModal show={editShow} handleClose={editHandleClose} i={i} clickedDate={clickedDate}/>
            <Col sm={2} className='text-center'>
                <Checkbox
                className="margin-left"
                icon={<i className="zmdi zmdi-check"/>}
                onChange={(e)=>{ confirmHandler(e.target.checked) }}
                checked={ScheduleState.complete}
                disabled={ScheduleState.complete}
                />
            </Col>
            <Col sm={2} className='m-auto color-darkBlue'>
                { "[" + ScheduleState.time + "]" }
            </Col>
            {/*말 줄임 표시 추후 추가 50자 제한, 툴팁 형태로 전체 표현 고민*/}
            <Col sm={5} className={ScheduleState.complete ? 'm-auto color-darkBlue p-zero cancel_line' : 'm-auto color-darkBlue p-zero'}>
                { ScheduleState.title }
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