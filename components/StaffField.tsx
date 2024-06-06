interface StaffFieldProps {
    value: any;
    fieldName: string;
    htmlFor: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
   const StaffField: React.FC<StaffFieldProps> = ({
    value,
    fieldName,
    htmlFor,
    onChange,
  }) => {
    return (
      <fieldset className="mb-[15px]  flex items-center gap-5">
        <label
          className="w-[80px]  text-right text-[15px]"
          htmlFor={htmlFor}
        >
          {fieldName}
        </label>
        <input
       className="h-[35px] w-[150px] sm:w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none"
          id={htmlFor}
          name={htmlFor}
          defaultValue={value}
          onChange={onChange}
        />
      </fieldset>
    );
  };

  export default StaffField