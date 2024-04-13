import { useState } from "react";
import {Col, Row, Stack, Button, Form} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Tabs, Avatar } from 'antd';
import { TeamOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { friendDelete, friendRefuse, friendAccept } from "../store/store";
import NavbarComponent from "../components/NavbarComponent";
import TabChildrenComponent from "../components/TabChildrenConponent";

function FriendBoard() {
    const state = useSelector((state)=>state.friendList)
    const dispatch = useDispatch()

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
                          placeholder='Friend@email.com'
                          onChange={(e)=>{console.log(e.target.value)}
                        }/>
                        </Col>
                        <Col sm="auto">
                          <Button onClick={(e)=>{}}>친구요청</Button>
                        </Col>
                        <Col sm={3}></Col>
                </Form.Group>
              : ""}
              {//tab1,2에 따라 다르게 목록을 출력
                  state[i === 0 ? "userList" : "userRequest"].map((user, index) => {
                    return (
                      <TabChildrenComponent key={index} i={i} index={index} user={user} list={i === 0 ? "userList" : "userRequest"}/>
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