import {Modal, Button} from "react-bootstrap"
import "@djthoms/pretty-checkbox"


function ConfirmModal(props){
    const {
      confirmShow,
      confirmHandleClose,
      titleMessage,
      Message,
      eventHandler
    } = props;

    return (
      <> {/*todo 올바른 form control 할당 버튼 디자인 변경*/}
        <Modal show={confirmShow} onHide={confirmHandleClose} className="p-400" >

          <Modal.Header closeButton>
            <Modal.Title className="color-darkBlue">{titleMessage}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{Message}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={confirmHandleClose}>
              취소
            </Button>
            <Button variant="primary" onClick={eventHandler}>
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

export default ConfirmModal