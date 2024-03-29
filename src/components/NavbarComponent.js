import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Navbar, Stack, Image} from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const NavbarComponent = () => {

    return(
        <Navbar expand="md" className="bg-body-tertiary">{/**추후 Navbar도 컴포넌트화 해서 다른페이지에 적용시키기 */}
            <Container>
                <Navbar.Brand href="#">
                    <img src='/logo192.png'width={"50px"}></img>
                </Navbar.Brand>
                {/* image는 ant-design으로 */}
                <Navbar.Text>
                    <Stack direction="horizontal" gap={2}>
                        <Avatar className='' size={64} icon={<UserOutlined />} />
                        <Stack gap={0} className='m-auto'>
                            <Navbar.Text className='color-darkBlue '>
                            홍길동
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