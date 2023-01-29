import React from "react";
import { Form, FormGroup, Button, Card, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

type User = {
  account:string,
  password: string;
  
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
 

  const onsubmit: SubmitHandler<User> = (data) => console.log(data);

  return (
    <div
      className="container d-flex justify-content-center"
      style={{ marginTop: "50px" }}
    >
      <Card
        style={{ width: "25rem", padding: "15px", backgroundColor: "#f8f9fa" }}
      >
        <h3 className="text-center text-success font-italic">Đăng nhập</h3>
        <Form onSubmit={handleSubmit(onsubmit)}>
          <FormGroup className="mt-2">
            <Form.Label
              className="font-weight-bold mx-1"
              style={{ fontSize: "20px" }}
            >
              Tài khoản
            </Form.Label>
            <Form.Control
              id="exampleEmail"
              placeholder="Email or Username"
              type="text"
              {...register("account", {
                required: true,
              })}
            />
            {errors.account?.type === "required" && (
              <span className="mt-1 text-danger">
                Hãy nhập email hoặc Username của bạn
              </span>
            )}
          </FormGroup>
          <FormGroup className="mt-2">
            <Form.Label
              className="font-weight-bold mx-1"
              style={{ fontSize: "20px" }}
            >
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
};

export default Login;
