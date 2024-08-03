import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, List } from "antd";
import { RootState } from "../../store/store";
import {
  permanentDeleteTodo,
  restoreTodo,
} from "../../features/todos/todoSlice";
import moment from "moment";

const TrashCan: React.FC = () => {
  const dispatch = useDispatch();
  const trash = useSelector((state: RootState) => state.todos.trash);

  const handleRestore = (id: number) => {
    dispatch(restoreTodo(id));
  };

  const handlePermanentDelete = (id: number) => {
    dispatch(permanentDeleteTodo(id));
  };

  return (
    <div>
      <h2 className="text-2xl text-lime-500">Trash Can</h2>
      <List
        itemLayout="horizontal"
        className="border border-cyan-500 rounded-md py-4 px-10 mt-6 "
        dataSource={trash}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button onClick={() => handleRestore(todo.id)}>Restore</Button>,
              <Button danger onClick={() => handlePermanentDelete(todo.id)}>
                Delete Permanently
              </Button>,
            ]}
          >
            <div className="flex flex-row w-full items-center">
              <List.Item.Meta
                title={todo.title}
                description={
                  <div className="max-w-60 overflow-hidden text-ellipsis mb-3">
                    {todo.description || "No description"}
                  </div>
                }
              />
              <div className=" flex-col min-w-36 hidden sm:flex">
                <span className="text-lime-600">Status: {todo.status}</span>
                {todo.deadline && (
                  <span>
                    Deadline: {moment(todo.deadline).format("YYYY-MM-DD")}
                  </span>
                )}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TrashCan;
