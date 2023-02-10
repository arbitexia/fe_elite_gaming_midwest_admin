import React from 'react';
import InputMask from 'react-input-mask';

interface CustomProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
}
export const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <InputMask
        id="phoneNumber"
        mask="(999) 999 9999"
        onChange={onChange}
        maskChar="_"
        {...other}
      />
    );
  }
);
