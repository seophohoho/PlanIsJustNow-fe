import { useState } from "react";
import {Col, Row, Stack, Button, Form} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Tabs, Avatar } from 'antd';
import { TeamOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { scheduleDelete } from "../store/store";
import NavbarComponent from "../components/NavbarComponent";

function TabChildrenComponent(props){ 
  const state = useSelector((state)=>state)
  const {i, index, user} = props
  const dispatch = useDispatch();
  return(
    <Row className='section__item-schedule'>
          <Col sm={3} className='text-center impo-margin-zero p-zero'>
          </Col>
          <Col sm={1} className='color-darkBlue text-right'>
            <Avatar className='' size={64} icon={<UserOutlined/>} />
          </Col>
          <Col sm={2} className='m-auto color-darkBlue p-zero'>
          <p className='color-darkBlue text-left'>{user.userName}</p>
        <p className='color-violet text-left'>{user.userEmail}</p></Col>
          <Col sm="auto">
            <Button className='font-weight-800'>{i === 0 ? "살펴보기" : "친구수락"}</Button>
            <Button className='margin-left bg-darkblue font-weight-800'>{i === 0 ? "친구삭제" : "거절하기"}</Button>
          </Col>
          <Col sm={3}>
          </Col>
    </Row>
  );
}

function FriendBoard() {
    const state = useSelector((state)=>state)

    return (
      <>
      <header>
        <NavbarComponent/>
      </header>
      <body className="beak-point">
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
            <Stack gap={3}>{/*redux state와 i에 따라 map*/}
              {i === 0 ? 
                <Form.Group as={Row} className="mb-4">
                        <Col sm={3}></Col>
                        <Col className='mb-3 m-auto' sm={3}>{/** input칸 */}
                        <Form.Control
                                type="eamil" 
                                className='form-Control'
                                placeholder='friend@gmail.com'
                                onChange={(e)=>{
                                }}
                            />
                        </Col>
                        <Col sm="auto">
                          <Button>친구요청</Button>
                        </Col>
                        <Col sm={3}></Col>
                </Form.Group>
              : ""}
              {
                  state.friendList[i === 0 ? "userList" : "userRequest"].map((user, index) => {
                    return (
                      <TabChildrenComponent key={index} i={i} index={index} user={user}/>
                    );
                  })
              }
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