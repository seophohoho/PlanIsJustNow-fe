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
    const state = useSelector((state)=>{return state})//store에 있는 state 가져옴

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
                            <PetListMapComponent/>
                        </Col>
                        {chunkArray(state.petName, 12).map((petNamesChunk, chunkIndex) => (
                            <PetInfo
                                key={chunkIndex}
                                petName={state.petName[chunkIndex]}
                                petInpo={state.petInpo[chunkIndex]}
                                onClick={() => { }}
                            />
                        ))}
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