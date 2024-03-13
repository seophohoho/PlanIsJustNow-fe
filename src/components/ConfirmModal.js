import {Modal, Form, Button} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { scheduleComplete } from "../store/store"
import "@djthoms/pretty-checkbox"


function ScheduleAddModal(props){
    const state = useSelector(state => state)
    const dispatch = useDispatch(state=> state)
    const {confirmShow, confirmHandleClose, i, clickedDate} = props;

    return (
      <> {/*todo 올바른 form control 할당 버튼 디자인 변경*/}
        <Modal show={confirmShow} onHide={confirmHandleClose} className="p-400" >

          <Modal.Header closeButton>
            <Modal.Title className="color-darkBlue">정말하시겠습니까?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>한번 결정하면 일정 완료를 결정하시면 이전 상태로 돌아갈 수 없습니다!</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={confirmHandleClose}>
              취소
            </Button>
            <Button variant="primary" onClick={()=>{
              confirmHandleClose();
              dispatch(scheduleComplete({clickedDate: clickedDate, index: i, package: true }))
              }}>
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

export default ScheduleAddModal