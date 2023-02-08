import React from "react";
import { Form, FormGroup, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { memo } from "react";

// types
import { IUserFormLogin } from "../../../types";

// api_service
import { apiClient } from "../../../api/serviceApi";

// hooks
import useAuth from '../../../hooks/useAuth'

//styles
import "./LoginPage.scss"

const Login: React.FC = memo(() => {
  const { setAuth, authData } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserFormLogin>();

  const onsubmit: SubmitHandler<IUserFormLogin> = async (data: any) => {
    const response = await apiClient.get((`/users?email=${data.email}&password=${data.password}`));
    console.log(response.data.length)
    if (response.data.length === 0) {
      toast.error('login error', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    setAuth({
      accessToken: response.data[0].accessToken,
      username: response.data[0].username,
      email: response.data[0].email,
      role: response.data[0].role,
      userId: response.data[0].id,
    });

    navigate("/")
    toast.success("login success", {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  return (
    <div className="container d-flex justify-content-center marginTop">
      <Card className="card_userForm">
        <h3 className="text-center text-success font-italic">Đăng nhập</h3>
        <Form onSubmit={handleSubmit(onsubmit)}>
          <FormGroup className="mt-2">
            <Form.Label
              className="font-weight-bold mx-1">
              Tài khoản
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
          </FormGroup>
          <FormGroup className="mt-2">
            <Form.Label
              className="font-weight-bold mx-1">
              Mật khẩu
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
          </FormGroup>

          <Button className="mt-3" type="submit">
            Đăng nhập
          </Button>
          <Card.Text className="text-secondary pt-2 pb-4">
            Bạn chưa có tài khoản ?
            <Link
              to={"/register"}
              className="text-danger"
              style={{
                textDecoration: "none",
                paddingLeft: "5px",
                cursor: "pointer",
              }}
            >
              Đăng Ký
            </Link>
          </Card.Text>
        </Form>
      </Card>
    </div>
  );
});

export default Login;
