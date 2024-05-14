import NavbarComponent from "../components/NavbarComponent";
import { Col, Row, Container, Image, Stack, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { petdexInit, userDataInit } from "../store/store.js";
import PetInfo from '../components/PetInpo';
import PetListMapComponent from '../components/PetListMapComponent.js';
import { useEffect, useState } from "react";
import axios from "axios";
import serverUrl from "../serverConfig.js";
import { useNavigate } from "react-router-dom";

function Petdex() {
    //redux userPetData에서 추출
    const petDataState = useSelector((state) => state.userPetData);
    const userDataState = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    // 선택되어 있는 펫의 index를 기본값으로 설정해야함 아니면 그냥 기본값으로 둬도?
    const [selectedPetIndex, setSelectedPetIndex] = useState(0);
    const [isLastChoice, setIsLastChoice] = useState(false); // 기본값 false로 설정
    const [petPostData, setPetPostData] = useState({
        idx: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (petDataState.data.length > 0) {
            setIsLastChoice(petDataState.data[selectedPetIndex].lastChoice === 1);
        }
    }, [selectedPetIndex, petDataState.data]);

    const petChoiceHandler = (chunkIndex, index) => {
        const listIndex = chunkIndex * 4 + index;
        setSelectedPetIndex(listIndex);
        setPetPostData({
            idx: petDataState.data[listIndex].idx,
        });
    };

    const choiceHandler = async () => {
        try {
            const response = await axios.post(`${serverUrl}/api/user/choice-pet`,
                { idx: petPostData.idx },
                { withCredentials: true });
            if (response.data.messageDetail === "nothing") {
                alert("사용자의 펫이 정해지지 않은 상태입니다!");
                navigate('/signup-pet');
            } else {
                alert("펫 적용 완료!");
                await petDataUpdate();
            }
        } catch (error) {
            handleError(error);
        }
    };

    const petDataUpdate = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/user/has-pet`, { withCredentials: true });
            if (response.data.messageDetail === "nothing") {
                alert("사용자의 펫이 정해지지 않은 상태입니다!");
                navigate('/signup-pet');
            } else {
                dispatch(petdexInit(response.data));
                dispatch(userDataInit(response.data.userInfo));
            }
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.log("Error status: " + error.response.status);
                alert("로그인을 다시해주세요!");
                navigate('/');
            } else {
                alert("서버와 연결에 실패했습니다.");
            }
        } else {
            console.error("Error: ", error);
            alert(error.message ? `에러: ${error.message}` : "알 수 없는 에러가 발생했습니다.");
        }
    };

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/user/has-pet`, { withCredentials: true });
                if (response.data.messageDetail === "nothing") {
                    alert("사용자의 펫이 정해지지 않은 상태입니다!");
                    navigate('/signup-pet');
                } else {
                    dispatch(petdexInit(response.data));
                    setSelectedPetIndex(0);
                }
            } catch (error) {
                handleError(error);
            }
        };
        fetchPetData();
    }, [dispatch, navigate]);

    return (
        <>
            <header>
                <NavbarComponent userData={userDataState} />
            </header>
            <h1 className='page-title'>PETDEX</h1>
            <main>
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
                                clickHandler={choiceHandler}
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
            </main>
            <footer />
        </>
    );
}

export default Petdex;
