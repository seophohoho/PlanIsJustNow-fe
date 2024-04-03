import {Col, Row} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { EllipsisOutlined, StarTwoTone } from '@ant-design/icons';
import { Tabs } from 'antd';
import { TeamOutlined, UserAddOutlined } from '@ant-design/icons';
import { useState } from "react";
import { scheduleDelete } from "../store/store";
import NavbarComponent from "../components/NavbarComponent";

function FriendBoard() {
    return (
      <>
      <header>
        <NavbarComponent/>
      </header>
      <body>
      <Tabs
        className="m-auto text-center"
        defaultActiveKey="2"
        items={[TeamOutlined, UserAddOutlined].map((Icon, i) => {
          const id = String(i + 1);
          const tabTitle = ["친구목록", "친구추가"]
          return {
            key: id,
            label: tabTitle[i],
            children: `Hello Tab ${id}!`,
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
{/*취업지원제도*/}
export default FriendBoard;