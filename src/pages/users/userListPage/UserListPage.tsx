// library
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash"
import { memo, useMemo, useState } from "react"
import {
  Button,
  Form,
  Modal,
  Table
} from "react-bootstrap"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";

//components
import Loading from "../../../components/elements/loading/Loading";
import PaginationComponent from "../../../components/elements/panigation/Pagination";

// types
import { User } from "../../../types";
import { RECORDS_PER_PAGE } from "./consts";

// api
import { deleteUser, getUsers } from "../../../api/serviceApi";

//hooks
import useDebounce from "../../../hooks/useSearch";

// styles
import './UserListPage.css'


const UserListPage = memo(() => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const searchText = useDebounce(searchValue, 1000);

  const currentPage = Number(searchParams.get("page")) || 1;

  const queryParams = {
    currentPage,
    limit: RECORDS_PER_PAGE,
    searchText,
  }

  const { data, isLoading, refetch }: any = useQuery({
    queryKey: [
      "users",
      queryParams.currentPage,
      queryParams.searchText
    ],
    queryFn: () => getUsers(queryParams)
  })

  const totalPages = useMemo(() => {
    if (_.isNil(data) || _.isNil(data?.headers["x-total-count"])) {
      return 0
    }
    return Math.ceil(
      parseInt(data.headers["x-total-count"]) / RECORDS_PER_PAGE
    )
  }, [data])

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      toast.success('Delete Success', {
        position: toast.POSITION.TOP_RIGHT
      });
      refetch();
    }
  })
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  }

  const onPageChange = (pageNumber: number) => {
    navigate(`/users?page=${pageNumber}`)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container">
      <div className="mt-4">
        <div className=" d-flex ">
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
          <Link to={'/users/create'} className="mx-4">
            <Button className="btn btn-primary">Create User</Button>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-center text-danger">Users list</h2>
        {
          data?.data.length > 0 ? (
            <Table striped bordered hover variant="light" className="mt-4">
              <thead>
                <tr className="text-center">
                  <th>NO</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Detail</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((user: User, index: number) => (
                  <tr key={user.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td><Link to={`/users/${user.id}`}><Button className="btn btn-success">Detail</Button></Link></td>
                    <td><Link to={`/users/${user.id}/edit`}><Button className="btn btn-warning">Edit</Button></Link></td>
                    <td><Button className="btn btn-danger" onClick={() => setShow(true)}>Delete</Button></td>
                    <Modal show={show} onHide={() => setShow(false)}>
                      <Modal.Header closeButton >
                        <Modal.Title className="text-center">Delete user</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="text-center">Are you sure you want to delete?</Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={() => {
                            handleDelete(user.id as number);
                            setShow(false);
                          }}
                        >
                          Delete
                        </Button>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                          close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </tr>

                ))
                }
              </tbody>


            </Table>
          ) : (
            <h2 className="mt-4 text-center text-warning"> No users</h2>
          )
        }

      </div>
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

export default UserListPage