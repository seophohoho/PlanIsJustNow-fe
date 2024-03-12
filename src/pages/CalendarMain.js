import React from 'react';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import momentPlugin from '@fullcalendar/moment';
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import { formatDate } from '@fullcalendar/core'
import moment from 'moment';
import 'moment/locale/ko'
import '../styles/CalendarMain.css'
import Schedule from '../components/ScheduleComponent';
import { scheduleInit } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Col, Row, Container, Navbar, Stack, Image, Button, Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';

const CalendarMain = () => {
    const state = useSelector((state)=> {return state});
    const [clickedDate, setClickedDate] = useState("");
    const dispatch = useDispatch();
  /*달력 뷰에 보여지는 것은 addEvent를 이용해서 객체.important 여부 판단 후 삽입 완료된 일정은 impotant가 자동으로 false가 되어야함  */
    const events = [
        { title: '물 999L 마시기', date: "2024-03-02", end: "2024-03-08" },/* date는 클릭된 이벤트의 날자 state를 가져와서 적용 title은 일정의 일부분을 가져옴*/
        { title: '물 1ml 마시기', start: "2024-03-11", end: "2024-03-14"},/* end는 +1일 추가하여 적용해야함, 추측이지만 12시 기준이라 그런듯 공식 Docs에도 주의하라고만 써져있음*/
        { title: '스쾃999회', date: "2024-03-03", end: "2024-03-04"},
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
                    <Col lg="7">
                        <FullCalendar /* 오늘 색-> 찐보라, 클릭된날 색-> 연보라 클릭이벤트는 추후 살펴보기 */
                        plugins={[interactionPlugin, dayGridPlugin, momentPlugin]} 
                        initialView="dayGridMonth" 
                        selectable={true}
                        selectAllow={function (e) {/* 클릭 가능한 날짜를 하루로 고정 */
                            if (e.end.getTime() / 1000 - e.start.getTime() / 1000 <= 86400) {
                                return true;
                            }
                        }}
                        dateClick={function(data) {/*클릭된 날짜 반환*/
                            alert('Clicked on: ' + data.dateStr);
                            setClickedDate(data.dateStr)
                        }}
                        datesSet={function(args) {
                            /* 달력 초기화 시 작동 TODO: axios 일정관련 함수 또한 여기서 실행  */
                            dispatch(scheduleInit(/*axios*/));
                            
                            /* 리액트에서 최상위 객체 오브젝트에 접근하려면 이렇게 해야함 */
                            const view = args.view.calendar.currentData.currentDate;
                            /*getMonth는 JavaScript에서 날짜의 월은 0(1월)부터 11(12월)까지 번호가 지정됨 +1을 해야 원본 값이 나옴*/
                            /*처음 axios에서 받은 값을 초기화 후 해당값에서 아래 값으로 접근해서 map으로 나열*/
                            const currentDate = moment().format('YYYY-MM-DD');
                            setClickedDate(currentDate);
                        }}
                        events={events} /* events 배열은 달력에 표시될 이벤트 목록 */
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
                                    <p className='color-darkBlue'>홍길동</p>{/*폰트, 줄바꿈, 공간 나중에, 받아온거 리덕스 데이터바인딩*/}
                                    <p className='color-violet'>#123456</p>
                                </div>
                                <div direction='horizontal' className='fc-direction-ltr m-auto section max-h-100'>{/*map으로 친구 수에 따라 늘어나도록 */}
                                    <p className='section__item sticky color-darkBlue'>친구목록</p>
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
                                    {/*여기에 title 부착 sticky로, 된다면 일정 추가 버튼도 여기에?*/}
                                    <Stack>
                                        {/*비동기 문제 &&로 해결*/
                                            state.dateSchedule[clickedDate] && state.dateSchedule[clickedDate].map(function(notUse, i){
                                                return(
                                                    <Schedule i={i} clickedDate={clickedDate}/>
                                                )
                                            })
                                        }
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