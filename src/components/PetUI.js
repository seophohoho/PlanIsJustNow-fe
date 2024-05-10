import { Button, Col, Row, Stack } from "react-bootstrap";
import { Avatar, Progress, Icon } from 'antd';
import { HeartFilled } from "@ant-design/icons";
function PetUI(props){
    const {targetPet} = props
    const percentSign = <span style={{ fontSize: "5px" }}>%</span>;

    function changeToPercent(current, max){
        return current / max * 100
    }

    return(
        <div className='fc-direction-ltr-2v'>
            <Row>
                <Col sm={7}>
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
                <Col sm={5} className="text-center">
                    <Stack direction="horizontal" className="" gap={2}>
                        <Button className="ms-auto">
                            <Icon src="\pet-space\icon-cutlery.png"/>쓰다듬기
                            <image src="\pet-space\icon-cutlery.png"></image>
                        </Button>
                        <Button>
                            <Icon src="/pet-space/icon-cutlery.png"/>먹이주기
                        </Button>    
                    </Stack>
                </Col>
            </Row>
        </div>
    );
}

export default PetUI