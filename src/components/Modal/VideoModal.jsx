import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const VideoModal = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });

    return () => {
      ref.current = null;
    };
  }, []);

  return <VideoStyle autoPlay playsInline ref={ref} />;
};

const VideoStyle = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
`;

export default VideoModal;
