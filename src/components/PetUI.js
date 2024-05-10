import { Button, Col, Row, Stack } from "react-bootstrap";
import { Avatar, Progress, Icon } from 'antd';
import { HeartFilled } from "@ant-design/icons";
import { IoHandLeftOutline } from "react-icons/io5";
import { PiForkKnifeBold } from "react-icons/pi";
function PetUI(props){
    const {targetPet} = props
    const percentSign = <span style={{ fontSize: "5px" }}>%</span>;

    function changeToPercent(current, max){
        return current / max * 100
    }

    return(
        <div className='pet-ui'>
            <Row>
                <Col sm={9}>
                    <Stack>
                        <p className="color-darkBlue margin-left">이름 : {"name 바인딩"}</p>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <HeartFilled className="color-redfull font-size-20 margin-left"/>
                        <Stack>
                            <p className="font-size-sm color-darkBlue font-weight-800">{targetPet[0].currentFriendShip} / {targetPet[0].maxFriendShip}</p>
                            <Progress 
                            className="max-w-250 line-hight-1"
                            format={(percent) => <>{percent}{percentSign}</>}
                            percent={
                                changeToPercent(
                                    targetPet[0].currentFriendShip,
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
                        <Stack className="text-center color-violet cursor-pointer">
                            <IoHandLeftOutline size={30} className="m-auto"/>
                            <p className="font-size-sm">
                                쓰다듬기
                            </p>
                        </Stack>
                        <Stack className="text-center color-violet cursor-pointer">
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