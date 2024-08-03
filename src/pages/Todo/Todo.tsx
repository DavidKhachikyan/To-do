import React from "react";
import TodoList from "../../components/Todo/TodoList";
import TodoForm from "../../components/Todo/TodoForm";

const Todo: React.FC = () => {
  return (
    <div>
      <div className="max-w-[600px] my-0 mx-auto">
        <TodoForm />
      </div>
      <TodoList />
    </div>
  );
};

export default Todo;
