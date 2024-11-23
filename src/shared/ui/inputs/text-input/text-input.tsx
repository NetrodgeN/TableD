import { FocusEventHandler, FormEvent, KeyboardEventHandler } from "react";

import classNames from "classnames/bind";

import styles from "./text-input.module.scss";

const cn = classNames.bind(styles);

interface TextInputProps {
  value?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: (value: string) => void;
  onClick?: () => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
}

export const TextInput = ({
  value,
  placeholder,
  disabled,
  onBlur,
  onChange,
  onClick,
  onFocus,
  onKeyDown,
}: TextInputProps) => {
  const handleChange = (e: FormEvent) => {
    if (onChange) {
      onChange((e.target as HTMLInputElement).value);
    }
  };

  return (
    <input
      value={value}
      className={cn("input")}
      placeholder={placeholder}
      disabled={disabled}
      onBlur={onBlur}
      onClick={onClick}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    />
  );
};

TextInput.displayName = "TextInput";
