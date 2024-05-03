import axios from 'axios';
import { useEffect, useState } from 'react';
import serverUrl from "../serverConfig"
import InputFieldComponent from '../components/InputFieldComponent';
import { Form, Col, Row, Button, Container, Navbar, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function FindPassword() {

    const [isEmailDisabled, setIsEmailDisabled] = useState(false);
    const [isAuthDisabled, setIsAuthDisabled] = useState(true);
    const [userEmail, setUserEmail] = useState('');

    function btnEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,6}$/;
      
        // return은 실패, 성공에 따른 인증확인 버튼 활성화 상태 반환용
        if (emailRegex.test(email)) {
          try {//debounce 라이브러리 사용 예정 처리 시간당 요청은 몇번?
            const Response = axios.post(`${serverUrl}/api/auth/mail`, {"email": email});
            if (Response.status === 200) {
              alert("인증메일이 발송됐어요!");
              setIsEmailDisabled(true)
              setIsAuthDisabled(false)
              return false;
            }
          } catch (error) {
            alert(error + ": 메일발송에 실패했습니다. 잠시후 다시 시도해주세요");
            return true;
          }
        } else {
          alert("이메일 양식을 다시 확인해주세요..");
          return true;
        }
    }
    
    return(
    <div className='text-center'>
        <header>
            <Navbar expand="md" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#">
                        <img src='/logo192.png'width={"50px"}></img>
                        <h1 style={{display: "inline"}} className=''>PETTODO</h1>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>

        <h1 className='page-title'>비 밀 번 호  찾 기</h1>

        <body className='App'>
            <div className='text-center w-30p h-410'>
            <Form className='m-top-5em'>
                <Form.Group 
                as={Row} 
                className="mb-4" 
                controlId="formHorizontalEmail">
                        <Col sm={3} className='text-left'>
                            <Form.Label column>{/** label칸 */}
                                <p className='color-darkBlue'>Email</p> 
                            </Form.Label>
                        </Col>
                        <Col className='mb-3' sm={6}>{/** input칸 */}
                        <Form.Control 
                        type="text"
                        className='form-Control'
                        placeholder='example123@gmail.com'
                        disabled={isEmailDisabled}
                        onChange={(e)=>{
                            setUserEmail(e.target.value)
                        }}
                        />
                        </Col>
                        <Col className='text-left' sm={3}>
                        <Button 
                        as="input" 
                        type="button" 
                        value="확인" 
                        disabled={isEmailDisabled}
                        onClick={()=>{
                            console.log(userEmail)
                            setIsAuthDisabled(false)
                            btnEmail(userEmail)
                        }}/> 
                    </Col>
                </Form.Group>
                <Form.Group 
                as={Row} 
                className="mb-4" 
                controlId="formAuthEmail">
                    <Col className='text-left' sm={3}>
                        <Form.Label column>{/** label칸 */}
                            <p className='color-darkBlue'>인증번호</p>
                        </Form.Label>
                    </Col>
                    <Col className='mb-3' sm={6}>{/** input칸 */}
                        <Form.Control 
                        type="number" 
                        maxLength={6} 
                        className="form-Control" 
                        onInput={(e) => {
                            const value = e.target.value
                            if (e.target.value.length > e.target.maxLength){
                                e.target.value = e.target.value.slice(0, e.target.maxLength);
                            }
                        }}
                        disabled={isAuthDisabled}
                        onChange={(e) => {
                            const value = e.target.value;
                        }}/>
                    </Col>
                    <Col className='text-left' sm={3}>
                        <Button 
                        as="input" 
                        type="button" 
                        value="인증확인" 
                        disabled={isAuthDisabled}
                        onClick={()=>{
                            setIsAuthDisabled(true)
                        }}/> 
                    </Col>
                </Form.Group>
            </Form>
            </div>
        </body>
        <footer>
        </footer>
    </div>
  );
}



export default FindPassword;