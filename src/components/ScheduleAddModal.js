import {Modal, Form, Button} from "react-bootstrap"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker, DatePicker, Space } from 'antd';
import { useSelector } from "react-redux"

function ScheduleAddModal(props){
    const {show, handleClose} = props
    
    const { RangePicker } = DatePicker;

    dayjs.extend(customParseFormat);
    const onChange = (time, timeString) => {
        console.log(time, timeString);
    };
    return (
      <> {/*todo 올바른 form control 할당 버튼 디자인 변경*/}
        <Modal show={show} onHide={handleClose} className="p-400" >
          <Modal.Header closeButton>
            <Modal.Title>일정 추가</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group 
                className="mb-3" 
                controlId="ControlInput1">
                <Form.Label>일정</Form.Label>
                <Form.Control/>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="ControlInput2"
              >
                <Form.Label>날짜</Form.Label>
                <RangePicker inputReadOnly={true}/>
              </Form.Group>
              <Form.Group>
                <label for="ControlInput3" className="">시간 선택</label>
                <TimePicker id="ControlInput3" onChange={onChange} defaultOpenValue={dayjs('00:00', 'HH:mm')} format="HH:mm" inputReadOnly={true}/>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="ControlInput4"
              >
                <Form.Label>중요여부</Form.Label> {/*checkbox*/}
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