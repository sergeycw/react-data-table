import { FC } from "react";
import { Button } from "antd";

import * as S from "./styled";

interface PaginationProps {
  onNextButtonClick: () => void;
  onPrevButtonClick: () => void;
  isNextButtonDisabled: boolean;
  isPrevButtonDisabled: boolean;
}

export const Pagination: FC<PaginationProps> = ({
  onNextButtonClick,
  onPrevButtonClick,
  isPrevButtonDisabled,
  isNextButtonDisabled,
}) => {
  return (
    <S.Pagination>
      <Button disabled={isPrevButtonDisabled} onClick={onPrevButtonClick}>
        {"Previous"}
      </Button>
      <Button disabled={isNextButtonDisabled} onClick={onNextButtonClick}>
        {"Next"}
      </Button>
    </S.Pagination>
  );
};
