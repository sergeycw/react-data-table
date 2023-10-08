import { styled } from "@linaria/react";

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  padding: 24px 0;
`;

export const RangeRow = styled.div`
  display: flex;
  align-items: center;
  & > div:not(:last-child) {
    margin-right: 10px;
  }
`;
