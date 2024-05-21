import React from 'react';
import { Container, Navbar, Stack, Nav } from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { PiDogFill } from 'react-icons/pi';

const NavbarComponent = (props) => {
    const { userData } = props
    const navigate = useNavigate()

    return(
        <Navbar expand="md" className="bg-body-tertiary">{/**추후 Navbar도 컴포넌트화 해서 다른페이지에 적용시키기 */}
            <Container>
                <Navbar.Brand as={Link} to="/calendar" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                    <PiDogFill size={60} />
                    <h1 style={{ display: 'inline', marginLeft: '10px' }}>PETTODO</h1>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">{/*추후 아이콘 추가*/}
                    <Nav.Link onClick={()=>{navigate("/Friend-board")}}>Friends</Nav.Link>
                    <Nav.Link onClick={()=>{navigate("/petdex")}}>Petdex</Nav.Link>
                </Nav>
                </Navbar.Collapse>
                <Navbar.Text>
                    <Stack direction="horizontal" gap={2}>
                        <Avatar 
                        size={64}
                        src={userData.profileUrl}
                        icon={<UserOutlined/>}
                        />
                        <Stack gap={0} className='m-auto'>
                            <Navbar.Text className='color-darkBlue '>
                                {userData.nickname}
                            </Navbar.Text>
                            <Navbar.Text className='color-violet'>
                                #{userData.userId}
                            </Navbar.Text>
                        </Stack>
                    </Stack>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent