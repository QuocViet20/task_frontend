
import { useMutation, useQuery } from "@tanstack/react-query"
import { memo, useMemo, useState } from "react"
import { useNavigate, useParams, Link, useSearchParams } from "react-router-dom";
import _ from "lodash"
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

//components
import Loading from "../../components/elements/loading/Loading";
import PaginationComponent from "../../components/elements/panigation/Pagination";

//types
import { RECORDS_PER_PAGE, STATUS_DATA } from "../../consts";

//api
import { getTaskAssignee, deleteTask } from "../../api/serviceApi";

// hooks
import useDebounce from "../../hooks/useSearch";
import TaskListComponent from "../../components/elements/taskListComponent/TaskListComponent";
import useAuth from "../../hooks/useAuth";


const MyTaskPage = memo(() => {
  const { authData } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(STATUS_DATA[0].value)
  const debouncedSearchHook = useDebounce(searchValue, 1000);

  const currentPage = Number(searchParams.get("page")) || 1;

  const queryParams = selectedStatus
    ? {
      currentPage,
      limit: RECORDS_PER_PAGE,
      debouncedSearchHook,
      selectedStatus,
      assignee: userId as string
    }
    : {
      currentPage,
      limit: RECORDS_PER_PAGE,
      debouncedSearchHook,
      assignee: userId as string
    }

  const { data, isLoading, refetch, isError }: any = useQuery({
    queryKey: [
      "tasks",
      queryParams.currentPage,
      queryParams.debouncedSearchHook,
      queryParams.selectedStatus,
      queryParams.assignee
    ],
    queryFn: () => getTaskAssignee(queryParams)
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
    navigate(`/users/${userId}/myTasks?assignee=${userId}&page=${pageNumber}`)
  }

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return (
      <div className="container text-center mt-4">
        <h2 className="text-danger">Not found task</h2>
      </div>
    )
  }
  return (
    <div className="container mt-4">
      <div className="mt-4">
        <h2 className="text-center text-danger"> My tasks list</h2>
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {STATUS_DATA.map((option) => (
                <option
                  value={option.value}>{option.text}</option>
              ))}
            </Form.Select>
          </div>
          {authData.role === "Admin" &&        
          <Link to={'/tasks/create_task_Admin'} className="mx-4">
            <Button className="btn btn-primary">Add task</Button>
          </Link>
          }
        </div>
      </div>
      <TaskListComponent
      assigneeOptions={[]}
        tasks={data.data}
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
})

export default MyTaskPage