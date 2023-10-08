import { Button, Input } from "antd";
import { FC, useState, ChangeEvent } from "react";
import useSWRMutation from "swr/mutation";

import { assigneeMutation } from "@/api";
import { Dialog } from "@/components/Dialog";

import * as S from "./styled";

interface AssignLicenseDialogProps {
  selectedRows: Map<string, boolean>;
  isOpen: boolean;
  onClose: () => void;
  onLicenseAssigned: () => void;
}

export const AssignLicenseDialog: FC<AssignLicenseDialogProps> = ({
  selectedRows,
  isOpen,
  onClose,
  onLicenseAssigned,
}) => {
  const [assigned, setAssigned] = useState("");

  const { trigger, isMutating } = useSWRMutation(
    "/api/licenses/assign",
    assigneeMutation,
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssigned(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await trigger({
        ids: [...selectedRows.keys()],
        assignTo: assigned,
      });

      if (response) {
        onLicenseAssigned();
        onClose();
      }
    } catch (e) {
      console.error("Assign license error:", e);
    } finally {
      setAssigned("");
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <Input
        className={S.inputClassName}
        size="large"
        value={assigned}
        placeholder={"Assign selected licences to"}
        onChange={handleInputChange}
      />
      <S.ButtonContainer>
        <Button
          className={S.buttonClassName}
          loading={isMutating}
          type={"primary"}
          size={"large"}
          onClick={handleButtonClick}
        >
          Assign
        </Button>
      </S.ButtonContainer>
    </Dialog>
  );
};
