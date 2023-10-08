import { FC } from "react";
import { styled } from "@linaria/react";

const IconWrapper = styled.svg`
  transition: 0.3s;
  opacity: 0.3;
  cursor: pointer;
  stroke: black;

  &:hover {
    opacity: 0.7;
  }
`;

interface CloseIconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
}

export const CrossIcon: FC<CloseIconProps> = ({
  width = 24,
  height = 24,
  onClick,
}) => {
  return (
    <IconWrapper
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconWrapper>
  );
};
