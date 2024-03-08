import {Modal, Form, Button} from "react-bootstrap"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker, DatePicker, Space } from 'antd';
import { useSelector } from "react-redux"
import "@djthoms/pretty-checkbox"
import { Checkbox } from "pretty-checkbox-react";


function ScheduleAddModal(props){
    const state = useSelector(state => state)
    const {show, handleClose, i, clickedDate} = props;
    
    const { RangePicker } = DatePicker;

    dayjs.extend(customParseFormat);
    const onChange = (time, timeString) => {
        console.log(time, timeString);
    };

    const confirmHandler = function(e){}

    const checkBoxHandler = function(e){console.log(e.target.checked)}
    
    const title = "일정수정";//임시, 재활용 할려면 비슷한 형식으로 해야할 듯
    //title state에 따라 바뀌게?? 초기값, 확인버튼의 동작 이벤트 등등

    //수정의 경우 기존 데이터가 입력되어있는 형태여야 함
    //추가의 경우 완전 비어있는 상태
    //이벤트 조건 함수 해당일의 important가 3개 초과이면 안됨
    //모달의 확인 버튼을 누를때 해당 조건을 모두 판단하고 state를 변경하는 식으로
    //일정의 각 항목의 정보를 나타내는 title 필요 sticky로
    //

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
                    className="schedule-title m-left-13p"
                    value="gdgd"/>{/*글자 50자 제한 필요*/}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label htmlFor="ControlInput2" className="color-darkBlue">날짜</Form.Label>
                <RangePicker 
                    className="m-left-38p"
                    id="ControlInput2" 
                    inputReadOnly={true} 
                    onChange={onChange} 
                    defaultOpenValue={dayjs('YYYY-MM-DD')}
                    defaultValue={[dayjs('2024-10-10', 'YYYY-MM-DD'), dayjs('2024-10-20', 'YYYY-MM-DD')]}
                    />
              </Form.Group>

              <Form.Group className="mb-5">
                <label htmlFor="ControlInput3" className="color-darkBlue">시간 선택</label>
                <TimePicker 
                    className="m-left-60p" 
                    id="ControlInput3" 
                    inputReadOnly={true} 
                    onChange={onChange} 
                    defaultOpenValue={dayjs('HH:mm')}
                    defaultValue={dayjs('10:00','HH:mm')}
                    format="HH:mm"
                    />
              </Form.Group>

              <Form.Group className="mb-4" controlId="ControlInput4">
                <Form.Label className="color-darkBlue">중요여부</Form.Label> {/*checkbox*/}
                <Checkbox 
                    animation="tada" 
                    className="m-left-80p" 
                    icon={<i className="zmdi zmdi-star mdc-text-amber"/>}
                    shape="curve"
                    onChange={checkBoxHandler}
                    defaultChecked={true} 
                    />
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