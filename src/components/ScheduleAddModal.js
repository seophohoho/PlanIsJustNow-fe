import {Modal, Form, Button} from "react-bootstrap"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';
import { useSelector,useDispatch } from "react-redux"
import { addHandleClose, scheduleStateAdd } from "../store/store";
import "@djthoms/pretty-checkbox"
import { Checkbox } from "pretty-checkbox-react";
import moment from 'moment';
import axios from "axios";
import serverUrl from "../serverConfig";
import { useNavigate } from "react-router-dom";

function ScheduleAddModal(props){
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clickedDate } = props;
  const currentTime = moment().format('HH:mm');
  
  /*초기화 상태*/
  const tempSchedule = {
    clickedDate: clickedDate,
    title : "",
    time: currentTime,
    important: false,
    idx : ""
  }
  dayjs.extend(customParseFormat);

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
    console.log(currentTime)
    axios.post(`${serverUrl}/api/todolist/add`, {
      "title":tempSchedule.title,
      "startDate": tempSchedule.clickedDate,
      "time": tempSchedule.time,
      "isImportant": tempSchedule.important ? 1 : 0 
  }, {withCredentials: true})
    .then(response => {
        tempSchedule.idx = response.data.data
        dispatch(scheduleStateAdd(tempSchedule));
        console.log(tempSchedule.time + "!!!!time");
        modalClose();
    })
    .catch((error) => {
      if(error.response){ // 런타임 에러방지 error.response가 있는지 먼저 확인함
          if(error.response.status === 401) { // 토큰 만료 리다이렉트
              console.log("Error status: " + error.response.status);
              alert("로그인을 다시해주세요!");
              modalClose()/*모달 닫고 이동 시켜야 함*/
              navigate('/');
          }
          else{
            alert("서버와 연결에 실패했습니다.");
          }
      }
      else{
          console.error("Error: ", error);
          if(error.message) {
            alert("에러: " + error.message);
          }
          else{
            alert("알 수 없는 에러가 발생했습니다.");
          }
      }
  });
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