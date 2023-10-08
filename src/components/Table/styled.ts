import { styled } from "@linaria/react";
import { css } from "@linaria/core";

export const TableWrapper = styled.div`
  width: 1120px;
  margin: auto;
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  padding: 24px 0;
`;

export const hideStyles = css`
  & .ant-select-selection-item {
    background-color: inherit !important;
  }
  & .ant-select-selection-item-content {
    color: rgba(0, 0, 0, 0.25) !important;
  }
`;
