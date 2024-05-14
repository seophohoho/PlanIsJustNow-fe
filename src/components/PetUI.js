import { Button, Col, Row, Stack } from "react-bootstrap";
import { Avatar, Progress, Icon } from 'antd';
import { HeartFilled } from "@ant-design/icons";
import { IoHandLeftOutline } from "react-icons/io5";
import { PiForkKnifeBold } from "react-icons/pi";
import axios from "axios";
import serverUrl from "../serverConfig";
import { useNavigate } from "react-router-dom";

function PetUI(props){
    const {targetPet, currentFriendShip, setCurrentFriendShip} = props
    const percentSign = <span style={{ fontSize: "10px" }}>%</span>;
    const navigate = useNavigate()

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
                        <HeartFilled className="color-redfull font-size-20 margin-left"/>
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

export default PetUI