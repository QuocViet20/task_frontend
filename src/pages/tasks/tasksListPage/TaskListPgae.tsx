// library
import { useState, useMemo } from "react"
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash"
import {
  Button,
  Form
} from "react-bootstrap"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

//components
import Loading from "../../../components/elements/loading/Loading";
import PaginationComponent from "../../../components/elements/panigation/Pagination";

//type
import { Task, User } from "../../../types";

//consts
import { RECORDS_PER_PAGE, STATUS_DATA, MAX_LENGTH } from "./consts";

// api
import { deleteTask, getTasks, getAssignee, getTaskAdmin } from "../../../api/serviceApi";

//hooks
import useDebounce from "../../../hooks/useSearch";
import useAuth from "../../../hooks/useAuth";

//components
import TaskListComponent from "../../../components/elements/taskListComponent/TaskListComponent";

const TaskListPage = () => {
  const { authData } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState(STATUS_DATA[0].value)
  const searchText = useDebounce(searchValue, 500);

  const currentPage = Number(searchParams.get("page")) || 1;

  const queryParams = status
    ? {
      currentPage,
      limit: RECORDS_PER_PAGE,
      searchText,
      status: status
    }
    : {
      currentPage,
      limit: RECORDS_PER_PAGE,
      searchText,
    }

  const { data, isLoading, refetch }: any = useQuery({
    queryKey: [
      "tasks",
      queryParams.currentPage,
      queryParams.searchText,
      queryParams.status
    ],
    queryFn: () => getTasks(queryParams)
  })

  const totalCount = useMemo(() => {
    if (_.isNil(data) || _.isNil(data.headers["x-total-count"])) {
      return 0
    };
    return  parseInt(data.headers["x-total-count"])
     
  }, [data])

  

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      toast.success("Delete task success", {
        position: toast.POSITION.TOP_RIGHT
      });
      refetch();
    }
  })
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  const onPageChange = (pageNumber: number) => {
    navigate(`/tasks?page=${pageNumber}`)
  }

  const { data: assigneeResponse, isLoading: isAssigneeLoading, } = useQuery({
    queryKey: ["assigneeTask"],
    queryFn: () => getAssignee(),
  })

  const assigneOptions = useMemo(() => {
    if (_.isNil(assigneeResponse)) {
      return [];
    }
    return assigneeResponse.data.map((assignee: User) => ({
      label: assignee.username,
      value: assignee.id,
    }))
  }, [assigneeResponse])

  const { data: tasksAdmin, isLoading: isGetTasksAdmin, } = useQuery({
    queryKey: ["getTasksAdmin"],
    queryFn: () => getTaskAdmin(authData.userId as string ),
    enabled: !_.isNil(authData.userId)
  })
  if (isGetTasksAdmin) {
    return <Loading />
  }
  const getTasksAdmin = tasksAdmin?.data;
  const totalPages = totalCount > 0 ? Math.ceil((totalCount-getTasksAdmin.length)/RECORDS_PER_PAGE) : 0
console.log("totalCount"+totalCount)
  console.log("currentPage:"+currentPage)
  console.log("totalPage:" + totalPages)
  if (isLoading) {
    return <Loading />
  }

  if (isAssigneeLoading) {
    return <Loading />
  }


  const userListTasks: Task[] = data.data.filter((task: Task) => task.assignee !== authData.userId)

  // if(userListTasks.length === 0 && totalCount > 0) {
  //   navigate(`/tasks?page=1`)
  // }

  // if(!userListTasks){
  //   navigate(`/tasks?page=0`)
  // }

  return (
    <div className="container">
      <div className="mt-4">
        <div className="mt-4 d-flex justify-content-space-between w-100">
          <div className=" d-flex w-100">
            <div className="d-flex border align-items-center w-25 rounded" >
              <Form.Control className="border-0 position-relative "
                value={searchValue}
                placeholder="Search"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              {searchValue &&
                <h5 className="position-absolute search_close" onClick={() => setSearchValue("")}> x</h5>
              }
            </div>
            <div className="mx-2">
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_DATA.map((option) => (
                  <option
                    value={option.value}>{option.text}</option>
                ))}
              </Form.Select>
            </div>
            <Button className="btn btn-info" onClick={() => setSearchValue(searchValue)}>Search</Button>
          </div>
          <div>
            <Link to={'/tasks/create'} className="mx-5">
              <Button className="btn btn-primary">Add task</Button>
            </Link>
          </div>
        </div>
        <div>
        </div>
      </div>
      <h2 className="text-center text-danger">Tasks list</h2>
      <TaskListComponent
        assigneeOptions={assigneOptions}
        tasks={userListTasks}
        handleDeleteTask={handleDelete}
      />
      <div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          maxLength={MAX_LENGTH}
          onPageChange={onPageChange}
        />
      </div>

    </div>
  )
}

export default TaskListPage