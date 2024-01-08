import { InputGroup, Form, Col, Row, Button, Container, Navbar, Image } from 'react-bootstrap';
import axios from 'axios';

{ 
  //TODO InputComponent-onChange: value 갱신될 때마다 app.js의 각각의 state에 갱신 -> 함수구조 생각안하고 if로 임시처리 나중에 모듈화할 것
  //Todo InputComponent-onChange: 5개의 input 양식 조건 state 구현후 map 순서따라 할당(상세내용 app.js Todo확인)
}

function InputComponent(props){
    const {
      inputTitle, inputType, 
      placeholder,classNames, 
      btnMessage, addr, data,
      setEmail, setAuthCode,
      setPassword, setNickname} = props 
    return(
      <>
        {
          inputTitle.map(function(notUse, i){
            return(
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Col>
                      <Form.Label column>
                        <p className='color-darkBlue'><span>*</span> { inputTitle[i] }</p> 
                      </Form.Label>
                    </Col>
                    <Col className='mb-3'>
                      <Form.Control type={ inputType[i] } placeholder={ placeholder[i] } className={classNames[i]} onChange={(e)=>{
                        if(i===0)setEmail(e.target.value);
                        else if(i===1)setAuthCode(e.target.value);
                        else if(i===2)setPassword(e.target.value);
                        else if(i===4)setNickname(e.target.value);
                        else{}
                      }}/>
                    </Col>
                    <Col>
                      {
                        btnMessage[i]===false ? null : <Button as="input" type="button" value={ btnMessage[i] } onClick={()=>{
                          btnFeat(addr[i], data[i])
                        }}/>
                      }
                    </Col>
                </Form.Group>
            )})
        }
      </>
    )
}

function btnFeat(addr, data){
    try{
        axios.post(`http://localhost:8080/${addr}`, data)}
    catch(error){
      alert(error + "디버그용: 올바르게 작동하지 않음!")
    }
}
  

export default InputComponent