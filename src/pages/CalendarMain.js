import React from 'react';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import momentPlugin from '@fullcalendar/moment';
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment';
import 'moment/locale/ko'
import '../styles/CalendarMain.css'
import ScheduleAddModal from '../components/ScheduleAddModal';
import Schedule from '../components/ScheduleComponent';
import { scheduleInit, addHandleShow } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Col, Row, Container, Navbar, Stack, Image, Button } from 'react-bootstrap';
import PetSpaceComponent from '../components/PetSpaceComponent';



const CalendarMain = () => {
    const state = useSelector((state)=> {return state});
    const [clickedDate, setClickedDate] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const newImportantEvents = [];
    
        Object.keys(state.dateSchedule).forEach(date => {
            state.dateSchedule[date].forEach(event => {
                //end가 베타적으로 작동하기 때문에 캘린더 뷰에는 하루를 추가하여 표시
                const end = moment(event.end, "YYYY-MM-DD").add(1, 'days');
                const newEnd = end.format("YYYY-MM-DD");
            if (event.important) {
                const eventState = {
                    title: event.title,
                    end: newEnd,
                    date: date,
                };
                newImportantEvents.push(eventState);
            }
            });
        });
    
        setImportantEvents(newImportantEvents);
    }, [state.dateSchedule]); // state.dateSchedule가 변경될 때마다 이 함수를 다시 실행
    
    const modalShow = ()=>{
        dispatch(addHandleShow())
    }
    //state로 안해서 실시간 반영이 안되는 것이었음;;
    const [importantEvents, setImportantEvents] = useState([]);

  /*달력 뷰에 보여지는 것은 addEvent를 이용해서 객체.important 여부 판단 후 삽입 완료된 일정은 impotant가 자동으로 false가 되어야함  */
    const ImportantEventsComponent = () => {
        Object.keys(state.dateSchedule).forEach(date => {
            console.log(date)
            state.dateSchedule[date].forEach(event => {
                if (event.important){
                    const eventState = { 
                        title : event.title,
                        end : event.end,
                        start: date,
                        allDay : false,
                    }
                    setImportantEvents([...importantEvents, eventState]);
                    console.log(importantEvents)
                }
                
            });
        });
    }

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
            <ScheduleAddModal clickedDate={clickedDate}></ScheduleAddModal>
            <Container>
                <Row className="justify-content-md-center"  >
                    <Col lg="7">
                        <FullCalendar
                        plugins={[interactionPlugin, dayGridPlugin, momentPlugin]} 
                        initialView="dayGridMonth" 
                        selectable={true}
                        selectAllow={function (e) {/* 클릭 가능한 날짜를 하루로 고정 */
                            if (e.end.getTime() / 1000 - e.start.getTime() / 1000 <= 86400) {
                                return true;
                            }
                        }}
                        dateClick={function(data) {/*클릭된 날짜 반환*/
                            setClickedDate(data.dateStr)
                        }}
                        nextDayThreshold={'00:00'}
                        datesSet={function(args) {
                            /* 달력 초기화 시 작동 TODO: axios 일정관련 초기화 함수 또한 여기서 실행  */
                            dispatch(scheduleInit(/*axios*/));
                            
                            /*  리액트에서 fullcalendar 최상위 객체 오브젝트에 접근하려면 이렇게 해야함 */
                            const view = args.view.calendar.currentData.currentDate;
                            /*getMonth는 JavaScript에서 날짜의 월은 0(1월)부터 11(12월)까지 번호가 지정됨 +1을 해야 원본 값이 나옴*/
                            /*처음 axios에서 받은 값을 초기화 후 해당값에서 아래 값으로 접근해서 map으로 나열*/
                            const currentDate = moment().format('YYYY-MM-DD');
                            setClickedDate(currentDate);
                            ImportantEventsComponent()
                        }}
                        events={importantEvents} /* events 배열은 달력에 표시될 이벤트 목록 */
                        contentHeight="auto"
                        allDaySlot={true}   
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
                                        <Image src="/logo192.png" roundedCircle className='input-bgSet w-50'/>
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
                            <Stack direction='horizontal' className='fc-direction-ltr-2v'>
                                <div className='h-225 w-max section-schedule'>
                                    <Stack className=''>
                                        <Row className='section__item-schedule sticky-schedule'>
                                            <Col sm={2} className='m-auto color-darkBlue text-center'>
                                                <p>완료</p>
                                            </Col>
                                            <Col sm={2} className='m-auto color-darkBlue text-center'>
                                                <p>시간</p>
                                            </Col>
                                            <Col sm={5} className='m-auto color-darkBlue p-zero text-center'>
                                                <p>일정내용</p>
                                            </Col>
                                            <Col sm={1} className='m-auto color-darkBlue p-zero text-center'>
                                                <p>중요</p>
                                            </Col>
                                            <Col sm={2} className='m-auto color-darkBlue p-zero text-center'>
                                                <Button onClick={modalShow}>+</Button >
                                            </Col>
                                        </Row>
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
                            <PetSpaceComponent></PetSpaceComponent>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </body>
        <footer className='h-200'>{/*footer 메뉴 취소, sticky Navbar로 결정 */}

        </footer>
     </div>
   );
}

export default CalendarMain