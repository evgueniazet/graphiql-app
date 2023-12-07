import React, { ReactElement, ReactNode } from 'react';
import './Button.scss';

interface IPropsButton {
  type: 'button' | 'submit' | 'reset';
  text?: string;
  children?: ReactNode;
  className: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ type, className, children, text, onClick, disabled }: IPropsButton): ReactElement => {
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {text}
      {children}
    </button>
  );
}

export default Button;
