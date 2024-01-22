import axios from 'axios';
import { useState } from 'react';
import { serverUrl } from "../serverConfig"
import { Form, Col, Row, Button, Image, Container, Navbar, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import {  } from "../store/store"//수정할 함수 import 해야함

function SignUpPet() {

    const state = useSelector((state)=>{return state})//store에 있는 state 가져옴
    const dispatch = useDispatch()//state변경 함수 사용할때 둘러야함

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

            <h1 className='page-title'>펫 선택하기</h1>

            <body>
                <div className='center'>
                    <Container fluid>
                        <Row>
                            <Col md="7">
                                <Stack direction='horizontal' gap={1} className='margin-bottom-20'>
                                    <PetCircleImage/>
                                    <PetCircleImage/>
                                    <PetCircleImage/>
                                    <PetCircleImage/>
                                </Stack>
                                <Stack direction='horizontal' gap={1} className='margin-bottom-20'>
                                    <PetCircleImage/>
                                    <PetCircleImage/>
                                    <PetCircleImage/>
                                    <PetCircleImage/>
                                </Stack>
                                <Stack direction='horizontal' gap={1} className='margin-bottom-20'>
                                    <PetCircleImage/>
                                    <PetCircleImage/>
                                    <PetCircleImage/>
                                    <PetCircleImage/>
                                </Stack>
                            </Col>
                            <Col md="5">{/* 완성후 component로 전환 */}
                                <Stack className='center margin-bottom-10'>
                                    <Image src="/700x460.png" fluid/>
                                    <Stack direction='horizontal' gap={2}  className='center margin-bottom-10'>
                                        <Form.Label column sm="4" className='color-darkBlue'>
                                            펫 이름
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" placeholder={state.petName} />
                                        </Col>
                                    </Stack>
                                    <p className='color-lightPurple'>{state.petInpo}</p>{/* 캐릭터 설명 라벨 */}
                                </Stack>
                                <Button variant="primary"
                                onClick={SelectBtnAct}
                                >이 펫으로 할래요!</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </body>
            <footer>

            </footer>        
        </div>
    );
}

function SelectBtnAct(){
    axios.post("",)
}

function PetCircleImage(){
    const state = useSelector((state)=>{return state})
    const dispatch = useDispatch()
    return(
        <Stack gap={1}>
            <Image src={'/thumbnail.png'} roundedCircle className='pet-image border-outline'
            onClick={""}//todo 버튼 클릭으로 해당하는 state로 변경할 수 있는 장치?
            />
            <p className='pet-image color-lightPurple'>{state.petName}</p>
        </Stack>
    )
}

function PetInpoComponent(){
    return(
        <>
        </>
    )
}

export default SignUpPet;