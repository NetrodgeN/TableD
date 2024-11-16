import { ReactNode, SyntheticEvent } from "react";

import classNames from "classnames/bind";

import styles from "./button.module.scss";

const cn = classNames.bind(styles);
export enum BUTTON_SIZE {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface ButtonProps {
  icon?: ReactNode;
  isUpperCase?: boolean;
  label?: string;
  disabled?: boolean;
  onClick?: (event?: SyntheticEvent) => void;
  size?: BUTTON_SIZE;
  style?: any;
}

export const Button = ({
  icon,
  isUpperCase,
  label,
  disabled = false,
  onClick,
  size = BUTTON_SIZE.MEDIUM,
  style,
}: ButtonProps) => {
  return (
    <button
      type="button"
      style={style}
      className={cn("button", `button--${size}`)}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={cn("button__icon")}>{icon}</span>}
      {isUpperCase && label ? label.toUpperCase() : label}
    </button>
  );
};

Button.displayName = "Button";
