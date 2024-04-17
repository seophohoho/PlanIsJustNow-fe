import React from 'react';
import { Container, Navbar, Stack, Nav } from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const NavbarComponent = () => {
    //axios로 요청해서 필요한 정보만 받하서 state에 할당
    return(
        <Navbar expand="md" className="bg-body-tertiary">{/**추후 Navbar도 컴포넌트화 해서 다른페이지에 적용시키기 */}
            <Container>
                <Navbar.Brand href="/calendar">
                    <img src='/logo192.png'width={"50px"} className='m-auto'></img>
                    <h1 style={{display: "inline"}} className=''>PETTODO</h1>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">{/*추후 아이콘 추가*/}
                    <Nav.Link href="/user-page">MyPage</Nav.Link>
                    <Nav.Link href="/Friend-board">Friends</Nav.Link>
                    <Nav.Link href="/petdex">Petdex</Nav.Link>
                </Nav>
                </Navbar.Collapse>
                <Navbar.Text>
                    <Stack direction="horizontal" gap={2}>
                        <Avatar className='' size={64} icon={<UserOutlined />} />
                        <Stack gap={0} className='m-auto'>
                            <Navbar.Text className='color-darkBlue '>
                                홍길동{/*펫이 있는가로 오는 데이터 기준? --> 오류생길듯 펫없으면 데이터 안오니*/}
                            </Navbar.Text>
                            <Navbar.Text className='color-violet'>
                                #Email@example.com
                            </Navbar.Text>
                        </Stack>
                    </Stack>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent