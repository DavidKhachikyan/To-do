import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  deleteTodo,
  markAsComplete,
  markAsPending,
  checkOverdueTasks,
  updateTodo,
} from "../../features/todos/todoSlice";
import { Button, List, Modal, Input, DatePicker, Checkbox } from "antd";
import moment, { Moment } from "moment";

interface FormValues {
  title: string;
  description: string;
  deadline: Moment | null;
}

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [editTodo, setEditTodo] = useState<any>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    description: "",
    deadline: null,
  });
  const [selectedTodo, setSelectedTodo] = useState<any>(null);

  useEffect(() => {
    dispatch(checkOverdueTasks());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo: any) => {
    setEditTodo(todo);
    setFormValues({
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline ? moment(todo.deadline) : null,
    });
  };

  const handleSave = () => {
    if (editTodo) {
      dispatch(
        updateTodo({
          id: editTodo.id,
          title: formValues.title,
          description: formValues.description,
          deadline: formValues.deadline
            ? formValues.deadline.toISOString()
            : undefined,
          status: editTodo.status,
        })
      );
      setEditTodo(null);
    }
  };

  const handleDateChange = (date: Moment | null) => {
    setFormValues((prev: FormValues) => ({
      ...prev,
      deadline: date,
    }));
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    if (checked) {
      dispatch(markAsComplete(id));
    } else {
      dispatch(markAsPending(id));
    }
  };

  const handleItemClick = (todo: any) => {
    setSelectedTodo(todo);
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={todos}
        className="border flex flex-col cursor-pointer  border-cyan-500 rounded-md py-4 px-10 mt-6 max-h-80 overflow-auto"
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Checkbox
                checked={todo.status === "completed"}
                onChange={(e) =>
                  handleCheckboxChange(todo.id, e.target.checked)
                }
              />,
              <Button type="default" onClick={() => handleDelete(todo.id)}>
                Delete
              </Button>,
              <Button type="default" onClick={() => handleEdit(todo)}>
                Edit
              </Button>,
            ]}
          >
            <div
              onClick={() => handleItemClick(todo)}
              className="flex flex-row w-full items-center"
            >
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
      <Modal
        title="Edit Todo"
        visible={!!editTodo}
        onOk={handleSave}
        onCancel={() => setEditTodo(null)}
      >
        <Input
          value={formValues.title}
          onChange={(e) =>
            setFormValues({ ...formValues, title: e.target.value })
          }
          placeholder="Title"
        />
        <Input.TextArea
          value={formValues.description}
          onChange={(e) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
          placeholder="Description"
          className="mt-3"
        />
        <DatePicker
          value={formValues.deadline}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          className="w-full mt-3"
        />
      </Modal>

      <Modal
        title="Todo Details"
        visible={!!selectedTodo}
        onCancel={() => setSelectedTodo(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedTodo(null)}>
            Close
          </Button>,
        ]}
        className="p-4"
      >
        {selectedTodo && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800">
              Title: {selectedTodo.title}
            </h3>
            <p className="text-lg text-gray-700 mt-2">
              Description: {selectedTodo.description || "No description"}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Status: {selectedTodo.status}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Deadline:{" "}
              {selectedTodo.deadline
                ? moment(selectedTodo.deadline).format("YYYY-MM-DD")
                : "No deadline"}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TodoList;
