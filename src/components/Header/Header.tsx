import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Typography from "antd/es/typography/Typography";
import { SmileOutlined } from "@ant-design/icons";

const { Header } = Layout;

const HeaderApp: React.FC = () => {
  return (
    <Header className="bg-[#64b36d]">
      <div className="flex items-center justify-between ">
        <Menu mode="horizontal" className="flex-1 bg-[#64b36d]">
          <Menu.Item key="1">
            <Link to="/">To do</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/trash">Trash Can</Link>
          </Menu.Item>
        </Menu>
        <div className=" items-center hidden sm:flex">
          <Typography className="text-white text-xl sm:text-3xl font-bold">
            Your To do
          </Typography>
          <SmileOutlined className="text-3xl text-white ml-4 animate-bounce" />
        </div>
      </div>
    </Header>
  );
};

export default HeaderApp;
