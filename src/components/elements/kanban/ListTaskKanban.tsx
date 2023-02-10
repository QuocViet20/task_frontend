import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

//types
import { Task } from "../../../types";
import React from "react";
import { take } from "lodash";

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
    <div className="row px-5">
      <Droppable droppableId="Todo">
        {(provided, snapshot) => (
          <div
            className={` col-4 ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
              <div className="px-2 bg-success">
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
            className={`todos col-4 ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="px-2 bg-primary">
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
            className={`todos col-4 bg-danger${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="text-center">Done</span>
            {listTaskDone.map((task, index) => (
                <TaskItem
                task={task}
                index={index}
                key={task.id}
                />
              ))}
          </div>
        )}
      </Droppable>
    </div>
  )

}

export default ListTaskKanban