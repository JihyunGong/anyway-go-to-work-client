import React, { useEffect, useRef } from "react";

import Portal from "../Portal/Portal";
import styled from "styled-components";

const PhotoModal = ({ setModalInfo }) => {
  let videoRef = useRef(null);
  let photoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePicture = () => {
    const width = 400;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");

    ctx.drawImage(video, 0, 0, width, height);
  };

  const clearImage = () => {
    let video = videoRef.current;
    let stream = video.srcObject;

    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    video.srcObject = null;

    setModalInfo((prevState) => ({
      ...prevState,
      photoModal: "",
    }));
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <Portal>
      <ModalStyle>
        <div className="modalContainer">
          <video className="videoContainer" ref={videoRef} />
          <button onClick={takePicture} className="btn btn-danger container">
            Take Picture
          </button>
          <canvas className="photoContainer" ref={photoRef} />
          <button onClick={clearImage}>close</button>
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
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(74, 74, 74, 0.5);

  .modalContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 450px;
    height: 300px;
    border: none;
    border-radius: 25px;
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .videoContainer {
    display: none;
  }
`;

export default PhotoModal;
