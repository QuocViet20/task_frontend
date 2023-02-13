import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

//types
import { Task } from "../../../types";
import React from "react";

interface ListTaskKanbanProps {
  listTaskTodo: Task[];
  listTaskDoing: Task[];
  listTaskDone: Task[];
}

const ListTaskKanban = ({
  listTaskTodo,
  listTaskDoing,
  listTaskDone
  }:ListTaskKanbanProps ) => {

  return (
    <div className="row gx-4">
      <Droppable droppableId="Todo">
        {(provided, snapshot) => (
          <div
            className={`col-4`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
              <div className={`todos ${snapshot.isDraggingOver ? "dragTodo" : ""}`}>
              <h4 className="text-center">Todo</h4>
              {listTaskTodo.map((task, index) => (
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
      <Droppable droppableId="Doing">
        {(provided, snapshot) => (
          <div
            className="col-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className={`doing ${snapshot.isDraggingOver ? "dragDoing" : ""}`}>
              <h4 className="text-center">Doing</h4>
              {listTaskDoing && listTaskDoing.map((task, index) => (
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
      <Droppable droppableId="Done">
        {(provided, snapshot) => (
          <div
            className="col-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className={`done ${snapshot.isDraggingOver ? "dragDone" : ""}`}>
              <h4 className="text-center">Done</h4>
              {listTaskDone.map((task, index) => (
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
    </div>
  )

}

export default ListTaskKanban