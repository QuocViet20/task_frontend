// library
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { memo, useMemo, useState } from "react";
import { toast } from "react-toastify";

// types
import { ITaskFormData, User } from "../../../types";

// service_api 
import { addTask, getAssignee } from "../../../api/serviceApi";

// consts
import { DEFAULT_TASK_FORM_DATA } from "../../../consts";
import {
  TASK_FORM_TITLE,
  SUBMIT_BUTTON_LABEL,
  SUBMITTING_BUTTON_LABEL
} from "./consts";

// components
import TaskForm from "../../../components/elements/taskForm/TaskForm";

// hooks
import useAuth from "../../../hooks/useAuth";

const CreateTaskPage = memo(() => {
  const { authData } = useAuth()

  const { data: assigneeResponse } = useQuery({
    queryKey: ["assigneeTask"],
    queryFn: () => getAssignee(),
  })

  const assigneOptions = useMemo(() => {
    if (_.isNil(assigneeResponse)) {
      return [];
    }
    return assigneeResponse.data.map((assignee: User) => ({
      label: assignee.username,
      value: assignee.id,
    }))
  }, [assigneeResponse])

  const createTaskMutation = useMutation({
    mutationFn: (body: ITaskFormData) => {
      return addTask(body)
    },
    onError: () => {
      toast.error("addTask error", {
        position: toast.POSITION.TOP_RIGHT
      })
    },
    onSuccess: () => {
      toast.success("addTask success", {
        position: toast.POSITION.TOP_RIGHT
      })

    }
  })

  const onSubmit = (data: ITaskFormData) => {
    if(data.assignee ===  authData.role){
      data.assignee = authData.userId;
    }
    createTaskMutation.mutate(data);
  }


  return (
    <TaskForm
      formTitle={TASK_FORM_TITLE}
      assigneOptions={assigneOptions}
      defaultValues={DEFAULT_TASK_FORM_DATA}
      submitButtonLabel={SUBMIT_BUTTON_LABEL}
      submittingButtonLabel={SUBMITTING_BUTTON_LABEL}
      isSubmitting={createTaskMutation.isLoading}
      onSubmit={onSubmit}
    />
  )

})

export default CreateTaskPage