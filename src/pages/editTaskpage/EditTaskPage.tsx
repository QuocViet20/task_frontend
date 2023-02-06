import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash"
import { memo, useMemo, useState } from "react";

import { toast } from "react-toastify";
import { useParams, useNavigate} from "react-router-dom";

//components
import TaskForm from "../../components/elements/taskForm/TaskForm";
import Loading from "../../components/elements/loading/Loading";

// types
import { ITaskFormData, User, Status } from "../../types";
import { DEFAULT_TASK_FORM_DATA } from "../../consts";

import { 
  TASK_FORM_TITLE, 
  SUBMIT_BUTTON_LABEL, 
  SUBMITTING_BUTTON_LABEL 
} from "./consts";

// service_api
import { getAssignee, updateTask, getTask } from "../../api/serviceApi";
import useAuth from "../../hooks/useAuth";

const EditTaskPage = memo(() => {
  const { taskId } = useParams();
  const [ isSelectedAdmin, setIsSelectedAdmin] = useState<boolean>(true)
  const { authData } = useAuth();

  const {
    data: taskResponse,
    isLoading: isTaskLoading,
    isError: isTaskError,
  } = useQuery({
    queryFn: () =>  getTask(taskId as string),
    enabled: !_.isNil(taskId)
  });

  const { data: assigneeResponse } = useQuery({
    queryKey: ["assigneeTask"],
    queryFn:() => getAssignee(),
  })

  const assigneOptions = useMemo(() => {
    if(_.isNil(assigneeResponse)){
      return [];
    }
    return assigneeResponse.data.map((assignee: User) => ({
      label: assignee.username,
      value: assignee.id,
    }))
  },[assigneeResponse])

 
 

  const editTaskMutation = useMutation({
    mutationFn: (body: ITaskFormData) => {
      return updateTask(taskId as string, body);
    },
    onError: () => {
      toast.error("Edit task failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    onSuccess: () => {
      toast.success("Edit task successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });

  const onSubmit = (data:ITaskFormData) => {

    if(parseInt(data.progress) === 0){
      data.status = Status.Todo
    }
    if(parseInt(data.progress)>0 && parseInt(data.progress)<100){
      data.status = Status.Doing
    }
    if(parseInt(data.progress) == 100 ){
      data.status = Status.Done
    }
    editTaskMutation.mutate(data)
  }

  if (isTaskError) 
  return  <h1 className="container text-danger text-center mt-4">Not found data</h1>

  if (isTaskLoading){
    return <Loading />
  }

  const defaultValues =  () => {
    if(_.isNil(taskResponse)) {
      return DEFAULT_TASK_FORM_DATA
    }
    const { title, assignee, startTime, endTime, status, progress}  = taskResponse.data;
    if( authData.role === "Admin" && assignee === authData.userId){
      return { title, assignee: "Admin", startTime, endTime, status, progress} 
    }
    return { title, assignee, startTime, endTime, status, progress} 
  }

  return (
    <TaskForm 
      formTitle={TASK_FORM_TITLE}
      assigneOptions={assigneOptions}
      defaultValues={defaultValues()}
      submitButtonLabel={SUBMIT_BUTTON_LABEL}
      submittingButtonLabel={SUBMITTING_BUTTON_LABEL}
      isSubmitting={editTaskMutation.isLoading} 
      onSubmit={onSubmit}
    />
  )

})

export default EditTaskPage

