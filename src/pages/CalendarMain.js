import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import momentPlugin from '@fullcalendar/moment';
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment';
/*moment 업데이트 중단!!! -> dayjs로 변경 권장 */
import 'moment/locale/ko'
import ScheduleAddModal from '../components/ScheduleAddModal';
import Schedule from '../components/ScheduleComponent';
import { scheduleInit, addHandleShow, userDataInit } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container, Stack, Button } from 'react-bootstrap';
import PetSpaceComponent from '../components/PetSpaceComponent';
import NavbarComponent from '../components/NavbarComponent';
import serverUrl from '../serverConfig'
import axios from 'axios'
import { targetPetInit } from '../store/store';
import { useNavigate } from 'react-router-dom';

const CalendarMain = () => {
    const state = useSelector((state)=> {return state});
    const userDataState = useSelector((state)=> {return state.userData});
    const [clickedDate, setClickedDate] = useState("");
    const [targetPet, setTargetPet] = useState(null);
    const [isPetInitialized, setIsPetInitialized] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [evolLevel, setEvolLevel] = useState(0);

    useEffect(()=>{ // 펫 도감 정보 초기화
        axios.get(`${serverUrl}/api/user/has-pet`
        ,{withCredentials: true})
        .then((response)=>{
            if(response.data.messageDetail === "nothing"){
                alert("사용자의 펫이 정해지지 않은 상태입니다!")
                navigate('/signup-pet')//로그인 상태 + 펫
            }else{
                dispatch(userDataInit(response.userInfo));
                const targetPet = response.data.data.filter(item => item.lastChoice === 1);
                if (targetPet.length > 0) {
                    setTargetPet(targetPet);
                    setEvolLevel(targetPet.evol);
                    setIsPetInitialized(true);  // targetPet이 초기화되었음을 설정
                }
            }
        })
        .catch((error) => {
            if(error.response){ // error.response가 있는지 먼저 확인함
                if(error.response.status === 401) { // 토큰 만료 리다이렉트
                    console.log("Error status: " + error.response.status);
                    alert("로그인을 다시해주세요!");
                    navigate('/');
                }
                else{
                    alert("서버와 연결에 실패했습니다.");
                }
            }
            else{
                console.error("Error: ", error);
                if(error.message) {
                    alert("에러: " + error.message);
                }
                else{
                    alert("알 수 없는 에러가 발생했습니다.");
                }
            }
        })
    },[])

    useEffect(() => {
        const newImportantEvents = [];
        //Object.keys 인자로 들어간 객채의 모든 key를 반환
        Object.keys(state.dateSchedule).forEach(date => {
            state.dateSchedule[date].forEach(event => {
            if (event.important) {
                const eventState = {
                    title: event.title,
                    date: date,
                };
                newImportantEvents.push(eventState);
            }
            });
        });
    
        Object.keys(state.dateSchedule).forEach(date => {
            console.log(date)
            state.dateSchedule[date].forEach(event => {
                if (event.important){
                    const eventState = { 
                        title : event.title,
                        start: date,
                    }
                    setImportantEvents([...importantEvents, eventState]);
                    console.log(importantEvents)
                }
                
            });
        });
        setImportantEvents(newImportantEvents);
    }, [state.dateSchedule]); // state.dateSchedule가 변경될 때마다 이 함수를 다시 실행
    
    const modalShow = ()=>{
        dispatch(addHandleShow())
    }
    const [importantEvents, setImportantEvents] = useState([]);


  return (
    <div>
         <header>
            <NavbarComponent userData={userDataState}></NavbarComponent>
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
                        dayCellContent={(e) => {
                            const dateStr = moment(e.date).format('YYYY-MM-DD');
                            const eventsForDay = state.dateSchedule[dateStr] ? state.dateSchedule[dateStr].filter(event => !event.important) : [];

                            return (
                              <>
                                {(eventsForDay.length > 0) ? 
                                <>{/*일정이 있을 때 날짜와 일정 수 표기*/}
                                    {e.dayNumberText}
                                    <span className='daySchedule-font'>외{eventsForDay.length}개</span>
                                </>:
                                <>{/*일정이 없을 때 날짜만 표기*/}
                                {e.dayNumberText}
                                </>}
                              </>
                            );
                          }}
                        nextDayThreshold={'00:00'}
                        datesSet={function(args) {  
                            axios.get(`${serverUrl}/api/todolist/select`,
                            {withCredentials: true})
                            .then((response)=>{
                                const copy = response.data
                                console.log(copy.data)
                                dispatch(scheduleInit(copy.data))
                            }).catch((error) => {
                                if(error.response){ // 런타임 에러방지 error.response가 있는지 먼저 확인함
                                    if(error.response.status === 401) { // 토큰 만료 리다이렉트
                                        console.log("Error status: " + error.response.status);
                                        alert("로그인을 다시해주세요!");
                                        navigate('/');
                                    }
                                    else{
                                      alert("서버와 연결에 실패했습니다.");
                                    }
                                }
                                else{
                                    console.error("Error: ", error);
                                    if(error.message) {
                                      alert("에러: " + error.message);
                                    }
                                    else{
                                      alert("알 수 없는 에러가 발생했습니다.");
                                    }
                                }
                            });                          
                            /*  리액트에서 fullcalendar 최상위 객체 오브젝트에 접근하려면 이렇게 해야함 */
                            const view = args.view.calendar.currentData.currentDate;
                            /*getMonth는 JavaScript에서 날짜의 월은 0(1월)부터 11(12월)까지 번호가 지정됨 +1을 해야 원본 값이 나옴*/
                            const currentDate = moment().format('YYYY-MM-DD');
                            setClickedDate(currentDate);
                        }}
                        events={importantEvents} /* events 배열은 달력에 표시될 이벤트 목록 */
                        contentHeight="auto"
                        eventColor='rgb(86, 86, 208)'//events 블럭 색
                        eventDisplay='block'
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
                            <Stack direction='horizontal' className='fc-direction-ltr-2v'>
                                <div className='h-410 w-max section-schedule'>
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
                                                    <Schedule i={i} clickedDate={clickedDate} evolLevel={evolLevel} setEvolLevel={setEvolLevel}/>
                                                )
                                            })
                                        }
                                    </Stack>
                                </div>
                            </Stack>
                            {isPetInitialized && <PetSpaceComponent targetPetData={targetPet} evolLevel={evolLevel}/>}
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