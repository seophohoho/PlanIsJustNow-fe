import { useState } from 'react';
import { Form, Col, Row, Button, Image, Container, Navbar, Stack } from 'react-bootstrap';

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
                        <PetCircleImage/>
                    </Col>
                    <Col>
                        <PetCircleImage/>
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
        <>
        <Stack gap={2}>
            <Image src={'/thumbnail.png'} roundedCircle className='pet-image'/>
            <label className='pet-image'>이름</label>
        </Stack>
        </>
    )
}

export default SignUpPet;