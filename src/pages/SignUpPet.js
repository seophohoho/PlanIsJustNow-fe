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
        <body>
        <PetCircleImage/>

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
                <Form.FloatingLabel>
                    <Col>
                    <Image src={'/thumbnail.png'} roundedCircle className='pet-image'/>
                    </Col>
                    <label className='pet-image'>이름</label>
                </Form.FloatingLabel>
            </Row>
            </Container>
        </div>
    )
}

export default SignUpPet;