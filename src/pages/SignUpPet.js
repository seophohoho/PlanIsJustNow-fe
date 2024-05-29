import axios from 'axios';
import serverUrl from "../serverConfig"
import { Col, Row, Container, Navbar, Image, Stack, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import PetInfo from '../components/PetInpo';
import PetListMapComponent from '../components/PetListMapComponent.js';
import InputFieldComponent from '../components/InputFieldComponent.js';
import { petListInit } from '../store/store.js';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PiDogFill } from 'react-icons/pi';
import handleError from '../function/errorHandler.js';

//Todo 모든 post 버튼에 로딩 css 로직 추가
function SignUpPet() {
    const state = useSelector((state)=>{return state.petList})//store에 있는 state 가져옴
    const dispatch = useDispatch()//state변경 함수 사용할때 둘러야함
    const navigate = useNavigate()
    const [selectedPetIndex, setSelectedPetIndex] = useState(0); // 선택된 펫 인덱스의 초기값 설정

    function petSelectHandler(chunkIndex, index) {//handler 이름 변경 Choice? 기능도 몇개 추가
        const listIndex = chunkIndex * 4 + index;
        setSelectedPetIndex(listIndex);
        setPetPostData({
            species : state.data[listIndex].idx,
            nickname : state.data[listIndex].species
            /* 변경된 lastChoice 부분을 추가로 post, 여기서는 state만 업데이트 보내는 것은 부모에서
            이동할 때 서버에서 get 하니 클라 쪽 업데이트는 필요 X*/
        })
    }

    useEffect(()=>{
        axios.get(`${serverUrl}/api/user/all-pet-info`,
        {withCredentials: true})
        .then(response=>{
            if(response.status === 200){
                dispatch(petListInit(response.data))
                setSelectedPetIndex(0)
            }
        })
        .catch((error) => {
            handleError(error, navigate)
        })
    },[])

    
    const [inputNickname, setInputNickname] = useState('');  // 입력 필드 상태
    const [petPostData, setPetPostData] = useState({
        species: '', // idx
        nickname: ''
    });
    
    useEffect(() => {
        setInputNickname('');// 입력 필드를 빈 문자열로 설정

        if (state.data.length > selectedPetIndex) {
            setPetPostData({
                species: state.data[selectedPetIndex].idx,
                nickname: state.data[selectedPetIndex].species
            });
        }
    }, [selectedPetIndex, state.data]);


    const handleInputChange = (event) => {
        const { value } = event.target;  // 사용자 입력값을 변수로 추출
        setInputNickname(value);  // 로컬 상태 업데이트
        setPetPostData(prevState => ({
            ...prevState,
            nickname: value  // 전역 상태 업데이트
        }));
    };
    

    function SelectBtnAct(){
        axios.post(`${serverUrl}/api/user/pet-signup`,
        {
            "species": petPostData.species, //pet idx 
            "nickname": petPostData.nickname //pet name
        },
        {withCredentials: true}
        ).then(response=>{
            if(response.data){
                if(response.data.messageTitle == "success"){
                    alert("펫이 선택되었습니다!")
                    navigate('/')
                }
                else{
                    alert("서버와 연결에 실패하였습니다.")
                }
            }
        })
        .catch((error) => {
            handleError(error, navigate)
        })
    }

    return (
        <div>
            <header>
                <Navbar expand="md" className="bg-body-tertiary">
                    <Container>
                    <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <PiDogFill size={60} />
                        <h1 style={{ display: 'inline', marginLeft: '10px' }}>PETTODO</h1>
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
                                    petList={state.data}
                                    selectedPetIndex={selectedPetIndex}
                                    onSelectPet={setSelectedPetIndex}
                                    setPetPostData={setPetPostData}
                                    eventHandler={petSelectHandler}
                                />
                            </Col>
                            <PetInfo
                                btnMessage="이 펫으로 할래요!"
                                clickHandler={() => { SelectBtnAct(); }}
                            >
                                <Image src="/700x460.png" fluid />
                                <Stack direction='horizontal' gap={2} className='center margin-bottom-10'>
                                    <Form.Label column sm="4" className='color-darkBlue'>펫 이름</Form.Label>   
                                    <Col sm="8">
                                        <InputFieldComponent
                                            type="text"
                                            placeholder={state.data[selectedPetIndex].species}
                                            onChangeHandler={handleInputChange}
                                            value={inputNickname}
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

export default SignUpPet;