import React, { ReactElement, ReactNode } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface IPropsButton {
  type: 'button' | 'submit' | 'reset';
  text?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  type,
  className,
  children,
  text,
  onClick,
  disabled,
}: IPropsButton): ReactElement => {
  const btnClass: string = classNames(styles.button, className);

  return (
    <button
      type={type}
      className={btnClass}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
