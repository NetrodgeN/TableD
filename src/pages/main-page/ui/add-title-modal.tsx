import { useState } from "react";

import { useModal } from "@/app/providers/modal-provider";
import { Button } from "@/shared/ui/buttons";
import { TextInput } from "@/shared/ui/inputs";

interface AddTitleModalProps {
  onSubmit: ({
    title,
    contentTitle,
    nestedTitle,
  }: {
    title: string;
    contentTitle: string;
    nestedTitle: string;
  }) => void;
}

export const AddTitleModal = ({ onSubmit }: AddTitleModalProps) => {
  const [titleValue, setTitleTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [nestedContentValue, setNestedContentValue] = useState("");
  const { closeModal } = useModal();

  const onChangeTitle = (text: string) => {
    setTitleTitleValue(text);
  };

  const onChangeContent = (text: string) => {
    setContentValue(text);
  };

  const onChangeNestedValue = (text: string) => {
    setNestedContentValue(text);
  };

  const onAcceptHandler = () => {
    onSubmit({
      title: titleValue,
      contentTitle: contentValue,
      nestedTitle: nestedContentValue,
    });
    closeModal();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <span>Текст Title</span>
          <TextInput value={titleValue} onChange={onChangeTitle} />
        </div>
        <div>
          <span>Создать Content?</span>
          <TextInput value={contentValue} onChange={onChangeContent} />
        </div>
        <div>
          <span>Создать Доп контент?</span>
          <TextInput
            value={nestedContentValue}
            onChange={onChangeNestedValue}
          />
        </div>
      </div>
      <Button
        style={{ marginLeft: "auto" }}
        onClick={onAcceptHandler}
        label="push Me"
      />
    </>
  );
};
