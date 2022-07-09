import React from "react";
import styled from "styled-components";

import lightModeIcon from "../../assets/icons/light-mode.png";
import darkModeIcon from "../../assets/icons/dark-mode.png";

const Sidebar = ({ isLightMode, setIsLightMode }) => {
  const handleClick = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <SidebarStyle>
      <img
        src={isLightMode ? lightModeIcon : darkModeIcon}
        alt="Mode"
        onClick={handleClick}
      />
    </SidebarStyle>
  );
};

const SidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 15px;
  right: 15px;
`;

export default Sidebar;
