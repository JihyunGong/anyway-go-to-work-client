import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { socket, socketApi } from "../../config/socket";

import officeBackground from "../../assets/backgrounds/office-background.png";

const Office = ({
  employees,
  setEmployees,
  setCompany,
  character,
  nickname,
  timestamp,
}) => {
  const employee = JSON.parse(localStorage.getItem("profile"));
  const { companyId } = useParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!employees[employee.id].scrum) {
        alert("You need to provide your daily scrum now!");
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socketApi.joinRoom(employee, nickname, character, timestamp, companyId);

    const employeeDataHandler = (employeeData) => {
      const { employees, company } = employeeData;

      setEmployees(employees);
      setCompany(company);
    };

    const scrumHandler = (employees) => {
      setEmployees(employees);
    };

    const statusHandler = (employees) => {
      setEmployees(employees);
    };

    const leavingEmployeeHandler = (employees) => {
      setEmployees(employees);
    };

    socket.on("employeeData", employeeDataHandler);
    socket.on("scrumData", scrumHandler);
    socket.on("statusData", statusHandler);
    socket.on("leavingEmployeeData", leavingEmployeeHandler);

    return () => {
      socket.off("employeeData", employeeDataHandler);
      socket.off("scrumData", scrumHandler);
      socket.off("statusData", statusHandler);
      socket.off("leavingEmployeeData", leavingEmployeeHandler);
    };
  }, []);

  return (
    <OfficeStyle>
      <img src={officeBackground} alt="Office Background" />
    </OfficeStyle>
  );
};

const OfficeStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  .character {
    width: 27px;
    height: 29px;
  }
`;

export default Office;
