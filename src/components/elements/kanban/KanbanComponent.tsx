import React,{ useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import ListTaskKanban from "./ListTaskKanban";
import { toast } from "react-toastify"
//hooks
import useAuth from "../../../hooks/useAuth";

//styles
import './KanbanComponents.scss'

//types
import { Task, Status, ITaskFormData } from "../../../types";

//api
import { apiClient } from "../../../api/serviceApi";

export interface KanbanProps{
  tasks: Task[]
}

export interface IColumn {
  id:string;
  columnTasks: Task[];
}

export interface IColumns {
  [key: string]: IColumn;
}



const KanbanComponent = ({ tasks }: KanbanProps) => {
  const { authData } = useAuth();
  const initialListTaskTodo = tasks.filter((item: Task) => item.status === "Todo" && Number(item.assignee) != authData.userId)
  const initialListTaskDoing = tasks.filter((item: Task) => item.status === "Doing" && Number(item.assignee) != authData.userId)
  const initialListTaskDone = tasks.filter((item: Task) => item.status === "Done" && Number(item.assignee) != authData.userId)

  const initialColumns:IColumns = {
    Todo: {
      id:"Todo",
      columnTasks:initialListTaskTodo
    },
    Doing: {
      id:"Doing",
      columnTasks:initialListTaskDoing
    },
    Done: {
      id:"Done",
      columnTasks:initialListTaskDone
    },
  }
  const [columns, setColumns ] = useState<IColumns>(initialColumns)
  const [listTaskTodo, setListTaskTodo] = useState<Task[]>(initialListTaskTodo)
  const [listTaskDoing, setListTaskDoing] = useState<Task[]>(initialListTaskDoing)
  const [listTaskDone, setListTaskDone] = useState<Task[]>(initialListTaskDone)

  const onDragEnd = async (result: DropResult) => {
    const { destination, source} = result;
    if (destination === undefined || destination === null) return null

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null

    // Set start and end variables
    const start = columns[source.droppableId]
    const end = columns[destination.droppableId];
    if(start === end){
      const newListTask = start.columnTasks.filter((task: Task, index: number) => index !==source.index);
      newListTask.splice(destination.index, 0, start.columnTasks[source.index]);

      const newCol = {
        id: start.id,
        columnTasks: newListTask,
      }
      setColumns({...columns, [newCol.id]:newCol});
      return null;
    } else {
      const newStartList = start.columnTasks.filter((task: Task, index: number) => index !== source.index);
      const newStartCol = {
        id: start.id,
        columnTasks: newStartList,
      }
      const getOutTask= start.columnTasks.filter((task: Task, index: number) => index === source.index)[0];
      const updateTask: ITaskFormData ={
        ...getOutTask,
        status: end.id === "Todo" ? Status.Todo : end.id === "Doing" ? Status.Doing : Status.Done, 
        progress:end.id === "Todo" ? "0" : end.id === "Doing" ? "10": "100"
      }
      try {
        await apiClient.put<ITaskFormData>(`/tasks/${getOutTask.id}`, updateTask);
      } catch (error) {
        toast.error(`${error}`,{
          position: toast.POSITION.TOP_RIGHT
        })
      }
      const newEndList = end.columnTasks;
      newEndList.splice(destination.index,0,start.columnTasks[source.index])
      const newEndCol = {
        id: end.id,
        columnTasks:newEndList,
      };
      setColumns({...columns, [newStartCol.id]:newStartCol, [newEndCol.id]: newEndCol});
      window.location.reload();
      return null;
    }
  
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <div className="row gx-4">
        {Object.values(columns).map((col:IColumn) => (
          <ListTaskKanban
          col={col} key={col.id}
          />
          ))}
          </div>
          </div>
    </DragDropContext>
  )
}
export default KanbanComponent