import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Portal from "../Portal/Portal";

import closeIcon from "../../assets/icons/close-icon.png";
import checkIcon from "../../assets/icons/check-icon.png";

const ConfirmModal = ({ modalInfo, setModalInfo }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    setModalInfo((prevState) => ({
      ...prevState,
      confirmModal: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    switch (modalInfo.confirmModal) {
      case "Text Video Chatting Confirm":
        break;
      case "Text Chatting Confrim":
        break;
      case "Screen Sharing Confirm":
        break;
      case "Working Confirm":
        break;
      case "Leaving Confirm":
        navigate("/");
        break;
      default:
    }

    closeModal();
  };

  return (
    <Portal>
      <ModalStyle>
        <div className="modalContainer">
          <img
            className="closeButton"
            src={closeIcon}
            alt="Close"
            onClick={closeModal}
          />
          <div className="messageContainer">Confirm Message</div>
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
    width: 454px;
    height: 214px;
    border: none;
    border-radius: 25px;
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    .closeButton {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }

    .messageContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 80px;
      font-size: 24px;
      font-weight: 200;
      text-align: center;
    }

    .checkButton {
      margin-top: 50px;
      cursor: pointer;
    }
  }
`;

export default ConfirmModal;
