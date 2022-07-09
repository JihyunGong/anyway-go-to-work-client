import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Login from "../components/Login/Login";
import Sidebar from "../components/Sidebar/Sidebar";
import Office from "../components/Office/Office";
import Error from "../components/Error/Error";
import CharacterSettingModal from "../components/Modal/CharacterSettingModal";
import CompanyModal from "../components/Modal/CompanyModal";
import ConfirmModal from "../components/Modal/ConfirmModal";
import DailyScrumModal from "../components/Modal/DailyScrumModal";

import lightBackgroundImg from "../assets/backgrounds/background-light-mode.png";
import darkBackgroundImg from "../assets/backgrounds/background-dark-mode.png";

const App = () => {
  const [isLightMode, setIsLightMode] = useState(true);
  const [errorPage, setErrorPage] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    characterSettingModal: "",
    companyModal: "",
    confirmModal: "",
    dailyScrumModal: "",
  });

  return (
    <AppStyle isLightMode={isLightMode}>
      {!errorPage && (
        <Sidebar isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
      )}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Login isLightMode={isLightMode} setModalInfo={setModalInfo} />
            }
          />
          <Route
            path="/companies/:companyId"
            element={
              <Office modalInfo={modalInfo} setModalInfo={setModalInfo} />
            }
          />
          <Route
            path="*"
            element={
              <Error errorPage={errorPage} setErrorPage={setErrorPage} />
            }
          />
        </Routes>
        {modalInfo.characterSettingModal && (
          <CharacterSettingModal
            modalInfo={modalInfo}
            setModalInfo={setModalInfo}
          />
        )}
        {modalInfo.companyModal && <CompanyModal setModalInfo={setModalInfo} />}
        {modalInfo.confirmModal && (
          <ConfirmModal modalInfo={modalInfo} setModalInfo={setModalInfo} />
        )}
        {modalInfo.dailyScrumModal && (
          <DailyScrumModal setModalInfo={setModalInfo} />
        )}
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
