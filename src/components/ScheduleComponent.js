import {Col, Row, Button} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { EllipsisOutlined, StarTwoTone } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useState } from "react";
import { Checkbox } from "pretty-checkbox-react";
import ScheduleAddModal from "./ScheduleAddModal";
import ConfirmModal from "./ConfirmModal";

function Schedule(props){
    const state = useSelector((state)=> state)/*자주 쓰는거 변수로 줄여야겠음 */
    const dispatch = useDispatch();
    const {i, clickedDate} = props

    const [confirmShow, setConfirmShow] = useState(false);
    const confirmHandleClose = ()=>{setConfirmShow(false);}
    const confirmHandler = (e)=>{setConfirmShow(e)};

    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);}
    const handleShow = () => {setShow(true);}

    const ScheduleState = state.dateSchedule[clickedDate][i];
    
    const items = [
        { //임시로 일정 추가로 할당, issue: 현재 <label> 바깥 태그(li) 클릭 시 이벤트가 발생하지 않는 문제 존재
          label: <label className="color-violet" onClick={handleShow}>일정 수정</label>,
          key: '0',
        },
        {type: 'divider'},
        {
          label: <label className="color-violet">일정 삭제</label>,
          key: '1',
        }
    ];

    return(
        <Row className='section__item-schedule'>
            <ConfirmModal confirmShow={confirmShow} confirmHandleClose={confirmHandleClose} i={i} clickedDate={clickedDate}></ConfirmModal>
            <ScheduleAddModal show={show} handleClose={handleClose} i={i} clickedDate={clickedDate}/>

            <Col sm={1} className='text-center'>
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
            <Col sm={6} className={ScheduleState.complete ? 'm-auto color-darkBlue p-zero cancel_line' : 'm-auto color-darkBlue p-zero'}>
                { ScheduleState.title }
            </Col>
            <Col sm={1} className='m-auto'>
                {ScheduleState.important ? <StarTwoTone twoToneColor="orange"/> : "" }
            </Col>
            <Col sm={2} className='m-auto'>
                <Dropdown 
                className={ScheduleState.complete ? '' : 'cursor-pointer'}
                menu={{items}} 
                trigger={['click']} 
                disabled={ScheduleState.complete}>
                    <EllipsisOutlined/>
                </Dropdown>
            </Col>
        </Row>
    )
}

export default Schedule