import { styled } from "@linaria/react";
import { css } from "@linaria/core";

export const CheckBoxCell = styled.td``;

export const loadingRowClassName = css`
  pointer-events: none;
  animation: blink 1s infinite;

  @keyframes blink {
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.1;
    }
  }
`;
