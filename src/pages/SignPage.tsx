// src/pages/SignPage.tsx

import styled from "styled-components";
import iphone from "../assets/iphone.png";
import logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
import SignInForm from "../components/sign/SignInForm";
import SignUpForm from "../components/sign/SignUpForm";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const Main = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const IphoneImg = styled.img`
  height: 500px;
`;

const SignSection = styled.section`
  width: 300px;
  margin-left: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid var(--color-grey-2);
`;

const LogoImg = styled.img`
  width: 70%;
  height: 20%;
  padding: 30px 0;
`;

const DividorDiv = styled.div`
  width: 80%;
  margin: 10px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 12px;
`;

const Dividor = styled.div`
  width: 100px;

  border-top: 1px solid var(--color-grey-2);
`;

const SwitchDiv = styled.div`
  width: 80%;
  margin-bottom: 30px;

  font-size: 12px;
  text-align: center;
`;

const SwitchSpan = styled.span`
  margin-left: 4px;

  color: var(--color-blue-1);

  cursor: pointer;
`;

const SignPage = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const onClickSwitchSign = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <Main>
      <IphoneImg src={iphone} />
      <SignSection>
        <LogoImg src={logo} />
        {isSignIn ? <SignInForm /> : <SignUpForm />}
        <DividorDiv>
          <Dividor />
          <p>OR</p>
          <Dividor />
        </DividorDiv>
        <SwitchDiv>
          <span>{isSignIn ? "계정이 없으신가요?" : "계정이 있으신가요?"}</span>
          <SwitchSpan onClick={onClickSwitchSign}>
            {isSignIn ? "회원가입" : "로그인"}
          </SwitchSpan>
        </SwitchDiv>
      </SignSection>
    </Main>
  );
};

export default SignPage;
