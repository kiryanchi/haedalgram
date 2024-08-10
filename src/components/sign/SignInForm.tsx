// src/components/sign/SignInForm.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { TUser } from "../../types";
import useUserStore from "../../store/userStore";
import axios from "axios";
import { HOST } from "../../config";
import { useNavigate } from "react-router-dom";

type SignInRequest = {
  username: string;
  password: string;
};

type SignInResponse = {
  data: TUser;
  status: number;
};

const Form = styled.form`
  width: 80%;

  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  height: 40px;
  margin-top: 10px;
  padding: 5px 10px;

  border: 1px solid var(--color-grey-2);
  background-color: var(--color-grey-1);

  outline: none;
`;

const Button = styled.button`
  height: 35px;
  margin-top: 10px;

  font-size: 16px;
  color: var(--color-white);
  background-color: var(--color-blue-1);

  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SignInForm = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 값이 채워져있는지 검증
    if (username.length == 0 || password.length == 0) {
      alert("모든 필드를 채워주세요!");
      return;
    }

    const signInRequest: SignInRequest = {
      username,
      password,
    };

    axios
      .post(`${HOST}/auth/login`, signInRequest, {
        withCredentials: true,
      })
      .then((res: SignInResponse) => {
        const { name, id, username, imageData } = res.data;

        const user: TUser = {
          name,
          id,
          username,
          imageData,
        };

        console.log(user);
        login(user);

        navigate("/");
      })
      .catch(() => {
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <Form onSubmit={onSubmitLogin}>
      <Input
        onChange={onChangeUsername}
        value={username}
        type="text"
        placeholder="Username"
      />
      <Input
        onChange={onChangePassword}
        value={password}
        type="password"
        placeholder="Password"
      />
      <Button>Log In</Button>
    </Form>
  );
};

export default SignInForm;
