import React from "react";
import { Task } from "../../../types";
import { Draggable } from "react-beautiful-dnd";

interface TaskItemProps {
  task: Task;
  index: number
}

const TaskItem = ({
  task, index
}: TaskItemProps) => {

  return(
    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div 
        className={`card mt-2 bg-light ${snapshot.isDragging ? "drag" : ""}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
            <p>{task.title}</p>
            <p>{task.assignee}</p>
            <p>{task.startTime}</p>
            <p>{task.endTime}</p>
            <p>{task.progress}</p>
            <p>{task.status}</p>
      </div>
      )}
    </Draggable>
  )
}

export default TaskItem