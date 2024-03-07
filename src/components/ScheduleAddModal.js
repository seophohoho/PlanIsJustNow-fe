import {Modal, Form, Button} from "react-bootstrap"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker, DatePicker, Space } from 'antd';
import { useSelector } from "react-redux"
import "@djthoms/pretty-checkbox"
import { Checkbox } from "pretty-checkbox-react";


function ScheduleAddModal(props){
    const {show, handleClose} = props;
    
    const { RangePicker } = DatePicker;

    dayjs.extend(customParseFormat);
    const onChange = (time, timeString) => {
        console.log(time, timeString);
    };
    

    return (
      <> {/*todo 올바른 form control 할당 버튼 디자인 변경*/}
        <Modal show={show} onHide={handleClose} className="p-400" >
          <Modal.Header closeButton>
            <Modal.Title className="color-darkBlue">일정 추가</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group 
                className="mb-4" 
                controlId="ControlInput1"
              >
                <Form.Label className="color-darkBlue">일정</Form.Label>
                <Form.Control className="schedule-title m-left-13p"/>
              </Form.Group>
              <Form.Group
                className="mb-4"
              >
                <Form.Label htmlFor="ControlInput2" className="color-darkBlue">날짜</Form.Label>
                <RangePicker className="m-left-38p" id="ControlInput2" inputReadOnly={true} onChange={onChange} defaultOpenValue={dayjs('0000-00-00', 'YYYY-MM-dd')}/>
              </Form.Group>
              <Form.Group 
                className="mb-5"
              >
                <label htmlFor="ControlInput3" className="color-darkBlue">시간 선택</label>
                <TimePicker className="m-left-60p" id="ControlInput3" inputReadOnly={true} onChange={onChange} defaultOpenValue={dayjs('00:00', 'HH:mm')} format="HH:mm"/>
              </Form.Group>
              <Form.Group
                className="mb-4"
                controlId="ControlInput4"
              >
                <Form.Label className="color-darkBlue">중요여부</Form.Label> {/*checkbox*/}
                <Checkbox animation="tada" className="m-left-80p" icon={<i className="zmdi zmdi-star mdc-text-amber"/>}></Checkbox>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button variant="primary" onClick={handleClose}>
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

export default ScheduleAddModal