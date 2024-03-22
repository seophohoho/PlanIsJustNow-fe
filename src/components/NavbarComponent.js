import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Col, Row, Container, Navbar, Stack, Image, Button } from 'react-bootstrap';

const NavbarComponent = () => {

    return(
        <Navbar expand="md" className="bg-body-tertiary">{/**추후 Navbar도 컴포넌트화 해서 다른페이지에 적용시키기 */}
            <Container>
                <Navbar.Brand href="#">
                    <img src='/logo192.png'width={"50px"}></img>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent