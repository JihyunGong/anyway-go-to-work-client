import { io } from "socket.io-client";

export const socket = io.connect(process.env.REACT_APP_SERVER_URL);

export const socketApi = {
  joinRoom: (employee, nickname, character, timestamp, companyId) => {
    socket.emit("joinRoom", {
      id: employee.id,
      name: employee.name,
      nickname,
      character,
      timestamp,
      companyId,
    });
  },
  leaveRoom: (employeeId) => {
    socket.emit("leaveRoom", employeeId);
  },
  sendMessage: (messageData) => {
    socket.emit("sendMessage", messageData);
  },
  sendDailyScrum: (scrumData) => {
    socket.emit("sendDailyScrum", scrumData);
  },
  sendStatus: (statusData) => {
    socket.emit("sendStatus", statusData);
  },
  joinVideoChat: (videoChatId) => {
    socket.emit("joinVideoChat", videoChatId);
  },
  sendingSignalToConnectWebRTC: (payload) => {
    socket.emit("sendingSignalToConnectWebRTC", payload);
  },
  returningSignalToConnectWebRTC: (payload) => {
    socket.emit("returningSignalToConnectWebRTC", payload);
  },
  leaveVideoChat: () => {
    socket.emit("leaveVideoChat");
  },
};
