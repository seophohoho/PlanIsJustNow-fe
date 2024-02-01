import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../styles/CalenderMain.css'
import { Form, Col, Row, Container, Navbar } from 'react-bootstrap';

const CalendarMain = () => {
  
  const events = [
    { title: 'Sample Event', date: "2024-02-02" },//date는 클릭된 이벤트의 날자 state를 가져와서 적용 title은 일정의 일부분을 가져옴
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
                        contentHeight="auto"
                        headerToolbar={{
                            left:'prev',
                            center:'title',
                            right:'next'
                         }}
                         locale="en"
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