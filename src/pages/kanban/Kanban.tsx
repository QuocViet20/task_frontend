import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//api
import { getAllTask } from "../../api/serviceApi";

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