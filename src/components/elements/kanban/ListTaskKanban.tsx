import { Droppable } from "react-beautiful-dnd";
import { useMutation, useQuery } from "@tanstack/react-query";
import TaskItem from "./TaskItem";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { MdNoteAdd } from 'react-icons/md'
import { Form, Modal } from "react-bootstrap";
import _, { add } from "lodash"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


//api
import { deleteTask, addTask, getAssignee } from "../../../api/serviceApi";

//types
import { Option, Task, User, ITaskFormData, NewTask, Status } from "../../../types";

//component
import Loading from "../loading/Loading";

//hooks
import useAuth from "../../../hooks/useAuth";
import { use } from "i18next";

interface ListTaskKanbanProps {
  col:{
    id:string,
    columnTasks: Task[];
  }
}

const schema = yup.object({
  title: yup.string().required(() => "This is field is required"),
  assignee: yup.string().required(() => "Please select person assigned"),
  startTime: yup.string().required(() => "This is field is required"),
  endTime: yup.string().required(() => "This is field is required"),
})

const ListTaskKanban = ({
  col:{id, columnTasks},
  }:ListTaskKanbanProps ) => {
  const { authData } = useAuth();
  const [tasks, setTasks ] = useState<Task[]>(columnTasks);
  const [valueRange, setValueRange ] = useState("0");
  const [modalCreate, setModalCreate ] = useState(false)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ITaskFormData>({
    resolver: yupResolver(schema),
    defaultValues:{
      title:"",
      assignee:"",
      startTime:"",
      endTime:"",
      progress:"0"
    },
  });

  
  useEffect(() => {
    setTasks(columnTasks)
  },[columnTasks])

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      toast.success("Delete task success", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  })

  const handleDelete = (id: number) => {
    const newListTasks = tasks.filter((task: Task) => task.id !== id);
    setTasks(newListTasks)
    deleteMutation.mutate(id)
  }


  const { data: assigneeResponse, isLoading: isAssigneeLoading, } = useQuery({
    queryKey: ["assigneeTask"],
    queryFn: () => getAssignee(),
  })

  const creatTaskMutation = useMutation({
    mutationFn: (body: NewTask) => {
      return addTask(body);
    },
    onError: () => {
      toast.error("addTask error", {
        position: toast.POSITION.TOP_RIGHT
      })
    },
    onSuccess: () => {
      toast.success("addTask success",{
        position: toast.POSITION.TOP_RIGHT
      })
    }
  })

  const onSubmit = (data: ITaskFormData) => {
    if(data.assignee ===  authData.role){
      data.assignee = authData.userId;
    }
    data.status = id === "Todo"?Status.Todo:id === "Doing"? Status.Doing:Status.Done;
    data.progress = data.status ==="Todo"?"0":data.status === "Doing"?data.progress:"100"
    creatTaskMutation.mutate({...data,comments:[]});
    setTasks([{...data,comments:[]},...columnTasks]);
    reset({
      title:"",
      assignee:"",
      startTime:"",
      endTime:"",
      progress:"0"
    })
  }


  const assigneOptions = useMemo(() => {
    if (_.isNil(assigneeResponse)) {
      return [];
    }
    return assigneeResponse.data.map((assignee: User) => ({
      label: assignee.username,
      value: assignee.id,
    }))
  }, [assigneeResponse])
  
  if(isAssigneeLoading){
    return <Loading/>
  }

  return (
   
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={`col-4`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
              <div className={
                `${id=== "Todo" ?"todos":id === "Doing"?"doing":"done" } 
                ${snapshot.isDraggingOver ? id === "Todo" ? "dragTodo":id === "Doing"?"dragDoing":"DrangDone" : ""}`}>
                <div className="d-flex">
                 <h4 className="text-center col-11">{id}</h4>
                 <span className="addTask_icon " onClick={() => setModalCreate(true)}><MdNoteAdd/></span>
                </div>

              {tasks.map((task, index) => (
                <TaskItem
                task={task}
                index={index}
                key={task.id}
                handleDelete= {handleDelete}
                />
              ))}
            </div>
            <Modal show = {modalCreate} onHide={() => setModalCreate(false)}>
              <Modal.Body>
                <div className="d-flex mb-2">
                  <h2 className="text-center text-info col-11">Create Task</h2>
                  <span className="text-danger mt-1 h3 cursor-pointer" onClick={() => setModalCreate(false)}>X</span>
                </div>
                <div className="border -1"></div>
                <form className="mt-3 px-4" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-2">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      {...register("title")}
                    />
                    <span className="mt-1 text-danger">
                      {errors.title?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Assignee:</Form.Label>
                    <Form.Select
                      {...register("assignee")}
                    >
                      <option value=""></option>
                      <option value="Admin">Admin</option>
                      {assigneOptions.map((assignee:Option) => (
                        <option value={assignee.value}>{assignee.label}</option>
                      ))}
                    </Form.Select>
                    <span className="mt-1 text-danger">
                      {errors.assignee?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Start time:</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      {...register("startTime")}
                    />
                    <span className="mt-1 text-danger">
                      {errors.startTime?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>End time:</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      {...register("endTime")}
                    />
                    <span className="mt-1 text-danger">
                      {errors.endTime?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Progress: <span className="text-danger mx-2">{valueRange}%</span>
                      </Form.Label>
                    <input 
                      className="w-100"
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={valueRange}
                      {...register("progress")}
                      onChange={(e) => setValueRange(e.target.value)}
                    />
                  </Form.Group>
                  <button type='submit' className="btn btn-primary mb-2">Submit</button>
                </form>
              </Modal.Body>

            </Modal>
          </div>
        )}
      </Droppable>


  )

}

export default ListTaskKanban