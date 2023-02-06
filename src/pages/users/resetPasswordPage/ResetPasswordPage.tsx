import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash"

// type 
import { ResetPasswordForm, UserCreate } from "../../../types";

//hooks
import useAuth from "../../../hooks/useAuth";

//api
import { getUserId, updateUser } from "../../../api/serviceApi";

//components
import Loading from "../../../components/elements/loading/Loading";

const ResetPasswordPage = () => {
  const [matchPasswordError, setMatchPasswordError] = useState(false)
  const { authData } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ResetPasswordForm>()

  const resetPasswordMutation = useMutation({
    mutationFn: (body: UserCreate) => {
      return updateUser(authData.userId as string, body)
    },
    onError: () => {
      toast.error("Reset password failded", {
        position: toast.POSITION.TOP_RIGHT
      })
    },
    onSuccess: () => {
      toast.success("Reset password successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
      navigate("/login")
    }
  })

  const {
    data: userResponse,
    isLoading: isGetUserLoading,
    isError: isGetUserError,
  } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => await getUserId(authData.userId as string),
    enabled: !_.isNil(authData.userId)
  })

  console.log(userResponse?.data)
  const onSubmit: SubmitHandler<ResetPasswordForm> = (data: any) => {
    if (data.password !== userResponse?.data.password) {
      setMatchPasswordError(true)
    } else {
      setMatchPasswordError(false)
      const updateUser: UserCreate = {
        email: authData.email,
        password: data.newPassword,
        role: authData.role,
        accessToken: authData.accessToken,
        username: authData.username,
      }
      resetPasswordMutation.mutate(updateUser)
    }
  }

  if (isGetUserError) {
    return <h1 className="container text-center text-danger"></h1>
  }
  if (isGetUserLoading) {
    return <Loading />
  }

  return (
    <div className="container d-flex justify-content-center marginTop">
      <Card className="card_container">
        <h3 className="text-center text-success font-italic">Reset Password</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mt-2">
            <Form.Label
              className="font-weight-bold mx-1 label_text">
              Password
            </Form.Label>
            <Form.Control
              id="examplePassword"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password?.type === "required" && (
              <span className="mt-1 text-danger">
                Hãy nhập mật khẩu của bạn
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="mt-1 text-danger">Mật khẩu ít nhất 6 ký tự</span>
            )}
            {watch('password') !== userResponse?.data.password && matchPasswordError && errors.password?.type !== "minLength" && (
              <span className="mt-1 text-danger">Mật khẩu không đúng</span>
            )}
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label
              className="font-weight-bold mx-1 label_text">
              New password
            </Form.Label>
            <Form.Control
              id="examplePassword"
              placeholder="New password"
              type="password"
              {...register("newPassword", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.newPassword?.type === "required" && (
              <span className="mt-1 text-danger">
                Hãy nhập mật khẩu mới của bạn
              </span>
            )}
            {errors.newPassword?.type === "minLength" && (
              <span className="mt-1 text-danger">Mật khẩu ít nhất 6 ký tự</span>
            )}
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label
              className="font-weight-bold mx-1 label_text">
              ConfirmPassword
            </Form.Label>
            <Form.Control
              id="examplePassword"
              placeholder="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.confirmPassword?.type === "required" && (
              <span className="mt-1 text-danger">
                Hãy nhập mật khẩu xác nhận của bạn
              </span>
            )}
            {errors.confirmPassword?.type === "minLength" && (
              <span className="mt-1 text-danger">Mật khẩu ít nhất 6 ký tự</span>
            )}
            {watch("confirmPassword") &&
              watch("newPassword") !== watch("confirmPassword") &&
              !errors.confirmPassword?.type && (
                <span className="mt-1 text-danger">
                  Mật khẩu xác nhận không đúng
                </span>
              )}
          </Form.Group>
          <div className=" d-flex justify-content-between">
            <Button className="mt-3" type="submit">
              Reset
            </Button>

            <Link to={"/"} className=" btn btn-warning mt-3 mx-2"> Back</Link>

          </div>
        </Form>
      </Card>
    </div>
  )
}

export default ResetPasswordPage
