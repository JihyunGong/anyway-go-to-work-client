import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Portal from "../Portal/Portal";
import * as api from "../../api/api";

import plusIcon from "../../assets/icons/plus-icon.png";
import closeIcon from "../../assets/icons/close-icon.png";
import checkIcon from "../../assets/icons/check-icon.png";

const CompanyModal = ({ setModalInfo }) => {
  const navigate = useNavigate();

  const [isSigninModal, setIsSigninModal] = useState(true);
  const [name, setName] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const employee = JSON.parse(localStorage.getItem("profile"));

  let companyInfo = {};

  const closeModal = () => {
    setModalInfo((prevState) => ({
      ...prevState,
      companyModal: "",
      characterSettingModal: companyInfo._id,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSigninModal) {
      const res = await api.getCompany(employee.id, { name, secretCode });

      if (res.data.error) {
        closeModal();
        navigate("/error");
        return;
      }

      companyInfo = res.data.data.company;

      if (
        companyInfo.employees.every((employee) => employee._id !== employee.id)
      ) {
        const res = await api.updateCompany(companyInfo._id);

        companyInfo = res.data.data.company;
      }

      closeModal();
      return;
    }

    await api.createCompany({ name, secretCode });

    setIsSigninModal(!isSigninModal);
  };

  return (
    <Portal>
      <ModalStyle>
        <div className="modalContainer">
          <img
            className="transferButton"
            src={isSigninModal ? plusIcon : closeIcon}
            alt={isSigninModal ? "Plus" : "Close"}
            onClick={() => setIsSigninModal(!isSigninModal)}
          />
          <div className="messageContainer">
            {isSigninModal ? "Company Sign in" : "New Company"}
          </div>
          <input
            className="inputContainer"
            placeholder="Company Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="inputContainer"
            placeholder="Company Secret Code"
            value={secretCode}
            onChange={(event) => setSecretCode(event.target.value)}
          />
          <img
            className="checkButton"
            src={checkIcon}
            alt="Check"
            onClick={handleSubmit}
          />
        </div>
      </ModalStyle>
    </Portal>
  );
};

const ModalStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(74, 74, 74, 0.5);

  .modalContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 386px;
    height: 445px;
    border: none;
    border-radius: 25px;
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    .transferButton {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }

    .messageContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40px;
      margin-bottom: 40px;
      font-size: 28px;
      font-weight: 200;
      text-align: center;
    }

    .inputContainer {
      background: #c1c3c7;
      width: 281px;
      height: 61px;
      margin-bottom: 30px;
      font-weight: 200;
      font-size: 24px;
      text-align: center;
      border: none;
      border-radius: 15px;
    }

    .checkButton {
      margin-top: 30px;
      cursor: pointer;
    }
  }
`;

export default CompanyModal;
