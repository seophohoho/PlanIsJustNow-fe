import {Col, Row, Button} from "react-bootstrap"
import { useSelector } from "react-redux"
import { EllipsisOutlined, StarTwoTone } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useState } from "react";
import { Checkbox } from "pretty-checkbox-react";
import ScheduleAddModal from "./ScheduleAddModal";

function Schedule(props){
    const state = useSelector((state)=> state)/*자주 쓰는거 변수로 줄여야겠음 */
    const {i, clickedDate} = props

    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);}
    const handleShow = () => {setShow(true);}
    
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
            <ScheduleAddModal show={show} handleClose={handleClose} i={i} clickedDate={clickedDate}/>
            <Col sm={1} className='text-center'><Checkbox className="margin-left" icon={<i className="zmdi zmdi-check"/>} onChange={(e)=>{}} defaultChecked={state.dateSchedule[clickedDate][i].complete}/></Col>
            <Col sm={2} 
                className={state.dateSchedule[clickedDate][i].complete ? 'm-auto color-darkBlue cancel_line' : 'm-auto color-darkBlue'}>{ "[" + state.dateSchedule[clickedDate][i].time + "]" }</Col>
            {/*말 줄임 표시 추후 추가 50자 제한, 툴팁 형태로 전체 표현 고민*/}
            <Col sm={6} 
                className={state.dateSchedule[clickedDate][i].complete ? 'm-auto color-darkBlue p-zero cancel_line' : 'm-auto color-darkBlue p-zero'}>{ state.dateSchedule[clickedDate][i].title }</Col>
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