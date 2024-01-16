import { useState } from 'react';
import { Form, Col, Row, Button, Image, Container } from 'react-bootstrap';

function SignUpPet() {
    const [petImage, setPetIamge] = useState(['Example Path',])
    
  return (
    <div>
        <PetCircleImage/>
        
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
                    <Image src={'/thumbnail.png'} roundedCircle className='input-bgSet w-25'/>
                    </Col>
                    <label className='center'>이름</label>
                </Form.FloatingLabel>
            </Row>
            </Container>
        </div>
    )
}

export default SignUpPet;