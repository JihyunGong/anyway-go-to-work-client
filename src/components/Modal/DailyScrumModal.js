import React, { useState } from "react";
import styled from "styled-components";

import Portal from "../Portal/Portal";

import closeIcon from "../../assets/icons/close-icon.png";
import checkIcon from "../../assets/icons/check-icon.png";

const DailyScrumModal = ({ setModalInfo }) => {
  const [content, setContent] = useState("");

  const closeModal = () => {
    setModalInfo((prevState) => ({
      ...prevState,
      dailyScrumModal: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
          <div className="messageContainer">Daily Scrum</div>
          <textarea
            className="contentContainer"
            value={content}
            onChange={(event) => setContent(event.target.value)}
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
    width: 489px;
    height: 373px;
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
      font-size: 28px;
      font-weight: 200;
      text-align: center;
    }

    .contentContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 453px;
      height: 235px;
      background: #c8c8c8;
      border-radius: 5px;
      margin-top: 25px;
      font-size: 20px;
      font-weight: 200;
      resize: none;
    }

    .checkButton {
      margin-top: 15px;
      cursor: pointer;
    }
  }
`;

export default DailyScrumModal;
