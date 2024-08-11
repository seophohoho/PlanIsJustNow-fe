import axios from 'axios';
import { useEffect, useState } from 'react';
import serverUrl from "../serverConfig"
import { Form, Col, Row, Button, Container, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { PiDogFill } from 'react-icons/pi';

const ResetPassword = () =>{
    const navigate = useNavigate()
    const [isPostDisabled, setIsPostDisabled] = useState(false)
    
    return(
        <div className='text-center'>
            <Navbar expand="md" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/sign-in" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <PiDogFill size={60} />
                        <h1 style={{ display: 'inline', marginLeft: '10px' }}>계딱지</h1>
                    </Navbar.Brand>
                </Container>
            </Navbar>

        <h1 className='page-title'>비 밀 번 호  변 경</h1>

        <div className='App'>
            <div className='text-center w-30p h-410'>
            <Form className='m-top-5em'>
                <Form.Group 
                as={Row} 
                className="mb-4" 
                controlId="formHorizontalEmail">
                        <Col sm={3} className='text-left'>
                            <Form.Label column>{/** label칸 */}
                                <p className='color-darkBlue'>새 비밀번호</p> 
                            </Form.Label>
                        </Col>
                        <Col className='mb-3' sm={6}>{/** input칸 */}
                        <Form.Control 
                        type="email"
                        className='form-Control'
                        onChange={(e)=>{
                            //password state
                        }}
                        />
                        </Col>
                        <Col className='text-left' sm={3}>
                        
                    </Col>
                </Form.Group>
                <Form.Group 
                as={Row} 
                className="mb-4" 
                controlId="formAuthEmail">
                    <Col className='text-left' sm={3}>
                        <Form.Label column>{/** label칸 */}
                            <p className='color-darkBlue'>비밀번호 재입력</p>
                        </Form.Label>
                    </Col>
                    <Col className='mb-3' sm={6}>{/** input칸 */}
                        <Form.Control 
                        type="text" 
                        maxLength={20}
                        className="form-Control" 
                        onChange={(e) => {
                            const value = e.target.value;//password 재입력 state
                            //rex랑 auth 관련은 회원가입에ㅓ 재사용
                        }}/>
                    </Col>
                    <Col className='text-left' sm={3}>
                        <Button 
                        as="input" 
                        type="button" 
                        value="변경" 
                        disabled={isPostDisabled}
                        onClick={()=>{
                            setIsPostDisabled(true)
                        }}/> 
                    </Col>
                </Form.Group>
            </Form>
            </div>
        </div>
        <footer>
        </footer>
    </div>
    )    
}

export default ResetPassword