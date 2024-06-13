import React, { forwardRef, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import SwitchActive from "./SwitchActive";
import axios from "@/utils/axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getToken } from "@/helper/getToken";
import StaffField from "./StaffField";
import WorkingDayRadio from "./WorkingDayRadio";
import SkillLevelRadio from "./SkillLevelRadio";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createDateFromString } from "@/helper/DateFromString";
import { formatDate } from "@/helper/FormatDate";

interface StaffProps {
  staff: Staff;
  type: "add" | "edit";
  onUpdate: () => void;
}

const Staff: React.FC<StaffProps> = ({ staff, onUpdate, type }) => {
  const [formData, setFormData] = useState<any>({
    ...staff,
    workingDays: staff.workingDays.split(",").map((day) => parseInt(day, 10)),
    dateOfBirth: createDateFromString(staff.dateOfBirth),
  });

  const [open, setOpen] = useState(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const phoneRegex = /^\d*$/; // Allow only numbers

      if (!phoneRegex.test(value)) {
        setPhoneError(true);
        return;
      }

      setPhoneError(false);
    }

    setFormData({ ...formData, [name]: value });
    validateForm({ ...formData, [name]: value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value, 10) });
    validateForm({ ...formData, [name]: parseInt(value, 10) });
  };

  const handleWorkingDaysChange = (day: number) => {
    const newWorkingDays = formData.workingDays.includes(day)
      ? formData.workingDays.filter((d: number) => d !== day)
      : [...formData.workingDays, day];
    setFormData({ ...formData, workingDays: newWorkingDays });
    validateForm({ ...formData, workingDays: newWorkingDays });
  };

  const handleSwitchChange = (isActive: boolean) => {
    setFormData({ ...formData, isActive });
    validateForm({ ...formData, isActive });
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      dateOfBirth: formatDate(formData.dateOfBirth),
      workingDays: formData.workingDays.join(","),
    };

    try {
      const response = await axios.post("/staff/", payload, {
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

  const validateForm = (data: any) => {
    const isValid =
      data.firstName &&
      data.lastName &&
      data.nickname &&
      data.phone &&
      !phoneError &&
      data.dateOfBirth &&
      data.workingDays.length > 0 &&
      typeof data.isActive === "boolean";
    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm(formData);
  }, []);

  const handleDateOfBirthChangeRaw = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    const regex = /^([0-3][0-9])\/([0-1][0-9])\/([0-9]{4})$/;
    if (!regex.test(value)) {
      e.target.value = formData.dateOfBirth
        ? formatDate(formData.dateOfBirth)
        : "";
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <div>
          {type === "add" && (
            <div className="cursor-pointer px-5 py-[9px] bg-slate-900 text-white rounded-lg border-2 shadow-md font-bold mx-2 flex border-slate-900 items-center h-[50px]">
              Add
            </div>
          )}
          {type === "edit" && (
            <div
              key={staff.id}
              className={`sm:p-4 mb-10  border-2 rounded-lg shadow-md py-2 flex flex-col justify-between w-[160px] sm:w-[200px] mx-auto items-center cursor-pointer ${
                !staff.isActive && "bg-slate-300"
              }`}
            >
              <div className="text-base xs:text-sm font-semibold flex flex-col justify-center gap-2 mb-2 items-center">
                <AccountCircleIcon />
                {staff.firstName}
              </div>
              <div className="text-gray-600 mb-4 px-8 text-base flex flex-col items-center justify-center gap-x-2">
                <div>Nickname:</div>
                <div>{staff.nickname}</div>
              </div>
            </div>
          )}
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[510px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-slate-700 m-0 text-[17px] font-medium mb-5">
            Edit staff profile
          </Dialog.Title>
          <form onSubmit={handleSubmit}>
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
              fieldName="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {phoneError && (
              <div className="ml-[100px] text-red-500 -mt-3 mb-2">
                Phone number must contain only numbers.
              </div>
            )}
            <div className="mb-[15px] flex items-center gap-5">
              <label className=" w-[80px] text-right text-[15px]">D.O.B</label>
              <div className="inline-flex flex-1 w-full">
                <DatePicker
                  selected={formData.dateOfBirth}
                  onChange={(date) =>
                    setFormData({ ...formData, dateOfBirth: date })
                  }
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  onChangeRaw={(e) => handleDateOfBirthChangeRaw(e)}
                  className="h-[35px] w-full sm:w-[360px] flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none"
                />
              </div>
            </div>
            <SkillLevelRadio
              formData={formData}
              handleRadioChange={handleRadioChange}
            />
            <WorkingDayRadio
              formData={formData}
              handleWorkingDaysChange={handleWorkingDaysChange}
            />
            <SwitchActive
              active={formData.isActive}
              onChange={handleSwitchChange}
            />
            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                    setOpen(false);
                  }}
                  className={` hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-md px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none ${
                    !isFormValid || phoneError
                      ? "bg-slate-400 text-white"
                      : "bg-blue-700 text-white"
                  }`}
                  disabled={!isFormValid || phoneError}
                >
                  {type === "add" && "Add"} {type === "edit" && "Save changes"}
                </button>
              </Dialog.Close>
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

export default Staff;
