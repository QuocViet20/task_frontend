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
import { RECORDS_PER_PAGE, STATUS_DATA } from "./consts";

// api
import { deleteTask, getTasks, getAssignee } from "../../../api/serviceApi";

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
  const searchText = useDebounce(searchValue, 1000);

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

  const totalPages = useMemo(() => {
    if (_.isNil(data) || _.isNil(data.headers["x-total-count"])) {
      return 0
    };
    return Math.ceil(
      parseInt(data.headers["x-total-count"]) / RECORDS_PER_PAGE
    )
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

  if (isLoading) {
    return <Loading />
  }

  if (isAssigneeLoading) {
    return <Loading />
  }

  const userListTasks: Task[] = data.data.filter((task: Task) => task.assignee !== authData.userId)
  return (
    <div className="container">
      <div className="mt-4">
        <div className=" d-flex">
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
          <Link to={'/tasks/create'} className="mx-4">
            <Button className="btn btn-primary">Add task</Button>
          </Link>
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
          onPageChange={onPageChange}
        />
      </div>

    </div>
  )
}

export default TaskListPage