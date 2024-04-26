import NavbarComponent from "../components/NavbarComponent";
import { Col, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import PetInfo from '../components/PetInpo';
import PetListMapComponent from '../components/PetListMapComponent.js';
import chunkArray from '../function/chunkArray.js';

/*
    재사용의 기준이 뭘까 모든 것을 component로 만들어서 블럭 형식으로 페이지 조립하는 것?
    페이지는 하나인데 props와 삼항 연산자로 데이터만 바꿔서 이용하는 것?
*/
function Petdex(){
    //redux userPetData에서 추출
    const state = useSelector((state)=>{return state.userPetData})
    // 선택되어 있는 펫의 index를 기본값으로 설정해야함 아니면 그냥 기본값으로 둬도?
    // 이미 선택된 펫의 값을 통해서 선택된 것은 버튼을 비활성화?
    const [hasTrigger, setHasTrigger] = useState(false)
    const [selectedPetIndex, setSelectedPetIndex] = useState(0);
    const [petPostData, setPetPostData] = useState({
        species: '', // idx
        nickname: ''
    });
    const navigate = useNavigate()

    useEffect(()=>{
        setHasTrigger(false)
        axios.get(`${serverUrl}/api/user/has-pet`
        ,{withCredentials: true})
        .then((response)=>{
            if(response.data.messageDetail === "nothing"){
                alert("사용자의 펫이 정해지지 않은 상태입니다!")
                navigate('/signup-pet')//로그인 상태 + 펫
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
  },[hasTrigger])// ignore Warnning: Check token validity on mount(redirect)

    
    return(
        <>
            <header>
                <NavbarComponent/>
            </header>

            <h1 className='page-title'>PETDEX</h1>

            <body>
                <div className='center From'>
                    <Container fluid>
                        <Row className='center'>
                            <Col md="7">
                                <PetListMapComponent
                                    petList={state}
                                    selectedPetIndex={selectedPetIndex}
                                    onSelectPet={setSelectedPetIndex}
                                    setPetPostData={setPetPostData}
                                />
                            </Col>
                            <PetInfo
                                btnMessage="펫 적용하기"
                                isDisabled={state.data[selectedPetIndex].lastChoice === 1}
                                clickHandler={() => {
                                    //disable하고 보낸 후 다시 useEffect 호출해야할듯
                                    setHasTrigger(true)

                                    //여기서 상태 연관된 상태 변환
                                }/*post로 선택한 펫에 대한 정보 보내야할 듯(petPostData)*/}
                            >
                                <Image src="/700x460.png" fluid />
                                <Stack direction='horizontal' gap={2} className='center margin-bottom-10'>
                                    <Form.Label column sm="4" className='color-darkBlue'>펫 이름</Form.Label>   
                                    <Col sm="8">
                                        <p>{state.data[selectedPetIndex].petName}</p>
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
        </>
    );
}

export default Petdex