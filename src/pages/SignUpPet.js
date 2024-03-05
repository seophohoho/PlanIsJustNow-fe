import axios from 'axios';
import { useState } from 'react';
import serverUrl from "../serverConfig"
import { Form, Col, Row, Button, Image, Container, Navbar, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { selectPetId, selectPetName } from "../store/store"//수정할 함수 import 해야함
//todo 선택 안한 상태의 기본이미지, 캐릭터 설명 설정
//todo 선택했을 시 css 효과 및 로직 수정 : 새로운 캐릭터 설정시 버튼 전체를 원래 css 로 변경후 선택된 image css로 변경
//Todo 모든 post 버튼에 로딩 css 로직 추가
function SignUpPet() {

    const state = useSelector((state)=>{return state})//store에 있는 state 가져옴
    const dispatch = useDispatch()//state변경 함수 사용할때 둘러야함
    const [selectedPetIndex, setSelectedPetIndex] = useState(null);
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
                <div className='center From'>
                    <Container fluid>
                        <Row className='center'>
                            <Col md="7">
                            <Stack direction="vertical" gap={1} className="margin-bottom-20">
                                {chunkArray(state.petName, 4).map((petNamesChunk, chunkIndex) => (
                                    <Stack key={chunkIndex} direction="horizontal" gap={1} className="margin-bottom-20">
                                        {petNamesChunk.map((petName, index) => (
                                            <PetCircleImage
                                                key={index}
                                                petName={petName}
                                                petId={state.petId[chunkIndex * 4 + index]}
                                                isSelected={(chunkIndex * 4 + index) === selectedPetIndex}
                                                onClick={() => {
                                                    setSelectedPetIndex(chunkIndex * 4 + index);
                                                    dispatch(selectPetId(state.petId[chunkIndex * 4 + index]));
                                                    dispatch(selectPetName(petName));
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                ))}
                            </Stack>
                            </Col>
                            {chunkArray(state.petName, 12).map((petNamesChunk, chunkIndex) => (
                                <PetInfo
                                    key={chunkIndex}
                                    petName={state.petName[chunkIndex]}
                                    petInpo={state.petInpo[chunkIndex]}
                                    onClick={() => { SelectBtnAct(state.petSelected.id, state.petSelected.name); }}
                                />
                            ))}
                        </Row>
                    </Container>
                </div>
            </body>
            <footer>

            </footer>        
        </div>
    );
}

function SelectBtnAct(pet_id, pet_name){
    axios.post(`${serverUrl}/api/user/choice-pet`,{
        "email" : "test@email.com",//추후 수정 : 로그인 되어있는 계정 정보 전송으로 변경
        "species" : pet_id,
        "nickname" : pet_name
    }).then(Response=>{
        console.log("yes")
    }).catch(error=>{
        console.log(error)
    })
}

function PetCircleImage(props){
    const { petName, petId, isSelected } = props;

    // isSelected 상태에 따라 동적으로 스타일 적용
    const selectedStyle = isSelected
        ? "pet-image border-outline-select"
        : "pet-image border-outline";

    return (
        <Stack gap={1}>
            <Image
                src={'/thumbnail.png'} // 이미지 디자인 완성시 -> state.petImages[i]로 변경 chunkIndex props로 받아와서 i에 적용
                roundedCircle
                className={selectedStyle}
                onClick={props.onClick}
            />
            <p className='pet-image color-lightPurple'>{petName}</p>
        </Stack>
    )
}

function PetInfo(props) {
    const { petName, petInpo, onClick } = props;
    const dispatch = useDispatch();
    return (
        <Col md="5">
            <Stack className='center margin-bottom-10'>
                <Image src="/700x460.png" fluid />
                <Stack direction='horizontal' gap={2} className='center margin-bottom-10'>
                    <Form.Label column sm="4" className='color-darkBlue'>
                        펫 이름
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            placeholder={petName}
                            onChange={(e) => { dispatch(selectPetName(e.target.value)); }}
                        />
                    </Col>
                </Stack>
                <p className='color-lightPurple'>{petInpo}</p>
            </Stack>
            <Button variant="primary" className='font-bold' onClick={onClick}>
                이 펫으로 할래요!
            </Button>
        </Col>
    );
}

// 배열을 지정된 크기의 묶음으로 나누는 함수
function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

export default SignUpPet;