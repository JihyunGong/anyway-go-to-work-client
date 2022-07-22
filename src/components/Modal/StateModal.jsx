import React, { useRef } from "react";
import styled from "styled-components";

import Portal from "../Portal/Portal";
import { socketApi } from "../../config/socket";
import PhotoModal from "./PhotoModal";

const StateModal = ({ setModalInfo, employees, company }) => {
  const employee = JSON.parse(localStorage.getItem("profile"));
  const outArea = useRef();

  const closeModal = (event) => {
    if (outArea.current === event.target) {
      setModalInfo((prevState) => ({
        ...prevState,
        stateModal: "",
      }));
    }
  };

  const handleDailyScrum = (employeeId) => {
    setModalInfo((prevState) => ({
      ...prevState,
      dailyScrumModal: employeeId,
    }));
  };

  const handleStatus = (event) => {
    event.preventDefault();

    socketApi.sendStatus({
      employeeId: employee.id,
      status: event.target.value,
    });
  };

  const handlePhoto = () => {
    setModalInfo((prevState) => ({
      ...prevState,
      photoModal: "photoModal",
    }));
  };

  return (
    <Portal>
      <ModalStyle ref={outArea} onClick={(event) => closeModal(event)}>
        <div className="modalContainer">
          {Object.keys(employees).length !== 0 &&
            Object.keys(employees).map((employeeId) => {
              return (
                <div className="employeeState">
                  <img
                    className="character"
                    src={employees[employeeId].character}
                    alt="Character"
                    onClick={handlePhoto}
                  />
                  <br />
                  <span onClick={() => handleDailyScrum(employeeId)}>
                    {employees[employeeId].nickname} |
                  </span>
                  <span>
                    {" "}
                    {employees[employeeId].timestamp.split(" ")[1]} |{" "}
                  </span>
                  <span>
                    <select
                      onChange={handleStatus}
                      disabled={employeeId !== employee.id}
                      value={employees[employeeId].status}
                    >
                      <option value="Working">Working</option>
                      <option value="Away">Away</option>
                    </select>
                  </span>
                </div>
              );
            })}
        </div>
      </ModalStyle>
    </Portal>
  );
};

const ModalStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(74, 74, 74, 0.5);

  .modalContainer {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: 130px;
    left: 570px;
    width: 298px;
    height: 510px;
    border: none;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }

  .employeeState {
    width: 257px;
    height: 50px;
    background-color: #c0bfbf;
    border-radius: 10px;
    margin-top: 20px;
    text-align: center;
    overflow: auto;
  }

  .character {
    width: 25px;
    height: 27px;
  }
`;

export default StateModal;
