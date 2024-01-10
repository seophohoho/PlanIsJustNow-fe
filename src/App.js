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
  const [inputTitle, setInputTitle] = useState(["e-mail","인증번호","비밀번호","비밀번호 확인","닉네임"])
  const [inputType, setInputType] = useState(["email","number","password","password","text"]);
  const [placeholder, setPlaceholder] = useState([
    "pettodo@abc.com",
    "인증번호 입력하세요. (숫자 6자리)",
    "비밀번호를 입력하세요.(숫자와 특수문자를 포함한 8글자 이상)",
    "비밀번호 재입력",
    "닉네임을 입력하세요"
  ]);
  const [classNames, setClassNames] = useState(["","","","",""])
  const [btnMessage,setBtnMessage] = useState(["인증번호 전송","확인",false,false,false]);
  //회원가입 정보 저장
  const [email, setEmail] = useState("")
  const [authCode, setAuthCode] = useState("")
  const [password, setPassword] = useState("")
  const [nickname, setNickname] = useState("")
  //post 정보
  const [addr, setAddr] = useState(["api/auth/mail", "api/auth/check"])
  //버튼 상태 저장
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  
  //유효성 검사 상태(다음 버튼 활성화용)
  const [isNickName, setIsNickName] = useState(false)//연결
  const [isEmail, setIsEmail] = useState(false)//연결
  const [isAuthCode, setIsAuthCode] = useState(false)//연결
  const [isPassword, setIsPassword] = useState(false)//연결
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)//연결

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
              <InputComponent
              inputTitle={inputTitle}
              inputType={inputType}
              placeholder={placeholder}
              password={password}
              classNames={classNames}
              btnMessage={btnMessage}
              addr={addr}
              email={email}
              authCode={authCode}
              nickname={nickname}
              setEmail={setEmail}
              setAuthCode={setAuthCode}
              setPassword={setPassword}
              setNickname={setNickname}
              isNickName={isNickName}
              isEmail={isEmail}
              isAuthCode={isAuthCode}
              isPassword={isPassword}
              isPasswordConfirm={isPasswordConfirm}
              setIsNickName={setIsNickName}
              setIsEmail={setIsEmail}
              setIsAuthCode={setIsAuthCode}
              setIsPassword={setIsPassword}
              setIsPasswordConfirm={setIsPasswordConfirm}
              setIsNextButtonDisabled={setIsNextButtonDisabled}
            />
            }
            <Container>
              <Row>
                <Col>
                  <p className='color-darkBlue'>프로필 사진</p>
                </Col>
                <Col className='center' sm={7}>
                  <Image src="/logo192.png" roundedCircle className='input-bgSet image-w float-display'/>
                  <div className='float-display'>
                    <Button as="input" type="button" value="이미지 선택"/>
                    <p className='color-violet impo-margin-zero'>100px*100px 권장</p>
                    <p className='color-violet'>PNG, JPNG, JPEG가 지원됩니다.</p>
                  </div>
                </Col>
              </Row>
              <div className='center'>
                <Button as="input" type="button" value="다음" disabled={isNextButtonDisabled} onClick={()=>{
                    axios.post("http://localhost:8080/api/account/signup", {
                      "email": email,
                      "password": password,
                      "nickname": nickname,
                      "todolist_failure_count": 0
                    })
                      .then((response) => {
                        console.log(response);
                        if (response.status === 200) {
                        }
                      })
                      .catch((error) => {
                        console.error(error);
                        setIsNextButtonDisabled(true);//실패시 여전히 비활성화
                      });
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

export default App;