import { useState } from 'react';
import { Form, Col, Row, Button, Image, Container, Navbar } from 'react-bootstrap';

function SignUpPet() {
    const [petImage, setPetIamge] = useState(['Example Path',])
    
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
            <Container>
                <Row>
                    <Col>
                        {/* 좌측 펫 선택지 */}
                        <PetCircleImage/>
                    </Col>
                    <Col>
                        <PetCircleImage/>

                        {/* 우측 */}
                    </Col>
                </Row>
            </Container>
        </body>
        <footer>

        </footer>        
    </div>
  );
}

function PetCircleImage(props){
    return(
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={'/thumbnail.png'} roundedCircle className='pet-image'/>
                        <label className='pet-image'>이름</label>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SignUpPet;