import axios from 'axios';
import { useState } from 'react';
import serverUrl from "../serverConfig"
import { Form, Col, Row, Button, Image, Container, Navbar, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import InputComponent from '../components/SignUpComponents.js';

function Login() {
  return(
    <div className='text-center'>
        <header>
            <Navbar expand="md" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#">
                        <img src='/logo192.png'width={"50px"}></img>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>

        <h1 className='page-title'>로 그 인</h1>

        <body>
            <div className='text-center w-30p'>
                <Form className=''>
                    <Form.Group as={Row} className="mb-4" controlId="formHorizontalEmail">
                            <Col sm={4}>
                                <Form.Label column>{/** label칸 */}
                                <p className='color-darkBlue'><span className='color-red'>*</span> {"Email"}</p> 
                                </Form.Label>
                            </Col>
                            <Col className='mb-3' sm={8}>{/** input칸 */}
                            <Form.Control 
                                    type="text" 
                                    className='form-Control'
                                    placeholder='example123@gmail.com'
                                />
                            </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4" controlId="formHorizontalEmail">
                            <Col sm={4}>
                                <Form.Label column>{/** label칸 */}
                                <p className='color-darkBlue'><span className='color-red'>*</span> {"Password"}</p> 
                                </Form.Label>
                            </Col>
                            <Col className='mb-3' sm={8}>{/** input칸 */}
                                <Form.Control 
                                    type="password" 
                                    className='form-Control'
                                    placeholder='비밀번호를 입력하세요'
                                />
                            </Col>
                    </Form.Group>
                    <div className='center'>
                        <Button as="input" type="button" value="확인"
                        onClick={()=>{
                            axios.post(`${serverUrl}/api/account/signup`, {//url body 수정

                            })
                            .then((response) => {
                                
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                        }}/>
                    </div>
                </Form>
            </div>
        </body>
        <footer>
            <Stack>
                <Col>
                    <p>ID 혹은 비밀번호를 잃어버리셨나요?</p>
                </Col>
                <Col>
                    <p><a href='#'>ID찾기</a>/<a href='#'>비밀번호 찾기</a></p>
                </Col>
            </Stack>

        </footer>
    </div>
  );
}

export default Login;