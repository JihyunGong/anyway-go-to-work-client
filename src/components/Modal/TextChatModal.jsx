import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import Portal from "../Portal/Portal";
import { socket, socketApi } from "../../config/socket";
import getDateTime from "../../utils/getDateTime";

const TextChatModal = ({ setModalInfo, messages, setMessages }) => {
  const [message, setMessage] = useState("");

  const employee = JSON.parse(localStorage.getItem("profile"));
  const outArea = useRef();

  const closeModal = (event) => {
    if (outArea.current === event.target) {
      setModalInfo((prevState) => ({
        ...prevState,
        textChatModal: "",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message) {
      return;
    }

    const messageData = {
      employeeId: employee.id,
      name: employee.name,
      content: message,
      dateTime: getDateTime(new Date()),
    };

    socketApi.sendMessage(messageData);
    setMessage("");
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    const messageHandler = (messageData) => {
      setMessages((prevState) => [...prevState, messageData]);
    };

    socket.on("messageData", messageHandler);

    return () => {
      socket.off("messageData", messageHandler);
    };
  }, []);

  return (
    <Portal>
      <ModalStyle ref={outArea} onClick={(event) => closeModal(event)}>
        <div className="modalContainer">
          <div className="messagesContainer">
            {messages.length !== 0 &&
              messages.map((message) => {
                if (message.employeeId === employee.id) {
                  return (
                    <>
                      <span className="myData">
                        {message.name} {message.dateTime}
                      </span>
                      <div className="myMessage">{message.content}</div>
                    </>
                  );
                }
                return (
                  <>
                    <span className="othersData">
                      {message.name} {message.dateTime}
                    </span>
                    <div className="othersMessage">{message.content}</div>
                  </>
                );
              })}
          </div>
          <form className="textChattingForm">
            <textarea
              className="messageArea"
              type="text"
              placeholder="메시지를 입력하세요."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button className="sendButton" onClick={handleSubmit}>
              SEND
            </button>
          </form>
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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(74, 74, 74, 0.5);

  .modalContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: 120px;
    left: 450px;
    width: 298px;
    height: 510px;
    border: none;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }

  .messagesContainer {
    width: 262px;
    height: 391px;
    border-radius: 5px;
    margin-bottom: 15px;
    background-color: white;
    overflow: auto;
  }

  .myMessage {
    background: #b5bcc2;
    border-radius: 5px;
    font-size: 15px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: right;
  }

  .myData {
    font-size: 13px;
    display: flex;
    justify-content: right;
  }

  .othersMessage {
    background: #8ca9c4;
    border-radius: 5px;
    font-size: 15px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: left;
  }

  .othersData {
    font-size: 13px;
    display: flex;
    justify-content: left;
  }

  .textChattingForm {
    display: flex;
    flex-direction: row;
  }

  .messageArea {
    width: 200px;
    height: 59px;
    margin-right: 5px;
    font-size: 15px;
    resize: none;
  }

  .sendButton {
    width: 52px;
    height: 65px;
    background: #b5bcc2;
    border: none;
    border-radius: 5px;
  }
`;

export default TextChatModal;
