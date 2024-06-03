import { Col, Row, Stack } from "react-bootstrap";
import { Progress, Popover } from 'antd';
import { HeartFilled } from "@ant-design/icons";
import { IoHandLeftOutline } from "react-icons/io5";
import { PiForkKnifeBold } from "react-icons/pi";
import { FaHeartBroken } from "react-icons/fa";
import axios from "axios";
import serverUrl from "../serverConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import handlePetUIerror from "../function/handlePetUIerror";

function PetUI(props){
    const {targetPet, currentFriendShip, setCurrentFriendShip, isPositiveFriendShip, isFriend} = props
    const percentSign = <span style={{ fontSize: "10px" }}>%</span>;
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [isPositiveFriendShipOpen, setIsPositiveFriendShipOpen] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    
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

    async function petUIEventHandler(id) {
        try {
            const response = await axios.get(`${serverUrl}/api/user/interaction`, {
                params: { id: id },
                withCredentials: true
            });
            if(response.status === 200 && id === 'hands'){
                setErrorMsg("쓰다듬기 완료!");
            }
            else if(response.status === 200 && id === 'feed'){
                setErrorMsg("밥주기 완료!");
            }
            setCurrentFriendShip(response.data.data.friendship);
        } catch (error) {
            handlePetUIerror(error, id, navigate, setErrorMsg);
        }
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
                                title={isFriend ? "친구의 펫이 가출상태입니다." : "경고: 당신의 행동에 실망한 펫이 가출했습니다!"}
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
                            title="펫이 복귀했습니다!"
                            placement="bottomLeft"
                            open={isPositiveFriendShipOpen}
                            >
                                <HeartFilled className="color-redfull font-size-20 margin-left"/>
                            </Popover> 
                            :<HeartFilled className="color-redfull font-size-20 margin-left"/> 
                               
                        }
                        {errorMsg && (
                            <Popover 
                                content={<a onClick={() => setErrorMsg(null)} className="color-darkBlue">닫기</a>}
                                title={<p style={{ whiteSpace: "pre-wrap" }}>{errorMsg}</p>}
                                trigger="click"
                                placement="bottomLeft"
                                open={true}
                            >
                            </Popover>
                        )}
                        
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
                        {
                        isFriend ? "" : <>
                        <Stack 
                        className="text-center color-darkBlue cursor-pointer"
                        onClick={() => petUIEventHandler('hands')}>
                            <IoHandLeftOutline size={30} className="m-auto" />
                            <p className="font-size-sm">쓰다듬기</p>
                        </Stack>
                        <Stack 
                        className="text-center color-darkBlue cursor-pointer"
                        onClick={() => petUIEventHandler('feed')}>
                            <PiForkKnifeBold size={30} className="m-auto" />
                            <p className="font-size-sm">먹이주기</p>
                        </Stack></>
                        }
                    </Stack>
                </Col>
            </Row>
        </div>
    );
}

export default PetUI;