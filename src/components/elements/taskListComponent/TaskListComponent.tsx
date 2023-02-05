import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  Table
} from "react-bootstrap";
import moment from "moment";
import { Task, TaskListComponentProps } from "../../../types";

// hooks
import useAuth from "../../../hooks/useAuth";

const TaskListComponent = ({
  tasks, handleDeleteTask
}: TaskListComponentProps) => {
  const [show, setShow] = useState(false);
  const { authData } = useAuth()

  return (
    <div className="mt-4">
      {
        tasks.length > 0 ? (
          <Table striped bordered hover variant="light" className="mt-4">
            <thead>
              <tr className="text-center">
                <th>NO</th>
                <th>Title</th>
                <th>Assignee</th>
                <th>Start time</th>
                <th>End time</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Edit</th>
                {authData.role === "Admin" && <th>Delete</th>}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: Task, index: number) => (
                <tr key={task.id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.assignee}</td>
                  <td>{moment(task.startTime).format('DD/MM /YYYY HH:mm A')}</td>
                  <td>{moment(task.endTime).format('DD/MM /YYYY HH:mm A')}</td>
                  <td className="text-danger" >{task.progress}%</td>
                  <td className="text-success">{task.status}</td>
                  <td><Link to={`/tasks/${task.id}/edit`}><Button className="btn btn-warning">Edit</Button></Link></td>
                  {authData.role === "Admin" &&
                    <td><Button
                      className="btn btn-danger"
                      onClick={() => setShow(true)
                      }>
                      Delete
                    </Button></td>}

                  <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton >
                      <Modal.Title className="text-center">Delete user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">Are you sure you want to delete?</Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={() => {
                          handleDeleteTask(task.id as number);
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
          <h2 className="mt-4 text-center text-warning"> No Tasks</h2>
        )
      }

    </div>
  )
}

export default TaskListComponent