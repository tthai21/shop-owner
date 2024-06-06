import React from "react";

interface WorkingDayRadioProps {
  formData: {
    id: number | null;
    firstName: string;
    lastName: string;
    nickname: string;
    phone: string;
    skillLevel: number | null;
    dateOfBirth: string;
    rate: number | null;
    workingDays: number[];
    storeUuid: string;
    tenantUuid: string;
    isActive: boolean;
  };
  handleWorkingDaysChange: (day: number) => void;
}

const WorkingDayRadio: React.FC<WorkingDayRadioProps> = ({
  formData,
  handleWorkingDaysChange,
}) => {
  return (
    <div className="mb-[15px] flex gap-5">
      <label className="w-[80px]  text-right text-[15px]">Working Days</label>
      <div className="inline-flex flex-1">
        <div className="flex flex-wrap justify-stretch gap-3 w-full ">
          {[
            { label: "Mon", value: 1 },
            { label: "Tue", value: 2 },
            { label: "Wed", value: 3 },
            { label: "Thu", value: 4 },
            { label: "Fri", value: 5 },
            { label: "Sat", value: 6 },
            { label: "Sun", value: 7 },
          ].map((day) => (
            <label
              key={day.value}
              className={`cursor-pointer flex items-center justify-center rounded-md h-7 w-10 ${
                formData.workingDays.includes(day.value)
                  ? "bg-white text-blue-700 border-2 border-blue-700 font-bold"
                  : "text-black bg-gray-200"
              }`}
            >
              <input
                type="checkbox"
                name="workingDays"
                value={day.value}
                checked={formData.workingDays.includes(day.value)}
                onChange={() => handleWorkingDaysChange(day.value)}
                className="appearance-none"
              />
              <span>{day.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkingDayRadio;
