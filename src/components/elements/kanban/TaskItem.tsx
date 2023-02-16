import React, { useState, useMemo} from "react";
import { Draggable } from "react-beautiful-dnd";
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import { BiDetail } from "react-icons/bi"
import moment from "moment";
import { useQuery, useMutation } from "@tanstack/react-query";
import _ from "lodash"
import { toast } from "react-toastify";
import { Modal, Button,Form } from "react-bootstrap";
import { useForm } from "react-hook-form"

//style
import "./TaskItem.scss";

//components
import Loading from "../loading/Loading";
import { Rating } from "../rating/Rating";
import LikeComponents from "./LikeComponents";

//api 
import { getAssignee, updateTask } from "../../../api/serviceApi";

//types
import { User, Option, NewTask, Task, Comment } from "../../../types";

import useAuth from "../../../hooks/useAuth";

interface TaskItemProps {
  task: Task;
  index: number;
  handleDelete: (id: number) =>void
}

interface UpdateTask {
  assignee:string;
  startTime: string;
  endTime: string;
  progress: string;
  title: string;
}

interface LikeIcon {
  id:string;
  icon: JSX.Element
}

const TaskItem = ({
  task, index, handleDelete
}: TaskItemProps) => {
  const [ detail, setDetail ] = useState(false);
  const [showDelete, setShowDelete ] = useState(false)
  const [valueRange, setValueRange] = useState<string>(task.progress);
  const [editDisplay, setEditDisplay] = useState(false);
  const [modelDetailTask, setModelDetailTask ] = useState(false);
  const [editTask, setEditTask ] = useState(false);
  const [comment, setComment ] = useState('');
  const [comments, setComments ] = useState(task.comments)
  const { authData } = useAuth();
  const [commentDisplay, setCommentDisplay ] = useState(false)
  const [taskItem, setTaskItem ] = useState(task)
  const [rating, setRating ] = useState(0);
  const [likeItem, setlikeItem ] = useState<LikeIcon>({id:'',icon:<></>})
  const [likeMode, setLikeMode ] = useState(false)
  const {
    register,
    formState: { errors },
  } = useForm<UpdateTask>({
    defaultValues:{
      assignee: taskItem.assignee,
      startTime: taskItem.startTime,
      endTime: taskItem.endTime,
      progress:taskItem.progress,
      title: taskItem.title,
    }
  });

  const { data: assigneeResponse, isLoading: isAssigneeLoading, } = useQuery({
    queryKey: ["assigneeTask"],
    queryFn: () => getAssignee(),
  })

  const editTaskMutation = useMutation({
    mutationFn: (body: NewTask) => {
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

  const assigneOptions = useMemo(() => {
    if (_.isNil(assigneeResponse)) {
      return [];
    }
    return assigneeResponse.data.map((assignee: User) => ({
      label: assignee.username,
      value: assignee.id,
    }))
  }, [assigneeResponse])

  const addComment = ( ) => {
    if(comment === ""){
      toast.error("Please fill in the comments",{
        position: toast.POSITION.TOP_RIGHT,
      })
    } else {
      const newComment:Comment = {
        userId: authData.userId,
        comment: comment
      }
      const newComments=[...comments,newComment];
      editTaskMutation.mutate({...task,comments:newComments})
      setComments(newComments);
      setComment("")
    }
  }

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }
  
  const handleSelectLike = (item:LikeIcon) => {
    setLikeMode(false)
    setlikeItem(item);
  }

  if(isAssigneeLoading){
    return <Loading />
  }


  return(
    <Draggable key={taskItem.id} draggableId={String(taskItem.id)} index={index}>
      {(provided, snapshot) => (
        <div 
        className={`mt-2 taskItem ${snapshot.isDragging ? "dragTodo" : ""}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
          <div className="mx-2">
            <div className="d-flex">
            <p className="text-center text-dark pb-1 mt-1 col-11">{taskItem.title}</p>
            <span className="col detailIcon" onClick={() => {setModelDetailTask(true); setCommentDisplay(false)} }><BiDetail/></span>
            </div>
            { detail && !editDisplay && 
            <div>
              <p> Assignee: { assigneOptions.length > 0 ? assigneOptions?.find((item: Option) => Number(taskItem.assignee) === item.value)?.label: ""}
              </p>
              <p>Start time: {moment(taskItem.startTime).format('DD/MM /YYYY HH:mm A')} </p>
              <p>End time: {moment(taskItem.endTime).format('DD/MM /YYYY HH:mm A')}</p>
              <p>Progress: {taskItem.progress}%</p>
              <input className="w-100" type="range" value={task.progress} />
            </div>
            }
            {
            editDisplay &&
              <div>
                <div className="d-inline-flex align-items-center mb-3" >
                  <span> Assignee: </span>
                  <Form.Select  className="mx-3"
                  {...register("assignee")}
                  onChange={(e) => {
                    editTaskMutation.mutate({...task, assignee:e.target.value});
                    setTaskItem({...taskItem, assignee:e.target.value})
                  }}
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
                  onChange={(e) => {
                    editTaskMutation.mutate({...task, startTime:e.target.value});
                    setTaskItem({...taskItem, startTime:e.target.value})
                  }}
                  />
                </div>
                  
                <div className="d-inline-flex align-items-center w-100 mb-3">
                  <span className="col-3"> End time:</span>
                  <Form.Control 
                  type="datetime-local"
                  {...register("endTime")}
                  onChange={(e) => {
                    editTaskMutation.mutate({...task, endTime:e.target.value});
                    setTaskItem({...taskItem, endTime:e.target.value})
                  }}
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
                    onChange={(e) => {
                      setValueRange(e.target.value);
                      setTaskItem({...taskItem, progress: e.target.value})
                      editTaskMutation.mutate({...task,progress:e.target.value});
                    }}
                  />
              </div>
             }
          </div>
          <div className="d-flex ">
             <div className="rating">
              <Rating 
                activeColor="#ffd700"
                count={5}
                size={20}
                onChange={handleRatingChange}
              />
            </div>
            <div>
              {likeMode && <LikeComponents handleSelectLike = {handleSelectLike}/>}
             {likeItem.id !=='' ? <span onClick={()=> setlikeItem({id:'',icon:<></>})}>{likeItem.icon}</span> :<span className=" btn_comment" onMouseOver={() => setLikeMode(true)} >Like</span>}
              <span className="px-2 btn_comment" onClick={() => setCommentDisplay(!commentDisplay)}>Comment</span>
             <span className="px-1 btn_detail" onClick={() => {setDetail(!detail);setEditDisplay(false)}}>{detail?"Hide show":"Show"}</span>
              <span className="px-2 text-dark btn_edit" onClick={() => setEditDisplay(!editDisplay)}><AiFillEdit/></span>
              <span className="text-danger mx-2 btn_delete" onClick={() => setShowDelete(true)}><AiFillDelete/></span>
            </div>
          </div>
          {commentDisplay && 
            <div>
              <div className="border -1 mt-2"></div>
              <h4 className="mt-1 comment_title">Comments</h4>
              <div className="d-flex mb-3">
                <input 
                  className="input_comment mx-1" 
                  type="text" 
                  value={comment}
                  name="comment" 
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className="btn btn-primary btn-sm" onClick={addComment}>Comment</button>
              </div>
              {comments.length > 0 && comments.map((comment: Comment) => (
                <div key={comment.userId} className="mx-2">
                  <h6 className="text-primary ">{ assigneOptions.length > 0 && comment.userId !==authData.userId ? assigneOptions?.find((item: Option) => Number(comment.userId) === item.value)?.label: authData.username}</h6>
                  <p className="comment_text">{comment.comment}</p>
                </div>
              ))}
            </div>
          }
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
          <Modal className="model" show={modelDetailTask} onHide={() => setModelDetailTask(false)}>
            <div className="model_container " >
              <div>
                <div className="d-flex w-100">
                  <h2 className="text-center text-info my-3 text-uppercase col-11">Detail Task</h2>
                  <div className="col-1 my-3 close_modal" onClick={() => setModelDetailTask(false)}>X</div>
                </div>
                <div className="border -1 mb-2"></div>
              </div>
            </div>
            <Modal.Body className="">
                <div>
                  {!editTask && 
                    <div className="mx-4 ">
                      <h2 className="text-danger text-center mb-3">Infomation Task</h2>
                      <div className="d-flex">
                        <p className="text-dark">Title: </p>
                        <p className="text-success mx-2">{taskItem.title}</p>
                      </div>
                      <div className="d-flex">
                        <p className="text-dark">Assignee: </p>
                        <p className="text-success mx-2">{ assigneOptions.length > 0 ? assigneOptions?.find((item: Option) => Number(taskItem.assignee) === item.value)?.label: ""}</p>
                      </div>
                      <div className="d-flex">
                        <p className="text-dark">Start time: : </p>
                        <p className="text-success mx-2">{moment(taskItem.startTime).format('DD/MM /YYYY HH:mm A')}</p>
                      </div>
                      <div className="d-flex">
                        <p className="text-dark">End time: </p>
                        <p className="text-success mx-2">{moment(taskItem.endTime).format('DD/MM /YYYY HH:mm A')}</p>
                      </div>
                      <div className="d-flex">
                        <p className="text-dark">Progress: </p>
                        <p className="text-success mx-2">{taskItem.progress}%</p>
                      </div>
                    </div>
                  }
                  {editTask && 
                    <div className="mx-4">
                      <h2 className="text-danger text-center mb-4">Edit Task</h2>
                      <div className="d-inline-flex align-items-center w-100 mb-3">
                        <span className="col-3"> Title: </span>
                        <Form.Control  
                        type="text"
                        {...register("title")}
                        onChange={(e) => {
                          editTaskMutation.mutate({...task,title:e.target.value});
                          setTaskItem({...taskItem, title: e.target.value});
                        }}
                        />
                      </div>
                      <div className="d-inline-flex align-items-center w-100 mb-3" >
                        <span> Assignee: </span>
                        <div className="selectOption">
                          <Form.Select  className="inputAssignee"
                          {...register("assignee")}
                          onChange={(e) => {
                            editTaskMutation.mutate({...task,assignee:e.target.value});
                            setTaskItem({...taskItem, assignee: e.target.value});
                          }}
                          >
                            {assigneOptions.map((assignee:Option) => (
                              <option value={assignee.value}>{assignee.label}</option>
                            ))}
                          </Form.Select>
                        </div>
                      </div>
                      <div className="d-inline-flex align-items-center w-100 mb-3">
                        <span className="col-3"> Start time:</span>
                        <Form.Control  
                        type="datetime-local" 
                        {...register("startTime")}
                        onChange={(e) => {
                          editTaskMutation.mutate({...task,startTime:e.target.value});
                          setTaskItem({...taskItem, startTime: e.target.value});
                        }}
                        />
                      </div>  
                      <div className="d-inline-flex align-items-center w-100 mb-3">
                        <span className="col-3"> End time:</span>
                        <Form.Control 
                        type="datetime-local"
                        {...register("endTime")}
                        onChange={(e) => {
                          editTaskMutation.mutate({...task,endTime:e.target.value});
                          setTaskItem({...taskItem, endTime: e.target.value});
                        }}
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
                          onChange={(e) => {
                            setValueRange(e.target.value);
                            setTaskItem({...taskItem, progress: e.target.value});
                            editTaskMutation.mutate({...task,progress:e.target.value});
                        }}
                      />
                    </div>
                  }
                </div>
            
              <div className="d-flex">
                {editTask ? 
                  <button className="btn btn-success mx-4" onClick={() => setEditTask(!editTask)}>Info</button>:
                  <button className="btn btn-warning mx-4" onClick={() => setEditTask(!editTask)}>Edit</button>
                }               
              </div>

              <div className="border -1 mt-3"></div>
              <h2 className="px-2 comment_title_modal mt-2">Comments</h2>
              <div className="d-flex mb-2">
                <input 
                  className="w-75 mx-3 input_comment_modal" 
                  type="text" 
                  value={comment}
                  name="comment" 
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className=" btn btn-primary" onClick={addComment}>Comment</button>                
              </div>
                 {comments.length > 0 && comments.map((comment: Comment) => (
              <div key={comment.userId} className="mx-3">
                <h6 className="text-primary ">{ assigneOptions.length > 0 && comment.userId !==authData.userId ? assigneOptions?.find((item: Option) => Number(comment.userId) === item.value)?.label: authData.username}</h6>
                <p className="comment_text">{comment.comment}</p>
              </div>
            ))}
            </Modal.Body>

          </Modal>
      </div>
      )}

    
    </Draggable>
  )
}

export default TaskItem