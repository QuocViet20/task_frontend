import React, { memo, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

//type
import { ITaskFormData, TaskFormProps } from "../../../types";

const TaskForm = memo(
  (
    // { 
    //   formTitle,
    //   assigneOptions,
    //   defaultValue,
    //   submitButtonLabel,
    //   submittingButtonLabel,
    //   isSubmitting,
    //   onSubmit,
    // }: TaskFormProps
  ) => {

    return (
      <div className="container d-flex justify-content-center">
        <Card className="cardContainer">
          <Card.Header className="text-center text-success">create task</Card.Header>
          <Card.Body>
            <Form>

            </Form>
          </Card.Body>
        </Card>
      </div>
    )

  }
);
export default TaskForm