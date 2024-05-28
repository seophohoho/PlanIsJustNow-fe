import {Modal, Form, Button} from "react-bootstrap"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker, DatePicker } from 'antd';
import { useSelector,useDispatch } from "react-redux"
import { scheduleStateEdit } from "../store/store";
import "@djthoms/pretty-checkbox"
import { Checkbox } from "pretty-checkbox-react";
import axios from "axios";
import serverUrl from "../serverConfig";
import { useNavigate } from "react-router-dom";
import handleError from "../function/errorHandler";
import { useState } from "react";

function ScheduleEditModal(props){
  const state = useSelector(state => state.dateSchedule)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoding] = useState(false)
  const {show, handleClose, i, clickedDate} = props;
  const ScheduleState = state[clickedDate][i];

  const tempSchedule = {
    clickedDate: clickedDate,
    editDate : "",
    index: i, 
    title : ScheduleState.title, 
    time: ScheduleState.time, 
    important: ScheduleState.important, 
    complete : ScheduleState.complete,
    idx : ScheduleState.idx //undefine
  }

  dayjs.extend(customParseFormat);

  function DatePickerHandler(notUse, picks){
    tempSchedule.editDate = picks;
  }
  function TimePickerHandler(notuse, picks){
    tempSchedule.time = picks
  };
  function checkBoxHandler(e){
    tempSchedule.important = e.target.checked;
  };
  function titleHandler(e){
    tempSchedule.title = e.target.value;
  }

  const confirmHandler = async () => {
    tempSchedule.index = i;
  
    const { title, important, idx, time, editDate, clickedDate } = tempSchedule;
    const targetDate = editDate === "" ? clickedDate : editDate;
    const importantCount = state[targetDate] ? state[targetDate].filter((item, idx) => item.important).length : 0;
    if(title.length === 0 || importantCount === 3 && important){
      if(title.length === 0) {
        alert("일정을 입력해 주세요!");
      }
      else if (importantCount === 3 && important) {
        alert("중요 표시는 3개를 초과하여 등록할 수 없습니다!");
      }
    }else{
      try {
        const response = await axios.post(`${serverUrl}/api/todolist/modify`, {
          idx,
          title,
          startDate: targetDate,
          time,
          isImportant: important ? 1 : 0,
        }, { withCredentials: true });
    
        if (response.status === 401) {
          navigate("/");
        } else {
          dispatch(scheduleStateEdit(tempSchedule));
          handleClose();
        }
      } catch (error) {
        handleError(error, navigate);
      }
    }
  };
  
  const title = "일정수정";

  return (
    <> {/*todo 올바른 form control 할당 버튼 디자인 변경*/}
      <Modal show={show} onHide={handleClose} className="p-400" >

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
                  defaultValue={ state[clickedDate][i].title }
                  onChange={titleHandler}
                  autoComplete="off"
              />{/*글자 50자 제한 필요*/}
            </Form.Group>

            <Form.Group className="mb-5">
              <label htmlFor="ControlInput3" className="color-darkBlue">시간 선택</label>
              <TimePicker 
                  className="m-left-60p" 
                  id="ControlInput3" 
                  inputReadOnly={true} 
                  onChange={TimePickerHandler} 
                  defaultOpenValue={dayjs('HH:mm')}
                  defaultValue={dayjs(state[clickedDate][i].time,'HH:mm')}
                  format="HH:mm"
                  allowClear={false}
                  />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="ControlInput2" className="color-darkBlue">날짜</Form.Label>
              <DatePicker 
                  className="m-left-65p"
                  id="ControlInput2"
                  inputReadOnly={true} 
                  onChange={DatePickerHandler}
                  defaultOpenValue={dayjs('YYYY-MM-DD')}
                  defaultValue={[dayjs(clickedDate, 'YYYY-MM-DD')]}
                  allowClear={false}
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
                  defaultChecked={state[clickedDate][i].important} 
                  />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" disabled={isLoading}
          onClick={confirmHandler}>
            확인
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
  

export default ScheduleEditModal