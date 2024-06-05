import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import SwitchActive from "./SwitchActive";
import axios from "@/ulti/axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getToken } from "@/helper/getToken";

interface EditStaffProps {
  staff: Staff;
  onUpdate: () => void;
}

const EditStaff: React.FC<EditStaffProps> = ({ staff, onUpdate }) => {
  const [formData, setFormData] = useState<Staff>({ ...staff });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (isActive: boolean) => {
    setFormData({ ...formData, isActive });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/staff/", formData, {
        headers: {
          "Content-Type": "application/json",
          "X-StoreID": process.env.NEXT_PUBLIC_STORE_ID || process.env.STORE_ID,
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log(response.data);
      onUpdate();

      if (response.status !== 201) {
        throw new Error("Failed to submit booking.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };
  useEffect(() => {
    // Disable autofocus when the dialog opens
    const firstFocusableElement = document.querySelector(
      '[data-focusable="true"]'
    ) as HTMLElement;
    firstFocusableElement?.blur();
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div
          key={staff.id}
          className={`sm:p-4 mb-10 bg-white border-2 rounded-lg shadow-md py-2 flex flex-col justify-between w-[160px] sm:w-[200px] mx-auto items-center  cursor-pointer ${
            !staff.isActive && "bg-slate-300"
          } `}
        >
          <div className="text-base xs:text-sm font-semibold flex flex-col justify-center gap-2 mb-2 items-center">
            <AccountCircleIcon />
            {staff.firstName}
          </div>
          <div className="text-gray-600 mb-4 px-8 text-base flex flex-col items-center justify-center  gap-x-2">
            <div>Nickname: </div>
            <div>{staff.nickname}</div>
          </div>
        </div>
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
          <form action="submit" onSubmit={handleSubmit}>
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
              htmlFor="nickname"
              fieldName="Nick Name"
              value={formData.nickname}
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
              active={formData.isActive}
              onChange={handleSwitchChange}
            />
            <div className="mt-[25px] flex justify-end">
              {/* <Dialog.Close asChild> */}
              <button
                type="submit"
                className="bg-blue-700 text-white hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-md px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Save changes
              </button>
              {/* </Dialog.Close> */}
            </div>
          </form>
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

export const StaffField: React.FC<StaffFieldProps> = ({
  value,
  fieldName,
  htmlFor,
  onChange,
}) => {
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
