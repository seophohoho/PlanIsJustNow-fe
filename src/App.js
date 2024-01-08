import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { InputGroup, Form, Col, Row, Button, Container, Navbar, Image } from 'react-bootstrap';

function App() {
  let [inputsTitle] = useState(["e-mail","인증번호","비밀번호","비밀번호 확인","닉네임"])
  let [inputsType, setInputType] = useState("");
  let [spaceholder, setSpaceholder] = useState("");
  let [btnMessage,setBtnMessage] = useState("");

  //todo 나중에 배열로 합친다음 필요한 정보만 수정, 전달하는 형식으로 변경하는게 좋을듯
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
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Col>
                  <Form.Label column>
                    <p className='color-darkBlue'><span>*</span> e-mail</p> 
                  </Form.Label>
                </Col>
                <Col className='mb-3'>
                  <Form.Control type="email" placeholder="pettodo@abc.com"  onChange={(e)=>{
                    setEmail(e.target.value)}}/>
                </Col>
                <Col>
                 <Button as="input" type="button" value="인증번호 전송" onClick={()=>{
                  //TODO 전달전 양식 올바른지 판단(빈값, @ 있는지)
                  try{
                    axios.post("https://localhost:8080/api/auth/mail",
                      {"email" : email});
                  }catch(error){
                  alert(error + "디버그용: 올바르게 작동하지 않음!")
                 }}}/>{' '}
                </Col>
            </Form.Group>


            <Form.Group as={Row} className="mb-3" controlId="formHorizontalAuth">
              <Form.Label column>
                <p className='color-darkBlue'><span>*</span> 인증번호</p>
              </Form.Label>
              <Col className='mb-3'>
                <Form.Control type="number" placeholder="인증번호 입력하세요. (숫자 6자리)" className='' onChange={(e)=>{
                  setAuthCode(e.target.value);
                }} />
              </Col>
              <Col>
                 <Button as="input" type="button" value="확인" onClick={()=>{
                  //TODO 사용자가 인증번호 전송 버튼을 누르지 않고 해당 버튼을 누르는 경우
                  try{
                  axios.post("https://localhost:8080/api/auth/check",{
                    "email" : email,
                    "code" : authCode});
                 }catch(error){
                  alert("디버그용 올바르게 작동하지 않음!")
                 }}}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column>
                  <p className='color-darkBlue'><span>*</span> 비밀번호</p>
                </Form.Label>
                <Col className='mb-3'>
                  <Form.Control type="password" placeholder="비밀번호를 입력하세요.(숫자와 특수문자를 포함한 8글자 이상)" onChange={(e)=>{
                    //todo 비밀번호가 양식과 일치하는지 확인
                    setPassward(e.target.value);
                  }} />
                </Col>
                <Col>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column>
                  <p className='color-darkBlue'><span>*</span> 비밀번호 확인</p>
                </Form.Label>
                <Col>
                  <Form.Control type="password" placeholder="비밀번호 재입력" onChange={(e)=>{
                    //todo 비밀번호가 일치한지 확인, css로 가려주는 것도 추가해야함
                  }}/>
                </Col>
                <Col>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column>
                <p className='color-darkBlue'><span>*</span> 닉네임</p>
              </Form.Label>
              <Col>
                <Form.Control type="name" placeholder="닉네임을 입력하세요" onChange={(e)=>{
                  setNickname(e.target.value);
                }} />
                {/* 중복확인 기능 필요 */}
              </Col>
              <Col>
              </Col>
            </Form.Group>

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
                  try{
                    axios.post("https://localhost:8080/api/account/signup",{
                      "email" : email,
                      "password" : password,
                      "nickname" : nickname})
                  }catch(error){
                    alert("디버그용 올바르게 작동하지 않음!")}
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

// function InputModal(){
//   return(
//     <>
//       <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//           <Col>
//             <Form.Label column>
//               <p className='color-darkBlue'><span>*</span> { inputsTitle }</p> 
//             </Form.Label>
//           </Col>
//           <Col className='mb-3'>
//             <Form.Control type={ inputsType } placeholder={ placeholder } className={css클래스} onChange={(e)=>{
//               state셋내용}}/>
//           </Col>
//           <Col>
//             <Button as="input" type="button" value={ btnMessage } onClick={()=>{}}/>
//           </Col>
//       </Form.Group>
//     </>
//   )
// }

function shallowCopy(state, set, value){
  let copy = [...state]
  copy = value;
  set(value);
}
export default App;
