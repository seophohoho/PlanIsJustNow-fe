import axios from 'axios';
import { useEffect, useState } from 'react';
import serverUrl from "../serverConfig"
import { Form, Col, Row, Button, Container, Navbar, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    
    return(
    <div className='text-center'>
        <header>
            <Navbar expand="md" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#">
                        <img src='/logo192.png'width={"50px"}></img>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>

        <h1 className='page-title'>비 밀 번 호  찾 기</h1>

        <body>
            <div className='text-center w-30p'>
            
            </div>
        </body>
        <footer>
        </footer>
    </div>
  );
}

export default Login;