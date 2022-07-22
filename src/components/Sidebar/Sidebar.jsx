import React from "react";
import styled from "styled-components";

import lightModeIcon from "../../assets/icons/light-mode.png";
import darkModeIcon from "../../assets/icons/dark-mode.png";
import employees from "../../assets/icons/employees.png";
import leave from "../../assets/icons/leave.png";
import textChatting from "../../assets/icons/text-chatting.png";
import videoChatting from "../../assets/icons/video-chatting.png";

const Sidebar = ({ isLightMode, setIsLightMode, setModalInfo, messages }) => {
  const isLoggedIn = localStorage.getItem("profile");

  const handleMode = () => {
    setIsLightMode(!isLightMode);
  };

  const handleEmployees = () => {
    setModalInfo((prevState) => ({
      ...prevState,
      stateModal: "stateModal",
    }));
  };

  const handleLeaving = () => {
    setModalInfo((prevState) => ({
      ...prevState,
      confirmModal: "Leaving Confirm",
    }));
  };

  const handleTextChatting = () => {
    setModalInfo((prevState) => ({
      ...prevState,
      textChatModal: "TextChatModal",
    }));
    messages.length = 0;
  };

  const handleVideoChatting = () => {
    setModalInfo((prevState) => ({
      ...prevState,
      videoChatModal: "VideoChattingModal",
    }));
  };

  return (
    <SidebarStyle>
      <img
        className="mode"
        src={isLightMode ? lightModeIcon : darkModeIcon}
        alt="Mode"
        onClick={handleMode}
      />
      {isLoggedIn && (
        <>
          <img
            className="employees"
            src={employees}
            alt="Employees"
            onClick={handleEmployees}
          />
          <img
            className="leave"
            src={leave}
            alt="Leave"
            onClick={handleLeaving}
          />
          <img
            className="textChatting"
            src={textChatting}
            alt="Text Chatting"
            onClick={handleTextChatting}
          />
          <img
            className="videoChatting"
            src={videoChatting}
            alt="Video Chatting"
            onClick={handleVideoChatting}
          />
        </>
      )}
    </SidebarStyle>
  );
};

const SidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 15px;
  right: 15px;

  .mode,
  .employees,
  .leave,
  .textChatting,
  .videoChatting {
    margin-bottom: 25px;
  }
`;

export default Sidebar;
