import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import serverUrl from "../serverConfig";
import { Form, Col, Row, Button, Container, Navbar, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { PiDogFill } from 'react-icons/pi';

function Login() {
    const [isLoading, setLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();
    const passwordRef = useRef(null);

    useEffect(() => {
        axios.get(`${serverUrl}/api/user/has-pet`, { withCredentials: true })
            .then((response) => {
                if (response.data.messageDetail === "nothing") {
                    alert("사용자의 펫이 정해지지 않은 상태입니다!");
                    navigate('/signup-pet'); // 펫 등록 페이지로 이동
                } else if (response.data.messageDetail === "has") {
                    alert("이미 로그인 되어 있습니다!");
                    navigate('/'); // 달력 페이지로 이동
                }
            })
            .catch((error) => {
                // 401 에러 처리
            });
    }, []); // 렌더링 최초 1회

    function loginHandler() {
        if (!isLoading) { setLoading(true) }
        if(userId.length <= 0 || userPassword.length <= 0){
            alert("입력 필드를 비울 수 없습니다.")
        }else{
            axios.post(`${serverUrl}/api/account/signin`, {
                "email": userId,
                "password": userPassword,
            }, { withCredentials: true })
                .then((response) => {
                    if (response.status === 200) {
                        navigate('/');
                    } else if (response.status === 400) {
                        if (response.messageDetail === "Not matched error") {
                            alert("비밀번호 또는 아이디가 일치하지 않습니다.");
                        } else {
                            alert("연결과정 중 문제가 발생하였습니다.");
                        }
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 401) {
                            alert("로그인을 다시해주세요!");
                            navigate('/sign-in');
                        } else if (error.response.data.messageDetail === "Not matched error") {
                            alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
                        } else {
                            alert("서버와 연결에 실패했습니다.");
                        }
                    } else {
                        console.error("Error: ", error);
                        if (error.message) {
                            alert("에러: " + error.message);
                        } else {
                            alert("알 수 없는 에러가 발생했습니다.");
                        }
                    }
                });
            }
        setLoading(false);
    }

    const handleKeyDown = (e, nextField) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextField) {
                nextField.current.focus();
            } else {
                loginHandler();
            }
        }
    };

    return (
        <div className='text-center'>
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
            <Col sm={4}>
            </Col>
            <Col sm={8} className='text-center'>
                <h1 className='page-title'>로 그 인</h1>
            </Col>
            <body>
                <div className='text-center w-30p'>
                    <Form className=''>
                        <Form.Group as={Row} className="mb-4" controlId="formHorizontalEmail">
                            <Col sm={4}>
                                <Form.Label column className='float-display'>
                                    <p className='color-darkBlue'><span className='color-red'>*</span> {"Email"}</p>
                                </Form.Label>
                            </Col>
                            <Col className='mb-3' sm={8}>
                                <Form.Control
                                    type="text"
                                    className='form-Control'
                                    placeholder='example123@gmail.com'
                                    onChange={(e) => {
                                        setUserId(e.target.value)
                                    }}
                                    onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4" controlId="formHorizontalPassword">
                            <Col sm={4}>
                                <Form.Label column className='float-display'>
                                    <p className='color-darkBlue'><span className='color-red'>*</span> {"Password"}</p>
                                </Form.Label>
                            </Col>
                            <Col className='mb-3' sm={8}>
                                <Form.Control
                                    type="password"
                                    className='form-Control'
                                    placeholder='비밀번호를 입력하세요'
                                    onChange={(e) => {
                                        setUserPassword(e.target.value)
                                    }}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    ref={passwordRef}
                                />
                            </Col>
                        </Form.Group>
                        <div className='center'>
                            <Button type="button" disabled={isLoading}
                                onClick={loginHandler}>{isLoading ? '확인' : '확인'}
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
                        <p className='color-violet'><Link to='/sign-in'>ID 찾기</Link>/<Link to='/reset-password'>비밀번호 찾기</Link></p>
                    </Col>
                </Stack>
            </footer>
        </div>
    );
}

export default Login;
