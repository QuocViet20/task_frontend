import { Card, Form, Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom"

//types
import { EditUserForm, UserCreate, Role, UserEditFormProps } from "../../../types";

const EditUserFormComponent = ({
  defaultValues,
  submitButtonLabel,
  submittingButtonLabel,
  isSubmitting,
  onSubmit,
}: UserEditFormProps
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserForm>({ defaultValues });


  return (
    <div className="container d-flex justify-content-center marginTop">
      <Card className="card_container">
        <h3 className="text-center text-success font-italic">Edit user infomation</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mt-2">
            <Form.Label
              className="font-weight-bold mx-1 label_text">
              Email
            </Form.Label>
            <Form.Control
              id="exampleEmail"
              placeholder="Email"
              type="text"
              {...register("email", {
                required: true,
                pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
              })}
            />
            {errors.email?.type === "required" && (
              <span className="mt-1 text-danger">
                Hãy nhập email của bạn
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="mt-1 text-danger">Đây phải là Email</span>
            )}
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label
              className="font-weight-bold mx-1 label_text">
              Username
            </Form.Label>
            <Form.Control
              placeholder="Username"
              type="text"
              {...register("username", {
                required: true,
                maxLength: 16,
              })}
            />
            {errors.username?.type === "required" && (
              <span className="mt-1 text-danger">
                Hãy nhập username của bạn
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="mt-1 text-danger">Đây phải là Email</span>
            )}
            {errors.username?.type === "maxLength" && (
              <span className="mt-1 text-danger">
                Tên tài khoản tối đa 16 ký tự
              </span>
            )}
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label
              className="font-weight-bold mx-1 label_text">
              Role
            </Form.Label>
            <Form.Select
              {...register("role", {

              })}
            >
              <option value={Role.User}>{Role.User}</option>
              <option value={Role.Admin}>{Role.Admin}</option>
            </Form.Select>
          </Form.Group>
          <div className=" d-flex justify-content-between">
            {isSubmitting ?
              (<Button className="mt-3" type="submit">
                {submittingButtonLabel}
              </Button>
              ) :
              (<Button className="mt-3" type="submit">
                {submitButtonLabel}
              </Button>)
            }

            <Link to={"/users"} className=" btn btn-warning mt-3 mx-2"> Back</Link>

          </div>
        </Form>
      </Card>
    </div>
  )
}

export default EditUserFormComponent