import { FC, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

import { CrossIcon } from "@/icons/CrossIcon";

import * as S from "./styled";

interface DialogProps {
  onClose: (open: boolean) => void;
  isOpen: boolean;
  children: ReactNode;
}

export const Dialog: FC<DialogProps> = ({ onClose, isOpen, children }) => {
  const closeDialog = () => {
    onClose(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <S.DialogShadow onClick={closeDialog} />
      <S.Dialog>
        <S.CloseButton onClick={closeDialog}>
          <CrossIcon />
        </S.CloseButton>
        <S.DialogContent>{children}</S.DialogContent>
      </S.Dialog>
    </>,
    document.getElementById("dialog-root")!,
  );
};
