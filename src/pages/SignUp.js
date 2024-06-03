import axios from 'axios';
import serverUrl from '../serverConfig.js';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import InputComponent from '../components/SignUpComponents.js'; 
import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Col, Row, Button, Container, Navbar, Image, Stack } from 'react-bootstrap';
import { PiDogFill } from 'react-icons/pi';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import handleError from '../function/errorHandler.js';

function Signup() {
  const [inputTitle, setInputTitle] = useState(["e-mail","인증번호","비밀번호","비밀번호 확인","닉네임"]);
  const [inputType, setInputType] = useState(["email","number","password","password","text"]);
  const [placeholder, setPlaceholder] = useState([
    "pettodo@abc.com",
    "인증번호 입력하세요. (숫자 6자리)",
    "비밀번호를 입력하세요.(숫자와 특수문자를 포함한 8글자 이상)",
    "비밀번호 재입력",
    "닉네임을 입력하세요"
  ]);
  const [classNames, setClassNames] = useState(["form-Control","form-Control","form-Control","form-Control","form-Control"]);
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
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const navigate = useNavigate();
  
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Blob 객체의 임시 URL 생성
    }
  };
  // public에 이미지 파일저장 해당 파일 이용하는 형식으로 변경


    const handleSubmit = async () => {
    setIsNextButtonDisabled(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("nickname", nickname);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    //response를 따로 빼서 try catch로 하는 깔끔한 방법 있던데 고려해보자
    await axios.post(`${serverUrl}/api/account/signup`, formData, {
      headers: {"Content-Type": "multipart/form-data"},
      withCredentials: true
    })
    .then((response)=>{
      if (response.status === 200) {
        alert("회원가입이 완료되었습니다!!");
        navigate('/sign-in');
      } else if (response.status === 409) {
        alert("이미 사용중인 이메일 계정입니다!");
        setIsNextButtonDisabled(false);
      }
    })
    .catch((error=>{
      console.error(error);
      alert("서버에 문제가 발생했습니다. 나중에 잠시 후 다시 시도해주세요");
      setIsNextButtonDisabled(false);
    }))
  };
  
  return (
    <div>
      <header>
       <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/sign-in" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <PiDogFill size={60} />
            <h1 style={{ display: 'inline', marginLeft: '10px' }}>PETTODO</h1>
          </Navbar.Brand>
        </Container>
        </Navbar>
      </header>

      <h1 className='page-title'>회원가입</h1>

      <body>
        <div className='App'>
          <Form className='text-center'>
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
            <Container>
              <Row className='flex-item-center'>
                <Col sm={3}>
                  <p className='color-darkBlue float-display'>프로필 사진</p>
                </Col>
                <Col sm={2}>
                  <Avatar 
                    size={72} 
                    icon={previewUrl ? <Image src={previewUrl} roundedCircle style={{ width: '72px', height: '72px' }} /> : <UserOutlined />} 
                  />
                </Col>
                <Col sm={7}>
                  <Stack>
                    <p className='color-violet impo-margin-zero'>100px*100px 권장</p>
                    <p className='color-violet'>PNG, JPG, JPEG가 지원됩니다.</p>
                    <Form.Control 
                      ref={fileInputRef} 
                      type="file" 
                      accept='.png, .jpg, .jpeg' 
                      className='form-Control' 
                      onChange={handleFileChange}
                    />
                  </Stack>
                </Col>
              </Row>
              <div className='center'>
                <Button as="input" type="button" value="다음" disabled={isNextButtonDisabled} 
                onClick={handleSubmit}
                />
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
