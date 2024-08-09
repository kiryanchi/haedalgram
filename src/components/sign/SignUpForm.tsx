// src/components/sign/SignUpForm.tsx

import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { HOST } from "../../config";

type SignUpRequest = {
  name: string;
  username: string;
  password: string;
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
  height: 30px;
  margin-top: 10px;

  font-size: 16px;
  color: var(--color-white);
  background-color: var(--color-blue-1);

  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirm(e.target.value);

  const onSubmitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      name.length == 0 ||
      username.length == 0 ||
      password.length == 0 ||
      passwordConfirm.length == 0
    ) {
      alert("모든 필드는 공백이면 안 됩니다.");
      return;
    }

    // 비밀번호 검증
    if (password != passwordConfirm) {
      alert("비밀번호가 같지 않습니다.");
      return;
    }

    const signUpRequest: SignUpRequest = {
      name,
      username,
      password,
    };

    axios
      .post(`${HOST}/auth/register`, signUpRequest)
      .then(() => {
        alert("회원가입이 성공하였습니다.");
      })
      .catch(() => {
        alert("회원가입이 실패하였습니다.");
      });
  };

  return (
    <Form onSubmit={onSubmitSignUp}>
      <Input
        onChange={onChangeName}
        value={name}
        type="text"
        placeholder="Name"
      />
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
      <Input
        onChange={onChangePasswordConfirm}
        value={passwordConfirm}
        type="password"
        placeholder="Password Confirm"
      />
      <Button>Sign Up</Button>
    </Form>
  );
};

export default SignUpForm;
