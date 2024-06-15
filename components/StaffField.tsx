import React from "react";
import { UseFormRegister } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  dateOfBirth: Date;
  isActive:boolean

};

interface StaffFieldProps {
  value: any;
  fieldName: string;
  name: keyof FormData; 
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FormData>;
}

const StaffField: React.FC<StaffFieldProps> = ({
  value,
  fieldName,
  name,
  // onChange,
  register,
}) => {
  return (
    <fieldset className="mb-[15px] flex items-center gap-5">
      <label className="w-[80px] text-right text-[15px]" htmlFor={name}>
        {fieldName}
      </label>
      <input
        className="h-[35px] w-[150px] sm:w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none"
        id={name}
        {...register(name)}
        name={name}
        defaultValue={value}
        // onChange={onChange}
      />
    </fieldset>
  );
};

export default StaffField;
