import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Todo from "./pages/Todo/Todo";
import TrashCan from "./pages/TrashCan/TrashCan";
import HeaderApp from "./components/Header/Header";
import store, { persistor } from "./store/store";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout className="min-h-screen">
          <HeaderApp />
          <Content className="p-5">
            <Routes>
              <Route path="/" element={<Todo />} />
              <Route path="/trash" element={<TrashCan />} />
            </Routes>
          </Content>
        </Layout>
      </PersistGate>
    </Provider>
  );
};

export default App;
