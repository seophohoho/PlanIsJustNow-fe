import { useState } from 'react';
import { Form, Col, Row, Button, Image, Container, Navbar, Stack } from 'react-bootstrap';

function SignUpPet() {
    const [petImage, setPetIamge] = useState(['Path',])
    
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
            <div className='center'>
                <Container fluid>
                    <Row>
                        <Col md="6">
                            <Stack direction='horizontal' gap={0}>
                                <PetCircleImage/>
                                <PetCircleImage/>
                                <PetCircleImage/>
                                <PetCircleImage/>
                            </Stack>
                            <Stack direction='horizontal' gap={0}>
                                <PetCircleImage/>
                                <PetCircleImage/>
                                <PetCircleImage/>
                                <PetCircleImage/>
                            </Stack>
                            <Stack direction='horizontal' gap={0}>
                                <PetCircleImage/>
                                <PetCircleImage/>
                                <PetCircleImage/>
                                <PetCircleImage/>
                            </Stack>
                        </Col>
                        <Col md="4">
                            <Image src="/700x460.png" fluid />;
                            {/* 펫이름 라벨 */}
                            {/* 인풋  placeholder 기본 이름 */}
                            {/* 캐릭터 설명 라벨 */}
                            {/* 버튼 */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </body>
        <footer>

        </footer>        
    </div>
  );
}

function PetCircleImage(props){
    return(
        <Stack gap={1}>
            <Image src={'/thumbnail.png'} roundedCircle className='pet-image'/>
            <label className='pet-image'>이름</label>
        </Stack>
    )
}

export default SignUpPet;