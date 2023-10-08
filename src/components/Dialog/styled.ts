import { styled } from "@linaria/react";

export const Dialog = styled.div`
  width: 80%;
  max-width: 500px;
  min-height: 300px;
  max-height: 80%;
  padding: 20px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  border-radius: 10px;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -55%);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

export const DialogShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.7;
    }
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const DialogContent = styled.div`
  max-height: 480px;
  overflow-y: auto;
`;
