import React, { useState, useMemo, ChangeEvent} from "react";
import { Task } from "../../../types";
import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import moment from "moment";
import { useQuery, useMutation } from "@tanstack/react-query";
import _ from "lodash"
import { toast } from "react-toastify";
import { Modal, Button,Form } from "react-bootstrap";
import { useForm } from "react-hook-form"

//style
import "./TaskItem.scss";

//api 
import { getAssignee, deleteTask, updateTask } from "../../../api/serviceApi";
import { User, Option, ITaskFormData, Status } from "../../../types";
import Loading from "../loading/Loading";

interface TaskItemProps {
  task: Task;
  index: number
}

interface UpdateTask {
  assignee:string;
  startTime: string;
  endTime: string;
  progress: string;
}

const TaskItem = ({
  task, index
}: TaskItemProps) => {
  const [ detail, setDetail ] = useState(false);
  const [showDelete, setShowDelete ] = useState(false)
  const [valueRange, setValueRange] = useState<string>(task.progress);
  const [editDisplay, setEditDisplay] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTask>({
    defaultValues:{
      assignee: task.assignee,
      startTime: task.startTime,
      endTime: task.endTime,
      progress:task.progress,
    }
  });

  const { data: assigneeResponse, isLoading: isAssigneeLoading, } = useQuery({
    queryKey: ["assigneeTask"],
    queryFn: () => getAssignee(),
  })

  const editTaskMutation = useMutation({
    mutationFn: (body: ITaskFormData) => {
      return updateTask(task.id as string, body);
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
  

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      toast.success("Delete task success", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  })
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
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
    return <Loading />
  }


  const onSubmitTask = (data:UpdateTask) => {
    const newUpdateTask: ITaskFormData = {
      title: task.title,
      assignee: data.assignee,
      startTime: data.startTime,
      endTime: data.endTime,
      progress: data.progress,
      status:(parseInt(data.progress) === 0)?Status.Todo:(parseInt(data.progress) > 0 && parseInt(data.progress) < 100)?Status.Doing:Status.Done
    }
    editTaskMutation.mutate(newUpdateTask);
    window.location.reload();
    setDetail(true)
    setEditDisplay(false)
  }
  



  return(
    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div 
        className={`card mt-2 taskItem ${snapshot.isDragging ? "drag" : ""}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
          <div className="mx-2">
            <p className="text-center text-dark pb-1 mt-1">{task.title}</p>
            { detail && !editDisplay && 
            <div>

                <p> Assignee: { assigneOptions.length > 0 ? assigneOptions?.find((item: Option) => Number(task.assignee) === item.value)?.label: ""}
                </p>
 
              <p>Start time: {moment(task.startTime).format('DD/MM /YYYY HH:mm A')} </p>
              <p>End time: {moment(task.endTime).format('DD/MM /YYYY HH:mm A')}</p>
              <p>Progress: {task.progress}%</p>
              <input className="w-100" type="range" value={task.progress} />
            </div>
            }
            {
              editDisplay &&
           
            <form onSubmit={handleSubmit(onSubmitTask)}>
              <div className="d-inline-flex align-items-center mb-3" >
                <span> Assignee: </span>
                <Form.Select  className="mx-3"
                {...register("assignee")}
                >
                  {assigneOptions.map((assignee:Option) => (
                    <option value={assignee.value}>{assignee.label}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="d-inline-flex align-items-center w-100 mb-3">
                <span className="col-3"> Start time:</span>
                <Form.Control  
                type="datetime-local" 
                {...register("startTime")}
                />
              </div>
                
              <div className="d-inline-flex align-items-center w-100 mb-3">
                <span className="col-3"> End time:</span>
                <Form.Control 
                type="datetime-local"
                {...register("endTime")}
                />
              </div>
                <p>Progress: {valueRange}%</p>
                <input className="w-100"
                type="range" 
                min="0"
                  max="100"
                  step="5"
                  value={valueRange}
                  {...register("progress")}
                  onChange={(e) => setValueRange(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">Update</button>
            </form>
             }
          </div>
          <div className="d-flex justify-content-end">
            <span className="detail_btn" onClick={() => {setDetail(!detail);setEditDisplay(false)}}>{detail?"Ẩn chi tiết":"Chi tiết"}</span>
            <span className="px-4 text-dark" onClick={() => setEditDisplay(true)}><AiFillEdit/></span>
            <span className="text-danger mx-2" onClick={() => setShowDelete(true)}><AiFillDelete/></span>
          </div>
          <Modal show={showDelete} onHide={() => setShowDelete(false)}>
            <Modal.Header closeButton >
              <Modal.Title className="text-center">Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">Are you sure you want to delete?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                handleDelete(task.id as number);
                setShowDelete(false);
                }}
              >
              Delete
              </Button>
              <Button variant="secondary" onClick={() => setShowDelete(false)}>
              close
              </Button>
            </Modal.Footer>
          </Modal>
      </div>
      )}

    </Draggable>
  )
}

export default TaskItem