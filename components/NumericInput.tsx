import React from 'react';

type NumericInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const NumericInput = React.forwardRef<HTMLInputElement, NumericInputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      inputMode="numeric"
      onInput={(e) => {
        const input = e.target as HTMLInputElement;
        input.value = input.value.replace(/[^0-9/]/g, '');
        if (props.onInput) {
          props.onInput(e);
        }
      }}
    />
  );
});

export default NumericInput;
