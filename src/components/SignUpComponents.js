import { InputGroup, Form, Col, Row, Button, Container, Navbar, Image } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

{ 
  //TODO 이메일: 전달전 양식 올바른지 판단(빈값, @ 있는지) 정규표현식
  //TODO 사용자: 인증번호 전송 버튼을 누르지 않고 해당 버튼을 누르는 경우
  //todo 비밀번호: 보안양식과 일치하는지 확인
  //todo 비밀번호: 일치한지 확인
  //todo 닉네임: 중복확인 기능 필요
  //Todo InputComponent-onChange: 5개의 input 양식 조건 state 구현후 map 순서따라 할당(상세내용 app.js Todo확인)
}



function InputComponent(props){
  const {
    inputTitle, inputType, authCode,
    placeholder,classNames, email,
    btnMessage, addr, 
    setEmail, setAuthCode,
    setPassword, setNickname} = props 

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleButtonClick = (index) => {
    if (index === 0) {
      // 버튼 0이 클릭되면 버튼 1을 활성화하도록 상태 업데이트
      setIsButtonDisabled(false);
    }
    // 여기에서 다른 버튼 로직 추가 가능
  };


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
                      
                      if(i===0){setEmail(e.target.value);}
                      else if(i===1){setAuthCode(e.target.value);}
                      else if(i===2)setPassword(e.target.value);
                      else if(i===4)setNickname(e.target.value);
                      else{}
                      
                    }}/>
                  </Col>
                  <Col>
                    {
                      btnMessage[i]===false ? null : <Button as="input" type="button" value={ btnMessage[i] }
                      disabled={i === 1 && isButtonDisabled}
                      onClick={()=>{
                        handleButtonClick(i);
                        btnAuth(addr[i], email, authCode);
                        btnEmail(addr[i], email); 
                        
                      }}/>
                    }
                  </Col>
              </Form.Group>
        )})
      }
    </>
  )
}

function btnAuth(addr, email, authCode){
  if(addr==="api/auth/check")
  axios.post(`http://localhost:8080/api/auth/check`, {
      "email" : email,
      "code" : authCode
    }).then(Response => console.log(Response)).catch(alert("!!"))
}
  
function btnEmail(addr, email){
  if(addr==="api/auth/mail")
  axios.post(`http://localhost:8080/api/auth/email`, {
    "email" : email
  }).then(Response => console.log(Response)).catch(alert("!!!!"))
}

const isEmailValid = (email)=>{
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

const isbtnAct = ()=>{

}

const isPasswordValid = (password)=>{
  const passwordRegex = /^[A-Za-z0-9]{8,20}$/;
  return passwordRegex.test(password);
}


export default InputComponent