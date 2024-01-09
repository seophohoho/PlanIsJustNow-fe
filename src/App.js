import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import InputComponent from './components/SignUpComponents.js'; 
import { useState } from 'react';
import { InputGroup, Form, Col, Row, Button, Container, Navbar, Image } from 'react-bootstrap';
{

  //todo 81-다음: 버튼 비활성화(disable) 해제 조건 구현필요 -> 작성완료시 해제
}

function App() {
  let [inputTitle, setInputTitle] = useState(["e-mail","인증번호","비밀번호","비밀번호 확인","닉네임"])
  let [inputType, setInputType] = useState(["email","number","password","password","text"]);
  let [placeholder, setPlaceholder] = useState([
    "pettodo@abc.com",
    "인증번호 입력하세요. (숫자 6자리)",
    "비밀번호를 입력하세요.(숫자와 특수문자를 포함한 8글자 이상)",
    "비밀번호 재입력",
    "닉네임을 입력하세요"
  ]);
  let [classNames, setClassNames] = useState(["","","","",""])
  let [btnMessage,setBtnMessage] = useState(["인증번호 전송","확인",false,false,false]);
  let [email, setEmail] = useState("")
  let [authCode, setAuthCode] = useState("")
  let [password, setPassword] = useState("")
  let [nickname, setNickname] = useState("")
  let [addr, setAddr] = useState(["api/auth/mail", "api/auth/check"])
  
 

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
              <InputComponent inputTitle={inputTitle} inputType={inputType} placeholder={placeholder} 
                              classNames={classNames} btnMessage={btnMessage} addr={addr} email={email} authCode={authCode}
                              setEmail={setEmail} setAuthCode={setAuthCode} setPassword={setPassword} setNickname={setNickname}/>
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
                    axios.post("http://localhost:8080/api/account/signup",{
                      "email" : email,
                      "password" : password,
                      "nickname" : nickname,
                      "todolist_failure_count" : 0
                    }).then(Response=>console.log(Response)).catch(alert("실패"))
                    console.log(email,authCode,password,nickname)
                }}/>
              </div>
            </Container>
          </Form>
        </div>
      </body>
      <footer></footer>
    </div>
  );
}

function shallowCopy(state, set, value){
  let copy = [...state]
  copy = value;
  set(value);
}

export default App;
