import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Portal from "../Portal/Portal";
import UseEmail from "../../hooks/useEmail";
import getDateTime from "../../utils/getDateTime";

import leftArrow from "../../assets/icons/left-arrow.png";
import rightArrow from "../../assets/icons/right-arrow.png";
import checkIcon from "../../assets/icons/check-icon.png";
import alien from "../../assets/characters/alien.png";
import babyBoy from "../../assets/characters/baby-boy.png";
import babyGirl from "../../assets/characters/baby-girl.png";
import calmBoy from "../../assets/characters/calm-boy.png";
import capBoy from "../../assets/characters/cap-boy.png";
import coolBoy from "../../assets/characters/cool-guy.png";
import cuteGirl from "../../assets/characters/cute-girl.png";
import dressGirl from "../../assets/characters/dress-girl.png";
import gang from "../../assets/characters/gang.png";
import glassesBoy from "../../assets/characters/glasses-boy.png";
import newbie from "../../assets/characters/newbie.png";
import oldBoy from "../../assets/characters/old-boy.png";
import oldGirl from "../../assets/characters/old-girl.png";
import princess from "../../assets/characters/princess.png";
import witch from "../../assets/characters/witch.png";

const CharacterSettingModal = ({
  modalInfo,
  setModalInfo,
  setCharacter,
  nickname,
  setNickname,
  setTimestamp,
}) => {
  const navigate = useNavigate();

  const employee = JSON.parse(localStorage.getItem("profile"));
  const [counter, setCounter] = useState(0);
  const companyId = modalInfo.characterSettingModal;

  const characters = [
    alien,
    babyBoy,
    babyGirl,
    calmBoy,
    capBoy,
    coolBoy,
    cuteGirl,
    dressGirl,
    gang,
    glassesBoy,
    newbie,
    oldBoy,
    oldGirl,
    princess,
    witch,
  ];

  const { loading, submitted, error, sendEmail } = UseEmail(
    "https://public.herotofu.com/v1/fc6497d0-08e4-11ed-be50-e78da9ee852d"
  );

  const closeModal = () => {
    setCharacter(characters[counter]);
    setModalInfo((prevState) => ({
      ...prevState,
      characterSettingModal: "",
    }));
    setTimestamp(getDateTime(new Date()));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nickname) {
      closeModal();
      navigate("/error");
      return;
    }

    closeModal();
    navigate(`/companies/${companyId}`);

    const dateTime = getDateTime(new Date());

    sendEmail({
      employeeName: employee.name,
      workingTime: dateTime,
    });
  };

  return (
    <Portal>
      <ModalStyle>
        <div className="modalContainer">
          <div className="carouselContainer">
            <img
              className="carouselButton"
              src={leftArrow}
              alt="Left Arrow"
              onClick={() =>
                counter - 1 <= 0
                  ? setCounter(characters.length - 1)
                  : setCounter(counter - 1)
              }
            />
            <img
              className="character"
              src={characters[counter]}
              alt="Character"
            />
            <img
              className="carouselButton"
              src={rightArrow}
              alt="Right Arrow"
              onClick={() =>
                counter + 1 >= characters.length
                  ? setCounter(0)
                  : setCounter(counter + 1)
              }
            />
          </div>
          <input
            className="inputContainer"
            placeholder="Nickname"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
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

    .carouselContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      margin-top: 40px;
      margin-bottom: 50px;
    }

    .carouselButton {
      margin-left: 30px;
      margin-right: 30px;
      cursor: pointer;
    }

    .character {
      width: 160px;
      height: 160px;
    }

    .inputContainer {
      background: #c1c3c7;
      width: 281px;
      height: 61px;
      font-weight: 200;
      font-size: 24px;
      text-align: center;
      border: none;
      border-radius: 15px;
      margin-bottom: 10px;
    }

    .checkButton {
      margin-top: 20px;
      cursor: pointer;
    }
  }
`;

export default CharacterSettingModal;
