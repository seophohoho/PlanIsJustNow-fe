import { useState } from "react";
import {Modal, Form, Button} from "react-bootstrap"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker, DatePicker } from 'antd';
import { useSelector,useDispatch } from "react-redux"
import { addHandleClose, scheduleComplete, scheduleStateAdd } from "../store/store";
import "@djthoms/pretty-checkbox"
import { Checkbox } from "pretty-checkbox-react";
import moment from 'moment';

function ScheduleAddModal(props){
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const { clickedDate } = props;
  const currentTime = moment().format('HH:MM');

  
  /*초기화 상태*/
  const tempSchedule = {
    clickedDate: clickedDate,
    title : "",
    end: clickedDate, 
    time: currentTime,
    important: false,
  }
  dayjs.extend(customParseFormat);

  function DatePickerHandler(notuse, picks){
    tempSchedule.end = picks
  };
  function TimePickerHandler(notuse, picks){
    tempSchedule.time = picks
  };
  function checkBoxHandler(e){
    tempSchedule.important = e.target.checked;
  };
  function titleHandler(e){
    tempSchedule.title = e.target.value;

  }

  function modalClose(){dispatch(addHandleClose())}

  const addConfirmHandler = function(e){
    tempSchedule.clickedDate = clickedDate;

    dispatch(scheduleStateAdd(tempSchedule))

    console.log(tempSchedule)
    modalClose()
  };

  
  
  const title = "일정추가";

  //추가의 경우 입력 form이 완전 비어있는 상태
  //events 추가 조건 함수 해당일의 important가 3개 초과이면 안됨--
  //modal의 확인 버튼을 누를때 해당 조건을 모두 판단하고 state를 변경하는 식으로

  return (
    <> {/*todo 올바른 form control 할당 버튼 디자인 변경*/}
      <Modal show={state.addShow.show} onHide={modalClose} className="p-400" >

        <Modal.Header closeButton>
          <Modal.Title className="color-darkBlue">{ title }</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-4" controlId="ControlInput1">
              <Form.Label className="color-darkBlue">
                  일정
              </Form.Label>
              <Form.Control 
                  type='input'
                  className="schedule-title m-left-13p"
                  defaultValue=""
                  onChange={titleHandler}
                  maxLength={50}/*글자 50자 제한*/
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="ControlInput2" className="color-darkBlue">종료일자</Form.Label>
              <DatePicker 
                  className="m-left-59p"
                  id="ControlInput2"
                  inputReadOnly={true} 
                  onChange={DatePickerHandler}//datePickerHandler추가 후 변경 
                  defaultOpenValue={dayjs('YYYY-MM-DD')}
                  defaultValue={[dayjs(clickedDate, 'YYYY-MM-DD')]}
                  />
            </Form.Group>

            <Form.Group className="mb-5">
              <label htmlFor="ControlInput3" className="color-darkBlue">시간 선택</label>
              <TimePicker 
                  className="m-left-60p" 
                  id="ControlInput3" 
                  inputReadOnly={true} 
                  onChange={TimePickerHandler} 
                  defaultOpenValue={dayjs('HH:mm')}
                  defaultValue={dayjs(dayjs(),'HH:mm')}
                  format="HH:mm"
                  />
            </Form.Group>

            <Form.Group className="mb-4" controlId="ControlInput4">
              <Form.Label className="color-darkBlue">중요여부</Form.Label>
              <Checkbox 
                  animation="tada" 
                  className="m-left-80p" 
                  icon={<i className="zmdi zmdi-star mdc-text-amber"/>}
                  shape="curve"
                  onChange={checkBoxHandler}
                  defaultChecked={false} 
                  />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
        <Button variant="primary" className=""
          onClick={addConfirmHandler}>
            확인
          </Button>
          <Button variant="secondary" onClick={modalClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
  

export default ScheduleAddModal