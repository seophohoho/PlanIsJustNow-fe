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
                        <Col md="7">
                            <Stack direction='horizontal' gap={1} className='margin-bottom-20'>
                                <PetCircleImage/>
                                <PetCircleImage/>
                                <PetCircleImage/>
                                <PetCircleImage/>
                            </Stack>
                            <Stack direction='horizontal' gap={1} className='margin-bottom-20'>
                                <PetCircleImage/>
                                <PetCircleImage/>
                                <PetCircleImage/>
                                <PetCircleImage/>
                            </Stack>
                            <Stack direction='horizontal' gap={1} className='margin-bottom-20'>
                                <PetCircleImage/>
                                <PetCircleImage/>
                                <PetCircleImage/>
                                <PetCircleImage/>
                            </Stack>
                        </Col>
                        <Col md="5">{/* 완성후 component로 전환 */}
                            <Stack className='center margin-bottom-10'>
                                <Image src="/700x460.png" fluid/>
                                <Stack direction='horizontal' gap={2}  className='center '>
                                    <Form.Label column sm="4" className='color-darkBlue'>
                                        펫 이름
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" placeholder="캐릭터이름 전달" />
                                    </Col>
                                </Stack>
                                <p className='color-lightPurple'>ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎ</p>{/* 캐릭터 설명 라벨 */}
                            </Stack>
                            <Button variant="primary" bold>이 펫으로 할래요!</Button>
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
            <Image src={'/thumbnail.png'} roundedCircle className='pet-image border-outline'/>
            <p className='pet-image'>이름</p>
        </Stack>
    )
}

function PetInpoComponent(props){
    return(
        <>
        </>
    )
}

export default SignUpPet;