import React, { useState } from "react";
import { DragDropContext, DropResult }  from "react-beautiful-dnd";
import { useQuery } from "@tanstack/react-query";

//types
import { Task } from "../../types";

//api
import { getAllTask } from "../../api/serviceApi";

//hooks
import useAuth from "../../hooks/useAuth";

//components
import Loading from "../../components/elements/loading/Loading";
import KanbanComponent from "../../components/elements/kanban/KanbanComponent";


function Kanban(){
  const { data, isLoading, refetch }: any = useQuery({
    queryKey: ["allTasks"],
    queryFn: () => getAllTask(),
  })

  if(isLoading){
    return <Loading/>
  }

  return (
    <div className="container">
      <h1>Hello kanban</h1>
      <KanbanComponent tasks={data.data}/>
    </div>
  )

}
export default Kanban