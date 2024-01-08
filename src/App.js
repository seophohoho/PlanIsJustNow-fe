import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { InputGroup, Form, Col, Row, Button, Container, Navbar, Image } from 'react-bootstrap';

function App() {
  let [inputTitle, setInputTitle] = useState(["e-mail","인증번호","비밀번호","비밀번호 확인","닉네임"])
  let [inputType, setInputType] = useState(["email","number","passward","passward","text"]);
  let [placeholder, setPlaceholder] = useState([
    "pettodo@abc.com",
    "인증번호 입력하세요. (숫자 6자리)",
    "비밀번호를 입력하세요.(숫자와 특수문자를 포함한 8글자 이상)",
    "비밀번호 재입력",
    "닉네임을 입력하세요"
  ]);
  let [classNames, setClassNames] = useState(["","","","",""])
  let [btnMessage,setBtnMessage] = useState(["인증번호 전송","확인","false","false","false"]);

  //todo 나중에 배열로 합친다음 필요한 정보만 수정, 전달하는 형식으로 변경하는게 좋을듯// X => 직관적이게 분할하자
  let [email, setEmail] = useState("")
  let [authCode, setAuthCode] = useState("")
  let [password, setPassward] = useState("")
  let [nickname, setNickname] = useState("")

  return (
    <div>
      <header>
       <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">
            <img src='/logo192.png'width={"50px"}></img>
          </Navbar.Brand>
        </Container>
        </Navbar>
      </header>

      <h1 className='page-title'>회원가입</h1>

      <body>
        <div className='App'>
          <Form className='form'>
            {
              <InputComponent inputTitle={inputTitle} inputType={inputType} placeholder={placeholder} classNames={classNames} btnMessage={btnMessage}/>
            }
            
              {
                /* <Button as="input" type="button" value="인증번호 전송" onClick={()=>{
                //TODO 전달전 양식 올바른지 판단(빈값, @ 있는지)
                try{
                  axios.post("http://localhost:8080/api/auth/mail",
                    {"email" : email});
                }catch(error){
                alert(error + "디버그용: 올바르게 작동하지 않음!")
                }}}/>{' '}
        
        
                <Button as="input" type="button" value="확인" onClick={()=>{
                //TODO 사용자가 인증번호 전송 버튼을 누르지 않고 해당 버튼을 누르는 경우
                try{
                axios.post("http://localhost:8080/api/auth/check",{
                  "email" : email,
                  "code" : authCode});
                }catch(error){
                alert("디버그용 올바르게 작동하지 않음!")
                }}}/>

                <Form.Control type="password" placeholder="비밀번호를 입력하세요.(숫자와 특수문자를 포함한 8글자 이상)" onChange={(e)=>{
                  //todo 비밀번호가 양식과 일치하는지 확인
                  setPassward(e.target.value);
                }} />
        
                <Form.Control type="password" placeholder="비밀번호 재입력" onChange={(e)=>{
                  //todo 비밀번호가 일치한지 확인
                }}/> 
        
              <Form.Control type="text" placeholder="닉네임을 입력하세요" onChange={(e)=>{
                setNickname(e.target.value);
              }} />
              {/* 중복확인 기능 필요 */
            }
            
            <Container>
              <Row>
                <Col>
                  <p className='color-darkBlue'>프로필 사진</p>
                </Col>
                <Col className='center' sm={7}>
                  <Image src="/logo192.png" roundedCircle className='input-bgSet image-w float-display' />
                  <div className='float-display'>
                    <Button as="input" type="button" value="이미지 선택"/>
                    <p className='color-violet impo-margin-zero'>100px*100px 권장</p>
                    <p className='color-violet'>PNG, JPNG, JPEG가 지원됩니다.</p>
                  </div>
                </Col>
              </Row>
              <div className='center'>
                <Button as="input" type="button" value="다음" onClick={()=>{
                  
                }} />
              </div>
            </Container>
          </Form>
        </div>
      </body>
      <footer></footer>
    </div>
  );
}

function btnFeat(inpo, setInpo){
}

function InputComponent(props){
  const {inputTitle, inputType, placeholder, classNames, btnMessage} = props 
  return(
    <>
      {
        inputTitle.map(function(notuse, i){
          return(
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                  <Col>
                    <Form.Label column>
                      <p className='color-darkBlue'><span>*</span> { inputTitle[i] }</p> 
                    </Form.Label>
                  </Col>
                  <Col className='mb-3'>
                    <Form.Control type={ inputType[i] } placeholder={ placeholder[i] } className={classNames[i]} onChange={(e)=>{
                      //TODO 양식 상태 확인 함수 state에 저장 후 map 순서에 따라 할당
                    }}/>
                  </Col>
                  <Col>
                    {
                      btnMessage === "false" ? null : <Button as="input" type="button" value={ btnMessage[i] } onClick={()=>{
                        //TODO post 함수 제작후 각각 할당 내부 value 확인 후 해당되지 않는 칸에는 버튼 비활성화
                      }}/>
                    }
                  </Col>
              </Form.Group>
          )})
      }
    </>
  )
}


function shallowCopy(state, set, value){
  let copy = [...state]
  copy = value;
  set(value);
}

export default App;
