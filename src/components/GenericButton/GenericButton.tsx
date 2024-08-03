import React from "react";
import { Button as AntButton, ButtonProps } from "antd";

interface GenericButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const GenericButton: React.FC<GenericButtonProps> = ({
  children,
  ...props
}) => {
  return <AntButton {...props}>{children}</AntButton>;
};

export default GenericButton;
