import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { InputGroup, Form, Col, Row, Button, Container, Navbar, Image } from 'react-bootstrap';

function App() {
  let inputs = useState(["e-mail","인증번호","비밀번호","비밀번호 확인","닉네임"])

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
                  <Form.Control type="email" placeholder="pettodo@abc.com" className=''/>
                </Col>
                <Col>
                 <Button as="input" type="button" value="인증번호 전송"/>{' '}
                </Col>
            </Form.Group>


            <Form.Group as={Row} className="mb-3" controlId="formHorizontalAuth">
              <Form.Label column>
                <p className='color-darkBlue'><span>*</span> 인증번호</p>
              </Form.Label>
              <Col className='mb-3'>
                <Form.Control type="email" placeholder="인증번호 입력하세요. (숫자 6자리)" />
              </Col>
              <Col>
                 <Button as="input" type="button" value="확인"/>{' '}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column>
                  <p className='color-darkBlue'><span>*</span> 비밀번호</p>
                </Form.Label>
                <Col className='mb-3'>
                  <Form.Control type="password" placeholder="비밀번호를 입력하세요.(숫자와 특수문자를 포함한 8글자 이상)" />
                </Col>
                <Col>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column>
                  <p className='color-darkBlue'><span>*</span> 비밀번호 확인</p>
                </Form.Label>
                <Col>
                  <Form.Control type="passwordCheck" placeholder="비밀번호 재입력" />
                </Col>
                <Col>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column>
                <p className='color-darkBlue'><span>*</span> 닉네임</p>
              </Form.Label>
              <Col>
                <Form.Control type="name" placeholder="닉네임을 입력하세요" />
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
                    <p className='color-violet'>PNG, JPNG, JPEG가 지원</p>
                  </div>
                </Col>
              </Row>
              <div className='center'>
                <Button as="input" type="button" value="다음" />
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
