import { ButtonHTMLAttributes } from "react";

import "../Styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

const Button = ({ isOutlined = false, ...props }: ButtonProps) => {
  return (
    <button
      className={`button ${isOutlined ? "outlined" : ""} `}
      {...props}
    ></button>
  );
};

export default Button;
