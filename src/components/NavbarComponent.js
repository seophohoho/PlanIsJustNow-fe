import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Navbar, Stack, Nav } from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const NavbarComponent = () => {

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
                        <span>로그아웃</span>{/*임시*/}
                    </Stack>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent