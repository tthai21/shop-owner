import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import SwitchActive from "./SwitchActive";



interface EditStaffProps {
  staff: Staff;
}

const EditStaff: React.FC<EditStaffProps> = ({ staff }) => {
  const [formData, setFormData] = useState<Staff>({ ...staff });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (active: boolean) => {
    setFormData({ ...formData, active });
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., send data to API
    console.log(formData);
  };
console.log(formData);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-blue-500 border border-blue-500 w-[80px] inline-flex h-[35px] items-center justify-center text-white px-[15px] font-medium leading-none rounded-md">
          Edit
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-slate-700 m-0 text-[17px] font-medium">
            Edit staff profile
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Make changes to staff profile here. Click save when you're done.
          </Dialog.Description>
          <StaffField
            htmlFor="firstName"
            fieldName="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <StaffField
            htmlFor="lastName"
            fieldName="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <StaffField
            htmlFor="nickName"
            fieldName="Nick Name"
            value={formData.nickName}
            onChange={handleChange}
          />
          <StaffField
            htmlFor="phone"
            fieldName="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <StaffField
            htmlFor="skillLevel"
            fieldName="Skill Level"
            value={formData.skillLevel}
            onChange={handleChange}
          />
          <StaffField
            htmlFor="dateOfBirth"
            fieldName="Date Of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <StaffField
            htmlFor="workingDays"
            fieldName="Working Days"
            value={formData.workingDays}
            onChange={handleChange}
          />
          <SwitchActive
            active={formData.active}
            onChange={handleSwitchChange}
          />
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={handleSubmit}
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditStaff;

interface StaffFieldProps {
  value: any;
  fieldName: string;
  htmlFor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StaffField: React.FC<StaffFieldProps> = ({ value, fieldName, htmlFor, onChange }) => {
  return (
    <fieldset className="mb-[15px] flex items-center gap-5">
      <label
        className="text-violet11 w-[90px] text-right text-[15px]"
        htmlFor={htmlFor}
      >
        {fieldName}
      </label>
      <input
        className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
        id={htmlFor}
        name={htmlFor}
        defaultValue={value}
        onChange={onChange}
      />
    </fieldset>
  );
};
