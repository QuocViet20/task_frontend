import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

//types
import { Task } from "../../../types";
import React from "react";

interface ListTaskKanbanProps {
  col: {id:string,
   columnTasks: Task[];}
 
}

const ListTaskKanban = ({
  col:{id, columnTasks},
  }:ListTaskKanbanProps ) => {

  return (
   
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={`col-4`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
              <div className={`${id=== "Todo" ?"todos":id === "Doing"?"doing":"done" } ${snapshot.isDraggingOver ? id === "Todo" ?"dragTodo":id === "Doing"?"dragDoing":"DrangDone" : ""}`}>
              <h4 className="text-center">{id}</h4>
              {columnTasks.map((task, index) => (
                <TaskItem
                task={task}
                index={index}
                key={task.id}
                />
              ))}
            </div>
          </div>
        )}
      </Droppable>


  )

}

export default ListTaskKanban