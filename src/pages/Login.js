import axios from 'axios';
import { useState } from 'react';
import serverUrl from "../serverConfig"
import { Form, Col, Row, Button, Image, Container, Navbar, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import InputComponent from '../components/SignUpComponents.js';

function Login() {
  return(
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
        <body>
            
        </body>
        <footer></footer>
    </div>
  );
}

export default Login;