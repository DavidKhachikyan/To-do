import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Todo from "./pages/Todo/Todo";
import TrashCan from "./pages/TrashCan/TrashCan";
import HeaderApp from "./components/Header/Header";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <HeaderApp />
      <Content className="p-5">
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/trash" element={<TrashCan />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
