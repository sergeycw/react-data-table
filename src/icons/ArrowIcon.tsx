import { FC } from "react";
import { styled } from "@linaria/react";

const IconWrapper = styled.svg<ArrowIconProps>`
  cursor: pointer;
  stroke: black;
  transition: transform 0.3s;
  transform: ${(props) =>
    props.direction === "down" ? "rotate(180deg)" : "rotate(0deg)"};
`;

interface ArrowIconProps {
  width?: number;
  height?: number;
  direction?: "up" | "down";
  className?: string;
}

export const ArrowIcon: FC<ArrowIconProps> = ({
  width = 12,
  height = 12,
  direction,
  className,
}) => {
  return (
    <IconWrapper
      width={width}
      height={height}
      data-name="1-Arrow Up"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      direction={direction}
      className={className}
    >
      <path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" />
    </IconWrapper>
  );
};
