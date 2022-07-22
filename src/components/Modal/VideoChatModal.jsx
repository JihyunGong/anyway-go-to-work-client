import React, { useState } from "react";
import styled from "styled-components";

import Portal from "../Portal/Portal";
import Video from "../Modal/VideoModal";
import useVideo from "../../hooks/useVideo";

const VideoChatModal = ({ roomId }) => {
  const [leave, setLeave] = useState(false);
  const { peers, userVideo } = useVideo(roomId);

  if (leave) {
    window.location.reload();
  }

  return (
    <Portal>
      <ModalStyle>
        <div className="modalContainer">
          <video
            className="videoContainer"
            ref={userVideo}
            autoPlay
            playsInline
            muted
            onClick={() => setLeave(true)}
          />
          {peers.map((peer) => {
            return <Video key={peer.peerID} peer={peer.peer} />;
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

  .modalContainer {
    position: fixed;
    margin: 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    gap: 30px;
  }

  .videoContainer {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
  }
`;

export default VideoChatModal;
