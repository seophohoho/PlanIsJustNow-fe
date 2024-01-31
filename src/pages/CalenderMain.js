import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Form, Col, Row, Container, Navbar } from 'react-bootstrap';

const CalendarMain = () => {
  
  const events = [
    { title: 'Sample Event', date: new Date() },
    // more events...
  ]

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
        <body>
            <Container>
                <Row>
                    <Col>
                        <FullCalendar 
                        plugins={[dayGridPlugin]} 
                        initialView="dayGridMonth" 
                        events={events} /*events 배열은 달력에 표시될 이벤트 목록이다.*/
                        />
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
            </Container>
        </body>
        <footer>

        </footer>
     </div>
   );
}

export default CalendarMain