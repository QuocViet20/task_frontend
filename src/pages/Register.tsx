import React,{useState} from "react";
import {
  Form,
  FormGroup,
  Button,
  Card,
  FloatingLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Role } from "../models/user";


type User = {
  email: string;
  username: string;
  password: string;
  role: Role;
  userId: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();
   console.log(watch('confirmPassword'));

  const onsubmit: SubmitHandler<User> = data =>console.log(data)

  return (
    <div
      className="container d-flex justify-content-center"
      style={{ marginTop: "50px" }}
    >
      <Card
        style={{ width: "25rem", padding: "15px", backgroundColor: "#f8f9fa" }}
      >
        <h3 className="text-center text-success font-italic">
          Đăng ký tài khoản
        </h3>
        <Form onSubmit={handleSubmit(onsubmit)}>
          <FormGroup className="mt-2">
            <FloatingLabel label="Email">
              <Form.Control
                id="exampleEmail"
                placeholder="Email"
                type="text"
                {...register("email", {
                  required: true,
                  pattern:
                    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
                })}
              />
              {errors.email?.type === "required" && (
                <span className="mt-1 text-danger">Hãy nhập email của bạn</span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="mt-1 text-danger">Đây phải là Email</span>
              )}
            </FloatingLabel>
          </FormGroup>
          <FormGroup className="mt-2">
            <FloatingLabel label="Username">
              <Form.Control
                id="exampleUsername"
                placeholder="Username"
                type="text"
                {...register("username", {
                  required: true,
                  maxLength: 16,
                })}
              />
            </FloatingLabel>
            {errors.username?.type === "required" && (
              <span className="mt-1 text-danger">
                Hãy nhập tên tài khoản của bạn
              </span>
            )}
            {errors.username?.type === "maxLength" && (
              <span className="mt-1 text-danger">
                Tên tài khoản tối đa 16 ký tự
              </span>
            )}
          </FormGroup>
          <FormGroup className="mt-3">
            <FloatingLabel label="Password">
              <Form.Control
                id="examplePassword"
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              />
            </FloatingLabel>
            {errors.password?.type === "required" && (
              <span className="mt-1 text-danger">
                Hãy nhập mật khẩu của bạn
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="mt-1 text-danger">Mật khẩu ít nhất 6 ký tự</span>
            )}
          </FormGroup>
          <FormGroup className="mt-3">
            <FloatingLabel label="Confirm Password">
              <Form.Control
                id="exampleConfirmPassword"
                placeholder="ConfirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  minLength: 6,
                })}
              />
            </FloatingLabel>
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
          </FormGroup>
          <Button className="mt-3" type="submit">
            Đăng ký
          </Button>
          <Card.Text className="text-secondary pt-2 pb-4">
            Bạn đã có tài khoản rồi hãy
            <Link
              to={"/login"}
              className="text-danger"
              style={{
                textDecoration: "none",
                paddingLeft: "5px",
                cursor: "pointer",
              }}
            >
              Đăng nhập
            </Link>
          </Card.Text>
        </Form>
      </Card>
    </div>
  );
};

export default Register
