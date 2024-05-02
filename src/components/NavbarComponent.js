import React from 'react';
import { Container, Navbar, Stack, Nav } from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const NavbarComponent = (props) => {
    const { userData } = props
    console.log(userData)

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
                        <Avatar className='' size={64} src={userData.profileUrl} />
                        <Stack gap={0} className='m-auto'>
                            <Navbar.Text className='color-darkBlue '>
                                {userData.nickname}
                            </Navbar.Text>
                            <Navbar.Text className='color-violet'>
                                {userData.userId}
                            </Navbar.Text>
                        </Stack>
                    </Stack>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent