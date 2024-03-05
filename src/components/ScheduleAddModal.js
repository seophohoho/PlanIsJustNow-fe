import {Modal, Form, Button} from "react-bootstrap"
import { useSelector } from "react-redux"

function ScheduleAddModal(props){
    const {show, handleClose} = props
    return (
      <> 
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>일정 추가</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group 
                className="mb-3" 
                controlId="exampleForm.ControlInput1">
                <Form.Label>일정</Form.Label>
                <Form.Control/>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>날짜</Form.Label>
                <Form.Control/>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>시간</Form.Label>
                <Form.Control/>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>중요여부</Form.Label>
                <Form.Control/>
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