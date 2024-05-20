import { Button, Col, Row, Stack } from "react-bootstrap";
import { Progress, Popover } from 'antd';
import { HeartFilled } from "@ant-design/icons";
import { IoHandLeftOutline } from "react-icons/io5";
import { PiForkKnifeBold } from "react-icons/pi";
import { FaHeartBroken } from "react-icons/fa";
import axios from "axios";
import serverUrl from "../serverConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function PetUI(props){
    const {targetPet, currentFriendShip, setCurrentFriendShip, isPositiveFriendShip} = props
    const percentSign = <span style={{ fontSize: "10px" }}>%</span>;
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [isPositiveFriendShipOpen, setIsPositiveFriendShipOpen] = useState(true);
    //popup 제어를 localStorage에 저장 
    //가출 시 알림을 최초 1회 표기 후 hover에만 작동하도록 설정
    useEffect(() => {
        const isPopoverShown = localStorage.getItem('isPopoverShown');
        if (!isPopoverShown && currentFriendShip < 0) {
            setOpen(true);
            localStorage.setItem('isPopoverShown', 'true');
        } 
        else if(!isPopoverShown && currentFriendShip <= 0){
            //호감도가 양수 진입시 다시 알림이 뜰 수 있도록 초기화
            setOpen(false);
            localStorage.setItem('isPopoverShown', 'false');
        }
    }, [currentFriendShip]);

    const hide = () => {
        setOpen(false);
    };

    const positiveHide = () => {
        setIsPositiveFriendShipOpen(false);
    };

    const handleOpenChange = (newOpen) => {
        if (localStorage.getItem('isPopoverShown') === 'true') {
            setOpen(newOpen);
        }
    };

    function changeToPercent(current, max){
        return current / max * 100
    }

    function petUIEventHandler(id){
        axios.get(`${serverUrl}/api/user/interaction`,
        {
            params: { id: id },
            withCredentials: true
        })
        .then((response)=>{
            setCurrentFriendShip(response.data.data.friendship)
        })
        .catch((error)=>{
            if(error.response){ // 런타임 에러방지 error.response가 있는지 먼저 확인함
                if(error.response.status === 401) { // 토큰 만료 리다이렉트
                    console.log("Error status: " + error.response.status);
                    alert("로그인을 다시해주세요!");
                    navigate('/');
                }
                else if(error.response.status === 400){
                    if(id === 'hands'){
                        alert("하루 할당량을 모두 사용하였습니다!")
                    }else if(id === 'feed'){
                        alert("현재 할당량 모두 사용!\n각 시간대에 한번씩 사용가능! \n07:00 ~ 09:00\n12:00 ~ 14:00\n17:00 ~ 22:00")
                    }

                }
                else{
                  alert("서버와 연결에 실패했습니다.");
                }
            }
        })
    }

    return(
        <div className='pet-ui'>
            <Row>
                <Col sm={9}>
                    <Stack>
                        <p className="color-darkBlue margin-left">이름 : {targetPet[0].nickname}</p>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        {/* local storage 이용 최초 1회 후에는 hovering으로 tooltip 표시 state 상태에 broken heart icon으로 변경*/}
                        
                            {//호감도가 음수일때 icon 변경, 경고 알림 출력
                            currentFriendShip < 0 ? 
                            <Popover
                                content={<a onClick={hide} className="color-darkBlue">닫기</a>}
                                title="경고: 당신의 행동에 실망한 펫이 가출했습니다!"
                                trigger="hover"
                                placement="bottomLeft"
                                open={open}
                                onOpenChange={handleOpenChange}
                            >
                                <FaHeartBroken className="color-redfull font-size-20 margin-left"/>  
                            </Popover>
                            : isPositiveFriendShip ? 
                            <Popover
                            content={<a onClick={positiveHide} className="color-darkBlue">닫기</a>}
                            title="펫 복귀"
                            placement="bottomLeft"
                            open={isPositiveFriendShipOpen}
                            >
                                <HeartFilled className="color-redfull font-size-20 margin-left"/>
                            </Popover> 
                            :<HeartFilled className="color-redfull font-size-20 margin-left"/> 
                               
                            }
                        
                        <Stack>
                            <p className="font-size-sm color-darkBlue font-weight-800">{currentFriendShip} / {targetPet[0].maxFriendShip}</p>
                            <Progress 
                            className="max-w-250 line-hight-1"
                            format={(percent) => <>{percent}{percentSign}</>}
                            percent={
                                changeToPercent(
                                    currentFriendShip,
                                    targetPet[0].maxFriendShip
                                ).toFixed(1)
                            }
                            status="active"
                            size={[, 10]}
                            />
                        </Stack>
                    </Stack>
                </Col>
                <Col sm={3} className="text-center">
                    <Stack direction="horizontal" gap={2} >
                        <Stack className="text-center color-violet cursor-pointer"
                        onClick={() => petUIEventHandler('hands')}>
                            <IoHandLeftOutline size={30} className="m-auto"/>
                            <p className="font-size-sm">
                                쓰다듬기
                            </p>
                        </Stack>
                        <Stack className="text-center color-violet cursor-pointer"
                        onClick={() => petUIEventHandler('feed')}>
                            <PiForkKnifeBold size={30} className="m-auto"/>
                            <p className="font-size-sm">
                                먹이주기
                            </p>
                        </Stack>
                    </Stack>
                </Col>
            </Row>
        </div>
    );
}

export default PetUI;
