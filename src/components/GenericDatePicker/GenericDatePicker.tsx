import React from "react";
import { DatePicker as AntDatePicker, DatePickerProps } from "antd";
import { Moment } from "moment";

interface GenericDatePickerProps
  extends Omit<DatePickerProps<Moment>, "value" | "onChange"> {
  value?: Moment | null;
  onChange?: (date: Moment | null, dateString: string | string[]) => void;
}

const GenericDatePicker: React.FC<GenericDatePickerProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <AntDatePicker
      {...props}
      value={value}
      onChange={(date: Moment | null, dateString: string | string[]) =>
        onChange ? onChange(date, dateString) : undefined
      }
    />
  );
};

export default GenericDatePicker;
