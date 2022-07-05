import React from "react";
import styled from "styled-components";

import {
  firebaseAuth,
  googleProvider,
  googlePopup,
} from "../../config/firebase";
import { login } from "../../api/api";

import logo from "../../assets/logo.png";

const Login = ({ isLightMode }) => {
  const handleLogin = async () => {
    const userData = await googlePopup(firebaseAuth, googleProvider);
    const firebaseToken = await userData.user.getIdToken();

    if (userData && firebaseToken) {
      const res = await login(firebaseToken);
      const { id, name, email, token } = res.data.data;

      if (token) {
        localStorage.setItem("profile", { id, name, email, token });
      }
    }
  };

  return (
    <LoginStyle isLightMode={isLightMode}>
      <div className="title">아무튼 출근!</div>
      <img src={logo} alt="Logo" />
      <button className="button" onClick={handleLogin}>
        Google Sign in
      </button>
    </LoginStyle>
  );
};

const LoginStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  .title {
    font-weight: 600;
    font-size: 64px;
    text-align: center;
    margin-bottom: 20px;
  }

  .button {
    background: #7d9cc1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 30px;
    padding: 18px 50px 18px 50px;
    font-weight: 200;
    font-size: 48px;
    color: ${(props) => (props.isLightMode ? "black" : "white")};
    text-align: center;
    margin-top: 60px;
  }
`;

export default Login;
