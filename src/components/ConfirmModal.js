import {Modal, Button} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { scheduleComplete } from "../store/store"
import "@djthoms/pretty-checkbox"
import { useState } from "react"
import serverUrl from "../serverConfig"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"


function ConfirmModal(props){
    const state = useSelector(state => state)
    const dispatch = useDispatch(state=> state)
    const navigate = useNavigate()
    const {
      confirmShow,
      confirmHandleClose,
      i,
      clickedDate,
      Message,
      eventHandler
    } = props;

    return (
      <> {/*todo 올바른 form control 할당 버튼 디자인 변경*/}
        <Modal show={confirmShow} onHide={confirmHandleClose} className="p-400" >

          <Modal.Header closeButton>
            <Modal.Title className="color-darkBlue">정말하시겠습니까?</Modal.Title>
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