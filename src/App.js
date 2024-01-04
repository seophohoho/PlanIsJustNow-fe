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
                  <Form.Label column sm={5}>
                  <p className='color-darkBlue'><span>*</span> e-mail</p> 
                  </Form.Label>
                <Col sm={5}>
                  <Form.Control type="email" placeholder="pettodo@abc.com" className=''/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalAuth">
              <Form.Label column sm={5}>
                <p className='color-darkBlue'><span>*</span> 인증번호</p>
              </Form.Label>
              <Col sm={5}>
                <Form.Control type="email" placeholder="인증번호 입력하세요. (숫자 6자리)" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
              <Form.Label column sm={5}>
                <p className='color-darkBlue'><span>*</span> 비밀번호</p>
              </Form.Label>
              <Col sm={5}>
                <Form.Control type="password" placeholder="비밀번호를 입력하세요.(숫자와 특수문자를 포함한 8글자 이상)" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={5}>
                  <p className='color-darkBlue'><span>*</span> 비밀번호 확인</p>
                </Form.Label>
                <Col sm={5}>
                  <Form.Control type="passwordCheck" placeholder="비밀번호 재입력" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={5}>
                <p className='color-darkBlue'><span>*</span> 닉네임</p>
              </Form.Label>
              <Col sm={5}>
                <Form.Control type="name" placeholder="닉네임을 입력하세요" />
              </Col>
            </Form.Group>

            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <Image src="/logo192." roundedCircle />
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </body>
      <footer></footer>
    </div>
  );
}

export default App;
