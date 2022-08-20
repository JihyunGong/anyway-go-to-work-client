import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { firebaseAuth } from "../../config/firebase";

import errorBackground from "../../assets/backgrounds/error-background.png";
import errorLetter from "../../assets/error-letter.png";
import backArrow from "../../assets/icons/back-arrow.png";

const Error = ({ setErrorPage }) => {
  const navigate = useNavigate();

  setErrorPage(true);

  const handleBackButton = async () => {
    await firebaseAuth.signOut();

    localStorage.removeItem("profile");

    if (!localStorage.getItem("profile")) {
      setErrorPage(false);
      navigate("/");
    }
  };

  return (
    <ErrorStyle>
      <img
        className="backArrow"
        src={backArrow}
        alt="Back Arrow"
        onClick={handleBackButton}
      />
      <div className="errorLetter">
        <img src={errorLetter} alt="Error Letter" />
        <div className="errorMessage">You got the Error!</div>
      </div>
    </ErrorStyle>
  );
};

const ErrorStyle = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${errorBackground});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .backArrow {
    position: absolute;
    top: 15px;
    left: 20px;
  }

  .errorLetter {
    position: relative;

    .errorMessage {
      position: absolute;
      bottom: 0px;
      left: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 489px;
      height: 206px;
      font-weight: 200;
      font-size: 48px;
      text-align: center;
      background-color: #ecf0f1;
    }
  }
`;

export default Error;
