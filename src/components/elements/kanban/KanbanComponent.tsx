import React,{ useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { Task, Status } from "../../../types";
import ListTaskKanban from "./ListTaskKanban";
//hooks
import useAuth from "../../../hooks/useAuth";

export interface KanbanProps{
  tasks: Task[]
}

const KanbanComponent = ({ tasks }: KanbanProps) => {
  const { authData } = useAuth();
  const initialListTaskTodo = tasks.filter((item: Task) => item.status === "Todo" && Number(item.assignee) != authData.userId)
  const initialListTaskDoing = tasks.filter((item: Task) => item.status === "Doing" && Number(item.assignee) != authData.userId)
  const initialListTaskDone = tasks.filter((item: Task) => item.status === "Done" && Number(item.assignee) != authData.userId)

  const [listTaskTodo, setListTaskTodo] = useState<Task[]>(initialListTaskTodo)
  const [listTaskDoing, setListTaskDoing] = useState<Task[]>(initialListTaskDoing)
  const [listTaskDone, setListTaskDone] = useState<Task[]>(initialListTaskDone)

  const onDragEnd = (result: DropResult) => {
    const { destination, source} = result;
    if (destination === undefined || destination === null) return ;
    
    if(source.droppableId === "Todo" && destination.droppableId === "Todo"){
      const newList = listTaskTodo.filter((item:Task,index:number) => index !== source.index);
      newList.splice(destination.index, 0, listTaskTodo[source.index])
     
      setListTaskTodo(newList)
    }
    else if(source.droppableId === "Doing" && destination.droppableId === "Doing"){
      const newList = listTaskDoing.filter((item:Task,index:number) => index !== source.index);
      newList.splice(destination.index, 0, listTaskDoing[source.index])
      setListTaskDoing(newList)
    }
    else if(source.droppableId === "Done" && destination.droppableId === "Done"){
      const newList = listTaskDone.filter((item:Task,index:number) => index !== source.index);
      newList.splice(destination.index, 0, listTaskDone[source.index])
      setListTaskDone(newList)
    }

    else if(source.droppableId === "Todo" && destination.droppableId === "Doing"){      
      const newListTaskTodo = listTaskTodo.filter((item: Task, index: number) => index !== source.index)
      listTaskDoing.splice(destination.index,0,listTaskTodo[source.index])
      setListTaskTodo(newListTaskTodo);
      return null;
    }
    else if(source.droppableId === "Todo" && destination.droppableId === "Done"){
      const newListTaskTodo = listTaskTodo.filter((item: Task, index: number) => index !== source.index)
      listTaskDone.splice(destination.index, 0, listTaskTodo[source.index])
      setListTaskTodo(newListTaskTodo);
      return null;
    }
    else if(source.droppableId === "Doing" && destination.droppableId === "Done"){
      const newListTaskDoing = listTaskDoing.filter((item: Task, index: number) => index !== source.index)
      listTaskDone.splice(destination.index, 0, listTaskDoing[source.index])
      setListTaskDoing(newListTaskDoing);
      return null;
    }
    else if(source.droppableId === "Doing" && destination.droppableId === "Todo"){
      const newListTaskDoing = listTaskDoing.filter((item: Task, index: number) => index !== source.index)
      listTaskTodo.splice(destination.index, 0, listTaskDoing[source.index])
      setListTaskDoing(newListTaskDoing);
      return null;
    }
    else if(source.droppableId === "Done" && destination.droppableId === "Todo"){
      const newListTaskDone = listTaskDone.filter((item: Task, index: number) => index !== source.index)
      listTaskTodo.splice(destination.index, 0, listTaskDone[source.index])
      setListTaskDone(newListTaskDone);
      return null;
    }
    else if(source.droppableId === "Done" && destination.droppableId === "Doing"){
      const newListTaskDone = listTaskDone.filter((item: Task, index: number) => index !== source.index)
      listTaskDoing.splice(destination.index, 0, listTaskDone[source.index])
      setListTaskDone(newListTaskDone);
      return null;
    }
  
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
          <ListTaskKanban
            listTaskTodo={listTaskTodo}
            listTaskDoing={listTaskDoing}
            listTaskDone={listTaskDone}
          />
        </div>
    </DragDropContext>
  )
}
export default KanbanComponent