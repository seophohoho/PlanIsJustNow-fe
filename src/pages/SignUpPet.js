import axios from 'axios';
import serverUrl from "../serverConfig"
import { Col, Row, Container, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import PetInfo from '../components/PetInpo';
import PetListMapComponent from '../components/PetListMapComponent.js';
import chunkArray from '../function/chunkArray.js';

//Todo 모든 post 버튼에 로딩 css 로직 추가
function SignUpPet() {

    const state = useSelector((state)=>{return state})//store에 있는 state 가져옴
    const dispatch = useDispatch()//state변경 함수 사용할때 둘러야함
    
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
                            <PetListMapComponent/>
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
        withCredentials: true,
        "species" : pet_id,
        "nickname" : pet_name
    }).then(Response=>{
        console.log("yes")
    }).catch(error=>{
        console.log(error)
    })
}



export default SignUpPet;