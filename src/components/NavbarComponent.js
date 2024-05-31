import React, { useEffect, useState } from 'react';
import { Container, Navbar, Stack, Nav } from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { PiDogFill } from 'react-icons/pi';
import serverUrl from '../serverConfig';
import axios from 'axios';
import { initCount } from '../store/store'
import { useDispatch, useSelector } from 'react-redux';

const NavbarComponent = (props) => {
    const countState = useSelector(state => state.requestCount)
    const { userData } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // 친구요청 총 갯수 상태

    //상대의 요청에 따라 즉시 갱신된다면 좋겠지만 양방향 통신은 좀..
    useEffect(()=>{
        const fetch = async () =>{
            try{
                const requestCountResponse = await axios.get(`${serverUrl}/api/friend/request-count`, { withCredentials: true })
                dispatch(initCount(requestCountResponse.data.data))
            }
            catch (error){
            }
        }
        fetch()
    },[])

    return(
        <Navbar expand="md" className="bg-body-tertiary">{/**추후 Navbar도 컴포넌트화 해서 다른페이지에 적용시키기 */}
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                    <PiDogFill size={60} />
                    <h1 style={{ display: 'inline', marginLeft: '10px' }}>PETTODO</h1>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">{/*추후 아이콘 추가*/}
                    <Badge>
                        <Nav.Link className='font-size-15' onClick={()=>{navigate("/")}}>Home</Nav.Link>
                    </Badge>
                    <Badge count={countState}>
                        <Nav.Link className='font-size-15 margin-left' onClick={()=>{navigate("/Friend-board")}}>Friends</Nav.Link>
                    </Badge>
                    <Badge>
                        <Nav.Link className='font-size-15 margin-left' onClick={()=>{navigate("/petdex")}}>Petdex</Nav.Link>
                    </Badge>
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