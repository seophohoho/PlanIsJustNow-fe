import React from 'react';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import momentPlugin from '@fullcalendar/moment';
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import ScheduleAddModal from '../components/ScheduleAddModal';
import Schedule from '../components/ScheduleComponent';
import PetSpaceComponent from '../components/PetSpaceComponent';
import NavbarComponent from '../components/NavbarComponent';
import { scheduleInit, addHandleShow, userDataInit, targetPetInit } from '../store/store';
import PetUI from '../components/PetUI';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container, Stack, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import decodeEmail from '../function/decodeEmail';
import serverUrl from '../serverConfig'
import axios from 'axios'
/*moment 업데이트 중단!!! -> dayjs로 변경 권장 */
import moment from 'moment';
import 'moment/locale/ko'
import handleError from '../function/errorHandler';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const FriendDetail = () => {
    const state = useSelector((state)=> {return state.dateSchedule});
    const userDataState = useSelector((state)=> {return state.userData});
    const { obfuscatedEmail } = useParams();
    const [clickedDate, setClickedDate] = useState("");
    const [targetPet, setTargetPet] = useState(null);
    const [isPetInitialized, setIsPetInitialized] = useState(false);
    const [currentFriendShip, setCurrentFriendShip] = useState(null);
    const [isPositiveFriendShip, setIsPositiveFriendShip] = useState(false);
    const [isFriend, setIsFriend] = useState(true)
    const [friendData, setFriendData] = useState({
        "profileUrl": undefined,
        "nickname": "",
        "userId": ""
      })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [evolLevel, setEvolLevel] = useState(0);
    
    const email = decodeEmail(obfuscatedEmail) // 이메일 디코딩

    useEffect(()=>{
        if(targetPet != null && currentFriendShip !=null){
            if(targetPet[0].currentFriendShip < 0 && currentFriendShip > 0){
                targetPet[0].currentFriendShip = currentFriendShip;
                setIsPositiveFriendShip(true);
            }
        }
    },[currentFriendShip]);

    useEffect(()=>{ // 펫 도감 정보 초기화
        axios.post(`${serverUrl}/api/friend/select-detail-pet`,
        {email : email},
        {withCredentials: true})
        .then((response)=>{
            if(response.data.messageDetail === "nothing"){
                alert("사용자의 펫이 정해지지 않은 상태입니다!")
                navigate('/signup-pet');//로그인 상태 + 펫
            }else{
                setFriendData(response.data.userInfo);
                const targetPet = response.data.data.filter(item => item.lastChoice === 1);
                if (targetPet.length > 0) {
                    setTargetPet(targetPet);
                    setCurrentFriendShip(targetPet[0].currentFriendShip)
                    setEvolLevel(targetPet[0].evol);
                    setIsPetInitialized(true);// targetPet이 초기화되었음을 설정
                }
            }
        })
        .catch((error) => {
            //todolist에서 처리
        })

        const initializePetData = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/user/has-pet`, { withCredentials: true });
                dispatch(userDataInit(response.data.userInfo));
            } 
            catch (error) {
                handleError(error, navigate);
            }
        };

        initializePetData();
    },[])

    useEffect(() => {
        const newImportantEvents = [];
        //Object.keys 인자로 들어간 객채의 모든 key를 반환
        Object.keys(state).forEach(date => {
            state[date].forEach(event => {
            if (event.important) {
                const eventState = {
                    title: event.title,
                    date: date,
                };
                newImportantEvents.push(eventState);
            }
            });
        });
    
        Object.keys(state).forEach(date => {
            state[date].forEach(event => {
                if (event.important){
                    const eventState = { 
                        title : event.title,
                        start: date,
                    }
                    setImportantEvents([...importantEvents, eventState]);
                    (importantEvents)
                }
                
            });
        });
        setImportantEvents(newImportantEvents);
    }, [state]); // state가 변경될 때마다 이 함수를 다시 실행
    
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
            <div className='text-center color-darkBlue bg-color-violet'>
                <p>현재 {friendData.nickname}({friendData.userId})님 캘린더 확인 중!</p>
            </div>
            <ScheduleAddModal clickedDate={clickedDate}></ScheduleAddModal>
            <Container>
                <Row className="justify-content-md-center">
                    
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
                            const eventsForDay = state[dateStr] ? state[dateStr].filter(event => !event.important) : [];
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
                        datesSet={function (args){
                            axios.post(`${serverUrl}/api/friend/select-detail-todolist`, { email: email }, { withCredentials: true })
                              .then((response) => {
                                dispatch(scheduleInit(response.data.data));
                              })
                              .catch((error) => {
                                if(error.response.data.messageDetail === "Is not friend"){
                                    alert("유효하지 않은 접근이거나 권한이 없습니다.")
                                    navigate('/')
                                }
                                else if(error.response.data.messageDetail === "Is not User"){
                                    handleError(error, navigate);
                                }else{
                                    handleError(error, navigate);
                                }
                              });
                        
                            const view = args.view.calendar.currentData.currentDate;
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
                        <Stack className=' min-w-430'>{/**나중에 줄바꿈 되는 모든 div에 클래스 적용  white-space:nowrap; <-- 스케줄 컴포넌트에 적용해보기 */}
                        <Stack direction='horizontal' className='fc-direction-ltr-2v'>
                            <div className='h-400 w-max section-schedule'>
                                <Stack className=''>
                                    <Row className='section__item-schedule sticky-schedule'>
                                        {isFriend ? "" :<Col sm={2} className='m-auto color-darkBlue text-center'>
                                            <p>완료</p>
                                        </Col>}
                                        <Col sm={2} className='m-auto color-darkBlue text-center'>
                                            <p>시간</p>
                                        </Col>
                                        <Col sm={5} className='m-auto color-darkBlue p-zero text-center'>
                                            <p>일정내용</p>
                                        </Col>
                                        <Col sm={1} className='m-auto color-darkBlue p-zero text-center'>
                                            <p>중요</p>
                                        </Col>
                                        {isFriend ? "" : <Col sm={2} className='m-auto color-darkBlue p-zero text-center'>
                                            <Button onClick={modalShow}>+</Button >
                                        </Col>}
                                    </Row>
                                    {/*비동기 문제 &&로 해결*/
                                        state[clickedDate] && state[clickedDate].map(function(notUse, i){
                                            return(
                                                <Schedule 
                                                i={i} 
                                                clickedDate={clickedDate} 
                                                evolLevel={evolLevel} 
                                                setEvolLevel={setEvolLevel}
                                                setTargetPet={setTargetPet}
                                                setCurrentFriendShip={setCurrentFriendShip}
                                                isFriend={isFriend}/>
                                            )
                                        })
                                    }
                                </Stack>
                            </div>
                        </Stack>
                        {isPetInitialized && <PetUI targetPet={targetPet} currentFriendShip={currentFriendShip} setCurrentFriendShip={setCurrentFriendShip} isPositiveFriendShip={isPositiveFriendShip} isFriend={isFriend}/>}
                        {isPetInitialized && <PetSpaceComponent targetPetData={targetPet} evolLevel={evolLevel} isPositiveFriendShip={isPositiveFriendShip} currentFriendShip={currentFriendShip}/>}
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

export default FriendDetail