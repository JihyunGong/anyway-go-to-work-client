import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Login from "../components/Login/Login";
import Sidebar from "../components/Sidebar/Sidebar";
import Error from "../components/Error/Error";

import lightBackgroundImg from "../assets/background/background-light-mode.png";
import darkBackgroundImg from "../assets/background/background-dark-mode.png";

const App = () => {
  const [isLightMode, setIsLightMode] = useState(true);

  return (
    <AppStyle isLightMode={isLightMode}>
      <Sidebar isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
      <Router>
        <Routes>
          <Route path="/" element={<Login isLightMode={isLightMode} />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </AppStyle>
  );
};

const AppStyle = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: ${(props) =>
    props.isLightMode
      ? `url(${lightBackgroundImg})`
      : `url(${darkBackgroundImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  color: ${(props) => (props.isLightMode ? "black" : "white")};
`;

export default App;
