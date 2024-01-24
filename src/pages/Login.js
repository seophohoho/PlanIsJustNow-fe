import axios from 'axios';
import { useState } from 'react';
import serverUrl from "../serverConfig"
import { Form, Col, Row, Button, Image, Container, Navbar, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"

function Login() {//로딩기능 구현 우선 후 할거없으면 pupeteer 프레임워크 확인
    const [isLoading, setLoading] = useState(false);

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
                        <Button type="button" disabled={isLoading}
                            onClick={()=>{
                                if(!isLoading){setLoading(true)}
                                axios.post(`${serverUrl}/api/account/login`, {//url body 수정

                                })
                                .then((response) => {
                                    setLoading(false);//성공하면 풀어줄 이유가 없지않나? 나중에 판단
                                })
                                .catch((error) => {
                                    console.error(error);
                                    setLoading(false);
                                })
                            }}>{isLoading ? 'Loading…' : '확인'}
                        </Button>
                    </div>
                </Form>
            </div>
        </body>
        <footer>
            <Stack>
                <Col>
                    <p className='color-violet'>ID 혹은 비밀번호를 잃어버리셨나요?</p>
                </Col>
                <Col>
                    <p className='color-violet'><a href='#'>ID 찾기</a>/<a href='#'>비밀번호 찾기</a></p>
                </Col>
            </Stack>

        </footer>
    </div>
  );
}

export default Login;