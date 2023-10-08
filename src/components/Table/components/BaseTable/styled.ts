import { styled } from "@linaria/react";

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: solid 1px #d9d9d9;
  border-radius: 6px;

  td,
  th {
    border-bottom: 1px solid #d9d9d9;
    text-align: center;
    padding: 12px 15px;
    height: 36px;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;
