import React from 'react';
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../styles/CalendarMain.css'
import Schedule from '../components/ScheduleComponent';
import { useSelector } from 'react-redux';
import { Form, Col, Row, Container, Navbar, Stack, Image, Button, Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';

const CalendarMain = () => {
    const state = useSelector((state)=> {return state})
  /*달력 뷰에 보여지는 것은 addEvent를 이용해서 객체.important 여부 판단 후 삽입  */
    const events = [
        { title: '물 999L 마시기', date: "2024-02-02", end: "2024-02-08" },/* date는 클릭된 이벤트의 날자 state를 가져와서 적용 title은 일정의 일부분을 가져옴*/
        { title: '물 1ml 마시기', start: "2024-02-11", end: "2024-02-14"},/* end는 +1일 추가하여 적용해야함, 추측이지만 12시 기준이라 그런듯 공식 Docs에도 주의하라고만 써져있음*/
        { title: '스쾃999회', date: "2024-02-03", end: "2024-02-04"},
    ]
    console.log(calendar.getDate())
  {/**서버에 있는 모든 이벤트를 한번에 모아서 합친 후 events로 변환 */}
  return (
    <div>
         <header>
            <Navbar expand="md" className="bg-body-tertiary">{/**추후 Navbar도 컴포넌트화 해서 다른페이지에 적용시키기 */}
                <Container>
                    <Navbar.Brand href="#">
                        <img src='/logo192.png'width={"50px"}></img>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>
        <body>
            <Container>
                <Row className="justify-content-md-center"  >
                    <Col lg="7">
                        <FullCalendar /* 오늘 색-> 찐보라, 클릭된날 색-> 연보라 클릭이벤트는 추후 살펴보기 */
                        plugins={[interactionPlugin, dayGridPlugin]} 
                        initialView="dayGridMonth" 
                        selectable={true}
                        selectAllow={function (e) {/* 클릭 가능한 날짜를 하루로 고정 */
                            if (e.end.getTime() / 1000 - e.start.getTime() / 1000 <= 86400) {
                                return true;
                            }
                        }}
                        dateClick={function(info) {/*클릭된 날짜 반환*/
                            alert('Clicked on: ' + info.dateStr);
                        }}
                        allDay={true}
                        events={events} /*events 배열은 달력에 표시될 이벤트 목록 */
                        contentHeight="auto"
                        headerToolbar={{
                            left:'prev',
                            center:'title',
                            right:'next'
                         }}
                         locale="en"/* 지역설정, 시간관련 메소드 사용할시 해당지역으로 설정됨 주의! */
                        />
                    </Col>
                    <Col lg="5">
                        <Stack>{/**나중에 줄바꿈 되는 모든 div에 클래스 적용  white-space:nowrap; <-- 스케줄 컴포넌트에 적용해보기 */}
                            <Stack direction='horizontal' className='m-top-20' gap={3}>
                                <Image src="/logo192.png" roundedCircle className='input-bgSet float-display image-w'/> {/**여기도 컴포넌트화 */}
                                <div>
                                    <p>홍길동</p>{/*폰트, 줄바꿈, 공간 나중에, 받아온거 리덕스 데이터바인딩*/}
                                    <p>#123456</p>
                                </div>
                                <div direction='horizontal' className='fc-direction-ltr m-auto section max-h-100'>{/*map으로 친구 수에 따라 늘어나도록 */}
                                    <p className='section__item sticky'>친구목록</p>
                                    <Stack className='section__item'>{/* todo 여기는 컴포넌트화 해서 map으로 */}
                                        <Image src="/logo192.png" roundedCircle className='input-bgSet w-50'/>
                                        <Form.Label className=''>이름</Form.Label>
                                    </Stack>
                                    <Stack className='section__item'>{/* todo 여기는 컴포넌트화 해서 map으로 */}
                                        <Image src="/logo192.png" roundedCircle className='input-bgSet w-50  '/>
                                        <Form.Label className=''>이름</Form.Label>
                                    </Stack>
                                    <Stack className='section__item'>{/* todo 여기는 컴포넌트화 해서 map으로 */}
                                        <Image src="/logo192.png" roundedCircle className='input-bgSet w-50 '/>
                                        <Form.Label className=''>이름</Form.Label>
                                    </Stack>
                                    <Stack className='section__item'>{/* todo 여기는 컴포넌트화 해서 map으로 */}
                                        <Image src="/logo192.png" roundedCircle className='input-bgSet w-50'/>
                                        <Form.Label className=''>이름</Form.Label>
                                    </Stack>
                                </div>
                            </Stack>
                            <Stack direction='horizontal' className='fc-direction-ltr-2v section-schedule'>
                                {/**고정된 크기, 스크롤 지원 일정 생성버튼은 일정들 맨 아래에 내부일정 또한 컴포넌트화 해서 map으로 */}
                                <div className='h-225 w-max'>
                                    <Stack>
                                        {/* { 달력 클릭 시 그 날짜를 반환하는 메소드가 있을 듯
                                            state.events.map()
                                        } */}
                                        <Schedule/>
                                        <Schedule/>
                                    </Stack>
                                </div>
                            </Stack>
                            <Stack direction='horizontal' className='fc-direction-ltr'>
                                {/* 브런치 분리됨! */}
                                <div className='h-200'>
                                    
                                </div>
                            </Stack>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </body>
        <footer>{/*sticky Navbar로 결정 */}

        </footer>
     </div>
   );
}

export default CalendarMain