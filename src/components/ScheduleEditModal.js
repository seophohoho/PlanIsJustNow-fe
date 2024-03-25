import {Modal, Form, Button} from "react-bootstrap"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker, DatePicker, Space } from 'antd';
import { useSelector,useDispatch } from "react-redux"
import { scheduleStateEdit } from "../store/store";
import "@djthoms/pretty-checkbox"
import { Checkbox } from "pretty-checkbox-react";


function ScheduleEditModal(props){
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const {show, handleClose, i, clickedDate} = props;
  const ScheduleState = state.dateSchedule[clickedDate][i];
  
  const tempSchedule = {
    clickedDate: clickedDate,
    index: i, 
    title : ScheduleState.title, 
    end: ScheduleState.end, 
    time: ScheduleState.time, 
    important: ScheduleState.important, 
    complete : ScheduleState.complete
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

  const confirmHandler = function(e){
    tempSchedule.clickedDate = clickedDate;
    tempSchedule.index = i;

    dispatch(scheduleStateEdit(tempSchedule))
    console.log(tempSchedule)
    handleClose();
  };

  
  
  const title = "일정수정";//임시, 재활용 하려면 비슷한 형식으로 해야할 듯
  //title state에 따라 바뀌게?? 초기값, 확인버튼의 동작 이벤트를 다르게 해야함 등등

  //추가의 경우 입력 form이 완전 비어있는 상태
  //events 추가 조건 함수 해당일의 important가 3개 초과이면 안됨--
  //modal의 확인 버튼을 누를때 해당 조건을 모두 판단하고 state를 변경하는 식으로
  //일정의 각 항목의 정보를 나타내는 title 필요 sticky로 일정 추가 버튼도 여기 배치
  //complete의 경우 모달로 확인 사실을 확정하고 disable 하는 방식으로

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
                  defaultValue={ state.dateSchedule[clickedDate][i].title }
                  onChange={titleHandler}
              />{/*글자 50자 제한 필요*/}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="ControlInput2" className="color-darkBlue">종료일자</Form.Label>
              <DatePicker 
                  className="m-left-59p"
                  id="ControlInput2"
                  inputReadOnly={true} 
                  onChange={DatePickerHandler}//datePickerHandler추가 후 변경 
                  defaultOpenValue={dayjs('YYYY-MM-DD')}
                  defaultValue={[dayjs(state.dateSchedule[clickedDate][i].end, 'YYYY-MM-DD')]}
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
                  defaultValue={dayjs(state.dateSchedule[clickedDate][i].time,'HH:mm')}
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
                  defaultChecked={state.dateSchedule[clickedDate][i].important} 
                  />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
        <Button variant="primary" 
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