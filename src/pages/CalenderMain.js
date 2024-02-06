import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../styles/CalenderMain.css'
import { Form, Col, Row, Container, Navbar, Stack, Image, Button } from 'react-bootstrap';

const CalendarMain = () => {
  
  const events = [
    { title: '물 999L 마시기', date: "2024-02-02", end: "2024-02-08" },//date는 클릭된 이벤트의 날자 state를 가져와서 적용 title은 일정의 일부분을 가져옴
    { title: '물 1ml 마시기', start: "2024-02-11", end: "2024-02-14"},//end는 +1일 추가하여 적용해야함, 추측이지만 12시 기준이라 그런듯 공식 Docs에도 주의하라고만 써져있음
    { title: '스쾃999회', date: "2024-02-03", end: "2024-02-04"},
  ]

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
                    <Col xs lg="7">
                        <FullCalendar /*오늘 색-> 연보라, 클릭된날 색->? 클릭이벤트는 추후 살펴보기*/
                        plugins={[dayGridPlugin]} 
                        initialView="dayGridMonth" 
                        events={events} /*events 배열은 달력에 표시될 이벤트 목록이다.*/
                        contentHeight="auto"
                        headerToolbar={{
                            left:'prev',
                            center:'title',
                            right:'next'
                         }}
                         locale="en"//지역설정, 시간관련 메소드 사용할시 해당지역으로 설정됨 주의!
                        />
                    </Col>
                    <Col md="auto">
                        <Stack>{/**나중에 줄바꿈 되는 모든 div에 클래스 적용  white-space:nowrap;*/}
                            <Stack direction='horizontal' className='m-top-20' gap={3}>
                                <Image src="/logo192.png" roundedCircle className='input-bgSet float-display image-w'/> {/**여기도 컴포넌트화 */}
                                <div>
                                    <p>홍길동</p>{/*폰트, 줄바꿈, 공간 나중에, 받아온거 리덕스로 적용*/}
                                    <p>#123456</p>
                                </div>
                                <div direction='horizontal' className='fc-direction-ltr m-auto section'>{/*스크롤 지원, 버튼x, 튀어나간 요소 배경에 비치치않게, state로 친구 수에 따라 늘어나도록 */}
                                    <p className='section__item'>친구목록</p>
                                    <Stack className='section__item w-50'>{/* todo 여기는 컴포넌트화 해서 map으로 */}
                                        <Image src="/logo192.png" roundedCircle className='input-bgSet w-50'/>
                                        <Form.Label className=''>이름</Form.Label>
                                    </Stack>{/**네브바쪽으로 옮길까? 충돌 무시도 있을것 같은데 살펴보자 이미지 너무커! */}
                                    <Stack className='section__item w-50'>{/* todo 여기는 컴포넌트화 해서 map으로 */}
                                        <Image src="/logo192.png" roundedCircle className='input-bgSet w-50  '/>
                                        <Form.Label className=''>이름</Form.Label>
                                    </Stack>
                                    <Stack className='section__item w-50'>{/* todo 여기는 컴포넌트화 해서 map으로 */}
                                        <Image src="/logo192.png" roundedCircle className='input-bgSet w-50 '/>
                                        <Form.Label className=''>이름</Form.Label>
                                    </Stack>
                                    <Stack className='section__item w-50'>{/* todo 여기는 컴포넌트화 해서 map으로 */}
                                        <Image src="/logo192.png" roundedCircle className='input-bgSet w-50'/>
                                        <Form.Label className=''>이름</Form.Label>
                                    </Stack>
                                    
                                    
                                    
                                </div>
                            </Stack>
                            <Stack direction='horizontal' className='fc-direction-ltr-2v'>
                                {/**고정된 크기, 스크롤 지원 일정 생성버튼은 일정들 맨 아래에 내부일정 또한 컴포넌트화 해서 map으로 */}
                                <div className='h-225 w-max'>
                                    <Stack>
                                        <Schedule/>      
                                    </Stack>
                                </div>
                            </Stack>
                            <Stack direction='horizontal' className='fc-direction-ltr'>
                                {/**펫 공간 위 아래, 고정된 크기 위쪽만, 생성 Stack으로 위 아래 */}
                                <div className='h-200'>
                                    
                                </div>
                            </Stack>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </body>
        <footer>{/**sticky footer bar or sticky header bar */}

        </footer>
     </div>
   );
}

function Schedule(){
    return(
        <Row>{/**여기서 부터 컴포넌트화 */}
            <Col sm={1}><input type='checkbox'></input></Col>
            <Col sm={8}>sample</Col>
            <Col sm={1}>
            <input type='checkbox'></input>
            </Col>
            <Col sm={2}>
                <Button>...</Button> {/**디자인 초기화 아니면 다른요소 제작 후 클릭이벤트 구현 */}
            </Col>
        </Row>
    )
}
export default CalendarMain