import NavbarComponent from "../components/NavbarComponent";
import { Col, Row, Container, Image, Stack, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { petdexInit, userDataInit } from "../store/store.js";
import PetInfo from '../components/PetInpo.js';
import PetListMapComponent from '../components/PetListMapComponent.js';
import { useEffect, useState } from "react";
import axios from "axios";
import serverUrl from "../serverConfig.js";
import { useNavigate } from "react-router-dom";

function Petdex() {
    const petDataState = useSelector((state) => state.userPetData);
    const userDataState = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedPetIndex, setSelectedPetIndex] = useState(0);
    const [isLastChoice, setIsLastChoice] = useState(false);
    const [petPostData, setPetPostData] = useState({ idx: '' });

    useEffect(() => {
        if (petDataState.data.length > 0) {
            setIsLastChoice(petDataState.data[selectedPetIndex].lastChoice === 1);
        }
    }, [selectedPetIndex, petDataState.data]);

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

    const petChoiceHandler = (chunkIndex, index) => {
        const listIndex = chunkIndex * 4 + index;
        setSelectedPetIndex(listIndex);
        setPetPostData({
            idx: petDataState.data[listIndex].idx,
        });
    };

    const handleError = (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                alert("로그인을 다시 해주세요!");
                navigate('/');
            } else {
                alert("서버와 연결에 실패했습니다.");
            }
        } else {
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

    const handleImageError = (e) => {
        e.target.src = "/700x460.png";
    };

    return (
        <>
            <header>
                <NavbarComponent userData={userDataState} />
            </header>
            <h1 className='page-title'>PETDEX</h1>
            <main>
                <div className='center Form'>
                    <Container fluid>
                        <Row className='center'>
                            <Col md="7">
                                <PetListMapComponent
                                    petList={petDataState.data}
                                    selectedPetIndex={selectedPetIndex}
                                    onSelectPet={petChoiceHandler}
                                    setPetPostData={setPetPostData}
                                    eventHandler={petChoiceHandler} // Ensure the correct handler is passed here
                                    evolId={petDataState.data[selectedPetIndex]?.evol} // Optional chaining for safety
                                />
                            </Col>
                            <PetInfo
                                btnMessage="펫 적용하기"
                                setIsLastChoice={setIsLastChoice}
                                isDisabled={isLastChoice}
                                clickHandler={choiceHandler}
                            >
                                <Image
                                    src={petDataState.data[selectedPetIndex]?.petId?.path + `${petDataState.data[selectedPetIndex]?.evol}_profile_1.png`}
                                    onError={handleImageError}
                                    fluid
                                />
                                <Stack direction='horizontal' gap={2} className='center margin-bottom-10'>
                                    <Form.Label column sm="4" className='color-darkBlue'>펫 이름</Form.Label>
                                    <Col sm="8">
                                        <p className='color-violet'>{petDataState.data[selectedPetIndex]?.nickname}</p>
                                    </Col>
                                </Stack>
                                <p className='color-lightPurple'>성격 : {petDataState.data[selectedPetIndex]?.natureId?.name}</p>
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
