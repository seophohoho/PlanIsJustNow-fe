import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../styles/CalenderMain.css'
import { Form, Col, Row, Container, Navbar, Stack, Image } from 'react-bootstrap';

const CalendarMain = () => {
  
  const events = [
    { title: '물 999L 마시기', date: "2024-02-02" },//date는 클릭된 이벤트의 날자 state를 가져와서 적용 title은 일정의 일부분을 가져옴
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
                    <Col sm={7}>
                        <FullCalendar /*오늘 색-> 연보라, 클릭된날 색->? 클릭이벤트 좀따 살펴보기*/
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
                    <Col sm={5}>
                        <Stack>{/**나중에 줄바꿈 되는 모든 div에 클래스 적용  white-space:nowrap;*/}
                            <Stack direction='horizontal' className='m-top-20' gap={3}>
                                <Image src="/logo192.png" roundedCircle className='input-bgSet float-display image-w '/> {/**여기도 컴포넌트화 */}
                                <div>
                                    <p>홍길동</p>{/*폰트, 줄바꿈, 공간 나중에, 받아온거 리덕스로 적용*/}
                                    <p>#123456</p>
                                </div>
                                <Stack direction='horizontal' className='fc-direction-ltr m-auto m-right-zero'>{/*스크롤 지원, 버튼x, 튀어나간 요소 배경에 비치치않게, state로 친구 수에 따라 늘어나도록 */}
                                    <p>친구목록</p>
                                    <Stack className='text-center'>{/* todo 여기는 컴포넌트화 해서 map으로 */}
                                        <Image src="/logo192.png" roundedCircle className='input-bgSet float-display w-25 m-auto '/>
                                        <Form.Label className=''>이름</Form.Label>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack direction='horizontal' className='fc-direction-ltr-2v'>
                                {/**고정된 크기, 스크롤 지원 일정 생성버튼은 일정들 맨 아래에 내부일정 또한 컴포넌트화 해서 map으로 */}
                                <div className='h-225'>
                                    
                                </div>
                            </Stack>
                            <Stack direction='horizontal' className='fc-direction-ltr'>
                                {/**펫 공간 위 아래, 고정된 크기 위쪽만 좀 생성   */}
                                <div className='h-200'></div>
                            </Stack>
                        </Stack>
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