import { ButtonHTMLAttributes } from "react";

import "../Styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  return <button className="button" {...props}></button>;
};

export default Button;
