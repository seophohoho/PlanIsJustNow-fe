import axios from 'axios';
import serverUrl from "../serverConfig"
import { Col, Row, Container, Navbar, Image, Stack, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import PetInfo from '../components/PetInpo';
import PetListMapComponent from '../components/PetListMapComponent.js';
import chunkArray from '../function/chunkArray.js';
import InputFieldComponent from '../components/InputFieldComponent.js';
import { useEffect, useState } from 'react';

//Todo 모든 post 버튼에 로딩 css 로직 추가
function SignUpPet() {
    const state = useSelector((state)=>{return state.petList})//store에 있는 state 가져옴
    const dispatch = useDispatch()//state변경 함수 사용할때 둘러야함

    const [selectedPetIndex, setSelectedPetIndex] = useState(0); // 선택된 펫 인덱스의 초기값 설정

    return (
        <div>
            <header>
                <Navbar expand="md" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/calendar">
                            <img src='/logo192.png'width={"50px"}></img>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </header>

            <h1 className='page-title'>펫 선택하기</h1>

            <body>
                <div className='center From'>
                    <Container fluid>
                        <Row className='center'>
                            <Col md="7">
                                <PetListMapComponent
                                    petList={state}
                                    selectedPetIndex={selectedPetIndex}
                                    onSelectPet={setSelectedPetIndex}
                                />
                            </Col>
                                <PetInfo
                                    btnMessage="이 펫으로 할래요!"
                                    ClickHandler={() => { SelectBtnAct(); }}
                                >
                                    <Image src="/700x460.png" fluid />
                                    <Stack direction='horizontal' gap={2} className='center margin-bottom-10'>
                                        <Form.Label column sm="4" className='color-darkBlue'>펫 이름</Form.Label>   
                                        <Col sm="8">
                                            <InputFieldComponent
                                                type="text"
                                                placeholder={state.data[selectedPetIndex].species}
                                                onChangeHandler={""}
                                            />
                                        </Col>
                                    </Stack>
                                    <p className='color-lightPurple'>{state.data[selectedPetIndex].info}</p>
                                </PetInfo>
                        </Row>
                    </Container>
                </div>
            </body>
            <footer>

            </footer>        
        </div>
    );
}

//내부로 이동
function SelectBtnAct(pet_id, pet_name){
    axios.post(`${serverUrl}/api/user/pet-signup`,
    {withCredentials: true},
    {

    }
    ).then(Response=>{
        console.log("yes")
    }).catch(error=>{
        console.log(error)
    })
}



export default SignUpPet;