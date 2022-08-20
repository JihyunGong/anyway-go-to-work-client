import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import * as PIXI from "pixi.js";

import { socket, socketApi } from "../../config/socket";

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

  const canvasRef = useRef(null);

  let player;

  useEffect(() => {
    const app = new PIXI.Application({
      width: 1000,
      height: 600,
      transparent: true,
    });

    canvasRef.current.appendChild(app.view);
    app.start();

    player = new PIXI.Sprite.from(character);

    player.interactive = true;
    player.buttonMode = true;
    player.anchor.set(0.5);
    player.scale.set(0.2);

    player
      .on("pointerdown", onDragStart)
      .on("pointerup", onDragEnd)
      .on("pointerupoutside", onDragEnd)
      .on("pointermove", onDragMove);

    player.x = app.view.width / 2;
    player.y = app.view.height / 2;

    app.stage.addChild(player);

    function onDragStart(event) {
      player.data = event.data;
      player.alpha = 0.5;
      player.dragging = true;
    }

    function onDragEnd() {
      player.alpha = 1;
      player.dragging = false;
      player.data = null;
    }

    function onDragMove() {
      if (player.dragging) {
        const newPosition = player.data.getLocalPosition(player.parent);
        player.x = newPosition.x;
        player.y = newPosition.y;
      }
    }

    return () => {
      app.destroy(true, true);
    };
  }, []);

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
      <div ref={canvasRef}></div>
    </OfficeStyle>
  );
};

const OfficeStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .character {
    width: 25px;
    height: 27px;
  }
`;

export default Office;
