import { useState } from "react";
import {Col, Row, Stack, Button} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Tabs, Avatar } from 'antd';
import { TeamOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { scheduleDelete } from "../store/store";
import NavbarComponent from "../components/NavbarComponent";

function TabChildrenComponent(props){ 
  return(
    <Row className='section__item-schedule'>
          <Col sm={3} className='text-center impo-margin-zero p-zero'>
          </Col>
          <Col sm={1} className='color-darkBlue text-right'>
            <Avatar className='' size={64} icon={<UserOutlined/>} />
          </Col>
          <Col sm={2} className='m-auto color-darkBlue p-zero'>
            <p className='color-darkBlue text-left'>홍길동</p>{/*이름, 아이디, 모두 state에서 바인딩해야 함 로그아웃에 이벤트 넣어야함 로그인 화면으로 라우팅 하는 것도*/}
            <p className='color-violet text-left'>#Email@example.com</p>
          </Col>
          <Col sm={3}>
            <Button className=''>살펴보기</Button>
            <Button className='margin-left'>친구삭제</Button>
          </Col>
          <Col sm={3}>
          </Col>
      </Row>
  );
}

function FriendBoard() {
    // props 로 i만 전달 tab children는 컴포로 분리후 map으로 Tabs children prop으로 전달 하는 식으로
    // redux state는 친구 수락이랑 목록으로 하고 key는 2개로
    
    return (
      <>
      <header>
        <NavbarComponent/>
      </header>
      <body>
      <Tabs
        className="m-auto text-center"
        defaultActiveKey="0"/*tab 최초 시작지점*/
        items={[TeamOutlined, UserAddOutlined].map((Icon, i) => {
          const id = String(i + 1);
          const tabTitle = ["친구목록", "친구추가"]
          return {
            key: id,
            label: tabTitle[i],
            children: 
            <Stack>
              <TabChildrenComponent i={i}/>
            </Stack>,
            icon: <Icon />,
          };
        })}
      />
      </body>
      <footer>

      </footer>
      </>
      );
}


export default FriendBoard;