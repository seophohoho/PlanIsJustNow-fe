import NavbarComponent from "../components/NavbarComponent";
import { Col, Row, Container,Image,Stack,Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { petdexInit, userDataInit } from "../store/store.js";
import PetInfo from '../components/PetInpo';
import PetListMapComponent from '../components/PetListMapComponent.js';
import { useEffect, useState } from "react";
import axios from "axios";
import serverUrl from "../serverConfig.js";
import { useNavigate } from "react-router-dom";

/*
    재사용의 기준이 뭘까 모든 것을 component로 만들어서 블럭 형식으로 페이지 조립하는 것?
    페이지는 하나인데 props와 삼항 연산자로 데이터만 바꿔서 이용하는 것?
*/
function Petdex(){
    //redux userPetData에서 추출
    const petDataState = useSelector((state)=>{return state.userPetData})
    const userDataState = useSelector((state)=>{return state.userData})
    const dispatch = useDispatch()
    // 선택되어 있는 펫의 index를 기본값으로 설정해야함 아니면 그냥 기본값으로 둬도?
    const [selectedPetIndex, setSelectedPetIndex] = useState(0);
    const [isLastChoice, setIsLastChoice] = useState()
    const [petPostData, setPetPostData] = useState({
        idx: ''
    });
    const navigate = useNavigate()

    function petChoiceHandler(chunkIndex, index) {
        const listIndex = chunkIndex * 4 + index;
        setSelectedPetIndex(listIndex);
        setIsLastChoice(petDataState.data[listIndex].lastChoice === 1)
        setPetPostData({
            idx: petDataState.data[listIndex].idx,
        })
    }

    function choiceHandler(){// 펫 적용 버튼 event
        axios.post(`${serverUrl}/api/user/choice-pet`,
        {
            idx : petPostData.idx
        },
        {withCredentials: true})
        .then((response)=>{
            if(response.data.messageDetail === "nothing"){
                alert("사용자의 펫이 정해지지 않은 상태입니다!")
                navigate('/signup-pet')//로그인 상태 + 펫
            }else{
                alert("펫 적용 완료!")
            }
        })
        .catch((error) => {
            if(error.response){ // 런타임 에러방지 error.response가 있는지 먼저 확인함
                if(error.response.status === 401) { // 토큰 만료 리다이렉트
                    console.log("Error status: " + error.response.status);
                    alert("로그인을 다시해주세요!");
                    navigate('/');
                }
                else{
                    alert("서버와 연결에 실패했습니다.");
                }
            }
            else{
                console.error("Error: ", error);
                if(error.message) {
                    alert("에러: " + error.message);
                }
                else{
                    alert("알 수 없는 에러가 발생했습니다.");
                }
            }
        })
        petDataUpdate()
    }
    
    function petDataUpdate(){// 펫 도감 정보 다시 가져오기
        axios.get(`${serverUrl}/api/user/has-pet`
        ,{withCredentials: true})
        .then((response)=>{
            if(response.data.messageDetail === "nothing"){
                alert("사용자의 펫이 정해지지 않은 상태입니다!")
                navigate('/signup-pet')//로그인 상태 + 펫
            }else{
                dispatch(petdexInit(response.data))
                dispatch(userDataInit(response.userInfo))
            }
        })
        .catch((error) => {
            if(error.response){ // 런타임 에러방지 error.response가 있는지 먼저 확인함
                if(error.response.status === 401) { // 토큰 만료 리다이렉트
                    console.log("Error status: " + error.response.status);
                    alert("로그인을 다시해주세요!");
                    navigate('/');
                }
                else{
                    alert("서버와 연결에 실패했습니다.");
                }
            }
            else{
                console.error("Error: ", error);
                if(error.message) {
                    alert("에러: " + error.message);
                }
                else{
                    alert("알 수 없는 에러가 발생했습니다.");
                }
            }
        })
    }

   
    useEffect(()=>{ // 펫 도감 정보 초기화
        axios.get(`${serverUrl}/api/user/has-pet`
        ,{withCredentials: true})
        .then((response)=>{
            if(response.data.messageDetail === "nothing"){
                alert("사용자의 펫이 정해지지 않은 상태입니다!")
                navigate('/signup-pet')//로그인 상태 + 펫
            }else{
                dispatch(petdexInit(response.data))
                setSelectedPetIndex(0)
            }
        })
        .catch((error) => {
            if(error.response){ // error.response가 있는지 먼저 확인함
                if(error.response.status === 401) { // 토큰 만료 리다이렉트
                    console.log("Error status: " + error.response.status);
                    alert("로그인을 다시해주세요!");
                    navigate('/');
                }
                else{
                    alert("서버와 연결에 실패했습니다.");
                }
            }
            else{
                console.error("Error: ", error);
                if(error.message) {
                    alert("에러: " + error.message);
                }
                else{
                    alert("알 수 없는 에러가 발생했습니다.");
                }
            }
        })
    },[])

    
    return(
        <>
            <header>
                <NavbarComponent userData={userDataState}/>
            </header>

            <h1 className='page-title'>PETDEX</h1>

            <body>
                <div className='center From'>
                    <Container fluid>
                        <Row className='center'>
                            <Col md="7">
                                <PetListMapComponent
                                    petList={petDataState.data}
                                    selectedPetIndex={selectedPetIndex}
                                    onSelectPet={setSelectedPetIndex}
                                    setPetPostData={setPetPostData}
                                    eventHandler={petChoiceHandler}
                                />
                            </Col>{console.log(isLastChoice)}
                            <PetInfo
                                btnMessage="펫 적용하기"
                                setIsLastChoice={setIsLastChoice}
                                isDisabled={isLastChoice}
                                clickHandler={() => {
                                    choiceHandler()
                                }/*post로 선택한 펫에 대한 정보 보내야할 듯(petPostData)*/}
                            >
                                <Image src="/700x460.png" fluid />
                                <Stack direction='horizontal' gap={2} className='center margin-bottom-10'>
                                    <Form.Label column sm="4" className='color-darkBlue'>펫 이름</Form.Label>   
                                    <Col sm="8">
                                        <p>{petDataState.data[selectedPetIndex].nickname}</p>
                                    </Col>
                                </Stack>{console.log(petDataState)}
                                <p className='color-lightPurple'>{petDataState.data[selectedPetIndex].info}</p>
                            </PetInfo>
                        </Row>
                    </Container>
                </div>
            </body>
            <footer>
            </footer>
        </>
    );
}

export default Petdex