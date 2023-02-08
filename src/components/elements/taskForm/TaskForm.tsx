import React, { memo, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//type
import { ITaskFormData, Status, TaskFormProps } from "../../../types";

//style
import "./TaskForm.scss"

//hooks
import useAuth from "../../../hooks/useAuth";

const schema = yup.object({
  title: yup.string().required(() => "This is field is required"),
  assignee: yup.string().required(() => "Please select person assigned"),
  startTime: yup.string().required(() => "This is field is required"),
  endTime: yup.string().required(() => "This is field is required"),
})

const TaskForm = memo(
  ({
    formTitle,
    assigneOptions,
    defaultValues,
    submitButtonLabel,
    submittingButtonLabel,
    isSubmitting,
    onSubmit,
  }: TaskFormProps
  ) => {
    const [valueRange, setValueRange] = useState<string>(defaultValues.progress);
    const { authData } = useAuth()

    const {
      register,
      reset,
      handleSubmit,
      formState: { errors },
    } = useForm<ITaskFormData>({
      resolver: yupResolver(schema),
      defaultValues,
    });

    const onSubmitTask = (data: ITaskFormData) => {
      console.log(data)
      onSubmit(data);
      if (formTitle === "Create_task") {
        reset(defaultValues)
      }
    }

    return (
      <div className="container d-flex justify-content-center mt-4">
        <Card className="task_Form_Container">
          <Card.Header className="text-center text-success"><h2>{formTitle}</h2></Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmitTask)}>
              {authData.role === "Admin" && (
                <div>
                  <Form.Group className="mb-2">
                    <Form.Label
                      className="font-weight-bold mx-1 label_text">
                      Title
                    </Form.Label>
                    <Form.Control
                      placeholder="Title"
                      type="text"
                      {...register("title")}
                    />
                    <span className="mt-1 text-danger">
                      {errors.title?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-2" >
                    <Form.Label
                      className="font-weight-bold mx-1 label_text">
                      Assignee
                    </Form.Label>
                    <Form.Select
                      {...register("assignee")}
                    >
                     <option value="">Assignee</option>
                     <option value="Admin">Admin</option>
                      {assigneOptions.map((assignee) => (
                        <option value={assignee.value}>{assignee.label}</option>
                      ))}
                    </Form.Select>
                    <span className="mt-1 text-danger">
                      {errors.assignee?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label
                      className="font-weight-bold mx-1 label_text">
                      Start time
                    </Form.Label>
                    <Form.Control
                      type="datetime-local"
                      {...register("startTime")}
                    />
                    <span className="mt-1 text-danger">
                      {errors.startTime?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label
                      className="font-weight-bold mx-1 label_text">
                      End time
                    </Form.Label>
                    <Form.Control
                      type="datetime-local"
                      {...register("endTime")}
                    />
                    <span className="mt-1 text-danger">
                      {errors.endTime?.message}
                    </span>
                  </Form.Group>
                </div>
              )}
              <Form.Group className="mb-2">
                <Form.Label
                  className="font-weight-bold mx-1 label_text">
                  Progress <span className="text-danger mx-2">{valueRange}%</span>
                </Form.Label>
                <input type="range"
                  min="0"
                  max="100"
                  step="5"
                  className="w-100 mt-2"
                  value={valueRange}
                  {...register("progress")}
                  onChange={(e) => setValueRange(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label
                  className="font-weight-bold mx-1 label_text">
                  Status
                </Form.Label>
                <Form.Control
                  value={parseInt(valueRange) === 0 ? Status.Todo : parseInt(valueRange) > 0 && parseInt(valueRange) < 100 ? Status.Doing : Status.Done}
                  {...register("status")}
                >
                </Form.Control>
              </Form.Group>
              <div className=" d-flex justify-content-between">
                {isSubmitting ?
                  (<Button className="mt-3" type="submit">
                    {submittingButtonLabel}
                  </Button>
                  ) :
                  (<Button className="mt-3" type="submit">
                    {submitButtonLabel}
                  </Button>)
                }
                <Link to={authData.role === "Admin" ? "/tasks" : `/users/${defaultValues.assignee}`} className=" btn btn-warning mt-3 mx-2"> Back</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )

  }
);
export default TaskForm