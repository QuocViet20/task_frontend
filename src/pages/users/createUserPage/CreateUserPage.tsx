import React, { memo } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

// types
import { INewUser, Role, IFormUserCreateAccount } from "../../../types";

// service_api
import { createUser } from "../../../api/serviceApi";

const CreateUser: React.FC = memo(() => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormUserCreateAccount>();

  const onSubmit: SubmitHandler<IFormUserCreateAccount> = (data: any) => {
    const newUser: INewUser = {
      email: data.email,
      username: data.username,
      password: data.password,
      accessToken: "gfisjfosahfdhisa",
      role: data.role,
    }
    mutate(newUser, {
      onSuccess: () => { },
      onError: () => { }
    })
  }

  const { mutate } = useMutation({
    mutationFn: (body: INewUser) => {
      return createUser(body)
    },
    onError: () => {
      toast.error(" create account error", {
        position: toast.POSITION.TOP_RIGHT
      })
    },
    onSuccess: () => {
      toast.success("Account created successfully", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  })

  return (
    <div className="container d-flex justify-content-center marginTop">
      <Card className="card_userForm">
        <h3 className="text-center text-success font-italic">Create Account</h3>
        <Form onSubmit={handleSubmit(onSubmit)} >
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
              watch("password") !== watch("confirmPassword") &&
              !errors.confirmPassword?.type && (
                <span className="mt-1 text-danger">
                  Mật khẩu xác nhận không đúng
                </span>
              )}
          </Form.Group>
          <div className=" d-flex justify-content-between">
            <Button className="mt-3" type="submit">
              Create
            </Button>

            <Link to={"/users"} className=" btn btn-warning mt-3 mx-2"> Back</Link>

          </div>
        </Form>
      </Card>
    </div>
  )
})

export default CreateUser