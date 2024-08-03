import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Form } from "antd";
import moment, { Moment } from "moment";
import GenericButton from "../GenericButton/GenericButton";
import GenericDatePicker from "../GenericDatePicker/GenericDatePicker";
import { addTodo } from "../../features/todos/todoSlice";

interface TodoFormInputs {
  title: string;
  description?: string;
  deadline?: Date | null;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
  deadline: yup.date().nullable().optional(),
});

const TodoForm: React.FC = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: TodoFormInputs) => {
    dispatch(
      addTodo({
        title: data.title,
        description: data.description,
        deadline: data.deadline ? data.deadline.toISOString() : undefined,
      })
    );
    reset();
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      <Form.Item
        label="Title"
        validateStatus={errors.title ? "error" : ""}
        className="mb-1"
        help={errors.title ? errors.title.message : ""}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Description" className="mb-1">
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input.TextArea {...field} />}
        />
      </Form.Item>
      <Form.Item label="Deadline">
        <Controller
          name="deadline"
          control={control}
          render={({ field }) => (
            <GenericDatePicker
              {...field}
              format="YYYY-MM-DD"
              className="w-full"
              value={field.value ? moment(field.value) : null}
              onChange={(date: Moment | null, dateString: string | string[]) =>
                field.onChange(date ? date.toDate() : null)
              }
            />
          )}
        />
      </Form.Item>
      <div className="flex justify-center">
        <GenericButton type="primary" htmlType="submit">
          Add Task
        </GenericButton>
      </div>
    </Form>
  );
};

export default TodoForm;
