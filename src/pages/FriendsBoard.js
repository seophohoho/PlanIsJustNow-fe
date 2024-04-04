import { useState } from "react";
import {Col, Row, Stack} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { EllipsisOutlined, StarTwoTone } from '@ant-design/icons';
import { Tabs } from 'antd';
import { TeamOutlined, UserAddOutlined } from '@ant-design/icons';
import { scheduleDelete } from "../store/store";
import NavbarComponent from "../components/NavbarComponent";

function TabChildrenComponent(props){ 
  return(
    <div>
      {props.i === 0 ? <span>hello1</span> : <span>hello2</span>}
    </div>
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