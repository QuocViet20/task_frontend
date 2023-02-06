// library
import { useMutation } from "@tanstack/react-query";
import _ from "lodash";
import { memo } from "react";
import { toast } from "react-toastify";

// types
import { ITaskFormData} from "../../../types";

// service_api 
import { addTask,} from "../../../api/serviceApi";

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

const CreateTaskAdminPage = memo(() => {
  const { authData } = useAuth()

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
    if(data.assignee === authData.role){
      data.assignee = authData.userId
    }
    createTaskMutation.mutate(data);
  }

  return (
    <TaskForm
      formTitle={TASK_FORM_TITLE}
      assigneOptions={[]}
      defaultValues={DEFAULT_TASK_FORM_DATA}
      submitButtonLabel={SUBMIT_BUTTON_LABEL}
      submittingButtonLabel={SUBMITTING_BUTTON_LABEL}
      isSubmitting={createTaskMutation.isLoading}
      onSubmit={onSubmit}
    />
  )

})

export default CreateTaskAdminPage