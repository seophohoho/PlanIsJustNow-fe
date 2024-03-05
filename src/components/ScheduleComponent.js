import {Col, Row, Button} from "react-bootstrap"
import { useSelector } from "react-redux"
import { EllipsisOutlined, StarTwoTone } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useState } from "react";
import ScheduleAddModal from "./ScheduleAddModal";

function Schedule(props){
    const state = useSelector((state)=> state)
    const {i, clickedDate} = props

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const items = [
        { //임시로 일정 추가로 할당
          label: <p className="color-violet" onClick={handleShow}>일정 수정</p>,
          key: '0',
        },
        {type: 'divider'},
        {
          label: <p className="color-violet">일정 삭제</p>,
          key: '1',
        }
      ];
    return(
        <Row className='section__item-schedule'>
            <ScheduleAddModal show={show} handleClose={handleClose}/>
            <Col sm={1} className='text-center'><input type='checkbox'/></Col>
            <Col sm={2} className='m-auto color-darkBlue'>{ state.dateSchedule[clickedDate][i].time }</Col>
            {/*말 줄임 표시 추후 추가 50자 제한, 툴팁 형태로 전체 표현 고민*/}
            <Col sm={6} className='m-auto color-darkBlue p-zero'>{ state.dateSchedule[clickedDate][i].title }</Col>
            <Col sm={1} className='m-auto'>
                {state.dateSchedule[clickedDate][i].important ? <StarTwoTone twoToneColor="orange"/> : "" }
            </Col>
            <Col sm={2} className='m-auto'>
                <Dropdown className='cursor-pointer' menu={{items}} trigger={['click']}>
                    <EllipsisOutlined/>
                </Dropdown>
            </Col>
        </Row>
    )
}

export default Schedule