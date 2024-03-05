import axios from 'axios';
import { useState } from 'react';
import serverUrl from "../serverConfig"
import { Form, Col, Row, Button, Image, Container, Navbar, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate } from 'react-router-dom';

function Login() {
    const [isLoading, setLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("")

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
                                    onChange={(e)=>{
                                        setUserId(e.target.value)
                                    }}
                                />
                            </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4" controlId="formHorizontalEmail">
                            <Col sm={4}>
                                <Form.Label column>{/** label칸 */}
                                <p className='color-darkBlue'><span className='color-red w-max'>*</span> {"Password"}</p> 
                                </Form.Label>
                            </Col>
                            <Col className='mb-3' sm={8}>{/** input칸 */}
                                <Form.Control 
                                    type="password" 
                                    className='form-Control'
                                    placeholder='비밀번호를 입력하세요'
                                    onChange={(e)=>{
                                        setUserPassword(e.target.value)
                                    }}
                                />
                            </Col>
                    </Form.Group>
                    <div className='center'>
                        <Button type="button" disabled={isLoading}
                            onClick={()=>{
                                if(!isLoading){setLoading(true)}
                                axios.post(`${serverUrl}/api/account/signin`, {
                                    "email" : userId,
                                    "password" : userPassword,
                                })
                                .then((response) => {
                                    if(response.status === 200){
                                        alert("로그인 성공 status: 200")
                                        setLoading(false);//성공하면 풀어줄 이유가 없지않나? 나중에 판단
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                    setLoading(false);
                                })  
                            }}>{isLoading ? '확인' : '확인'}
                        </Button>
                    </div>
                </Form>
            </div>
        </body>
        <footer>
            <Stack>
                <p className='color-violet'>계정이 아직 없으신가요? <Link to='/signup'>회원가입</Link>하기</p>
            </Stack>
            <hr className='hr-1'></hr>
            <Stack>
                <Col>
                    <p className='color-violet'>ID 또는 비밀번호를 잃어버리셨나요?</p>
                </Col>
                <Col>
                    <p className='color-violet'><Link to='/'>ID 찾기</Link>/<Link to='/'>비밀번호 찾기</Link></p>
                </Col>
            </Stack>
            

        </footer>
    </div>
  );
}

export default Login;