import axios from 'axios';
import serverUrl from '../serverConfig.js';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import InputComponent from '../components/SignUpComponents.js'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Col, Row, Button, Container, Navbar, Image } from 'react-bootstrap';


function Signup() {
  const [inputTitle, setInputTitle] = useState(["e-mail","인증번호","비밀번호","비밀번호 확인","닉네임"])
  const [inputType, setInputType] = useState(["email","number","password","password","text"]);
  const [placeholder, setPlaceholder] = useState([
    "pettodo@abc.com",
    "인증번호 입력하세요. (숫자 6자리)",
    "비밀번호를 입력하세요.(숫자와 특수문자를 포함한 8글자 이상)",
    "비밀번호 재입력",
    "닉네임을 입력하세요"
  ]);
  const [classNames, setClassNames] = useState(["form-Control","form-Control","form-Control","form-Control","form-Control"])
  const [btnMessage,setBtnMessage] = useState(["인증번호 전송","확인",false,false,false]);
  //회원가입 정보 저장
  const [email, setEmail] = useState("")
  const [authCode, setAuthCode] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [nickname, setNickname] = useState("")
  //post 정보
  const [addr, setAddr] = useState(["api/auth/mail", "api/auth/check"])
  //버튼 disabled상태 저장
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)
  //input disabled 상태 저장
  const [isInputDisabled, setIsInputDisabled] = useState(false)
  //유효성 검사 상태(다음 버튼 활성화용)
  const [isEmail, setIsEmail] = useState(false)
  const [isAuthCode, setIsAuthCode] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isNickName, setIsNickName] = useState(false)
  
  const navigate = useNavigate();

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
          <Form className='text-center'>
            {
              <InputComponent
              inputTitle={inputTitle}
              inputType={inputType}
              placeholder={placeholder}
              password={password}
              passwordConfirm={passwordConfirm}
              classNames={classNames}
              btnMessage={btnMessage}
              addr={addr}
              email={email}
              authCode={authCode}
              nickname={nickname}
              setEmail={setEmail}
              setAuthCode={setAuthCode}
              setPassword={setPassword}
              setPasswordConfirm={setPasswordConfirm}
              setNickname={setNickname}
              isEmail={isEmail}
              isNickName={isNickName}
              isAuthCode={isAuthCode}
              isPassword={isPassword}
              setIsEmail={setIsEmail}
              setIsNickName={setIsNickName}
              setIsAuthCode={setIsAuthCode}
              setIsPassword={setIsPassword}
              isNextButtonDisabled={isNextButtonDisabled}
              setIsNextButtonDisabled={setIsNextButtonDisabled}
              setIsInputDisabled={setIsInputDisabled}
              isInputDisabled={isInputDisabled}
            />
            }
            <Container>
              <Row>
                <Col>
                  <p className='color-darkBlue float-display'>프로필 사진</p>
                </Col>
                <Col className='center' sm={7}>
                  <Image src="/logo192.png" roundedCircle className='input-bgSet float-display w-25 '/>{/**state로 저장된 선택된 파일을 보여줌 */}
                  <div className=''>
                    <p className='color-violet impo-margin-zero'>100px*100px 권장</p>
                    <p className='color-violet'>PNG, JPNG, JPEG가 지원됩니다.</p>
                    <Form.Control type="file" accept='.png, .jpng, .jpeg' className='form-Control'/>{/**파일 선택한 파일 서버로 post후 서버에서 해당 id 이미지 받아오느 걸로 */}
                  </div>
                </Col>
              </Row>
              <div className='center'>
                <Button as="input" type="button" value="다음" disabled={isNextButtonDisabled} 
                onClick={()=>{
                    setIsNextButtonDisabled(true)
                    axios.post(`${serverUrl}/api/account/signup`, {
                      "email": email,
                      "password": password,
                      "nickname": nickname,
                      "todolist_failure_count": 0
                    })
                      .then((response) => {
                        //todo 로딩 state 연동하기(1개의 state 필요)
                        if (response.status === 200) {
                          alert("회원가입이 완료되었습니다!!")
                          navigate('/');
                        }
                        if (response.status === 409){
                          alert("이미 사용중인 이메일 계정입니다!")
                          setIsNextButtonDisabled(false)
                        }
                      })
                      .catch((error) => {
                        console.error(error);
                        alert("서버에 문제가 발생했습니다. 나중에 잠시 후 다시 시도해주세요")
                        setIsNextButtonDisabled(false)
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

export default Signup;