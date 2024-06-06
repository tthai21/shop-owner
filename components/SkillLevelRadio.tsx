import React from "react";

interface SkillLevelRadioProps {
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
  handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SkillLevelRadio: React.FC<SkillLevelRadioProps> = ({
  formData,
  handleRadioChange,
}) => {
  return (
    <div className="mb-[15px] flex  gap-5">
      <label className=" w-[80px] text-right text-[15px]">Skill Level</label>
      <div className="inline-flex flex-1">
        <div className="flex flex-wrap justify-start gap-3 w-full ">
          {[1, 2, 3, 4, 5].map((level) => (
            <label
              key={level}
              className={`flex cursor-pointer  items-center justify-center border-2 rounded-md h-7 w-10 ${
                formData.skillLevel == level
                  ? "border-blue-700 bg-blue-700 font-bold text-white"
                  : "bg-slate-300 text-white border-2 border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="skillLevel"
                value={level}
                checked={formData.skillLevel === level}
                onChange={handleRadioChange}
                className="appearance-none"
              />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillLevelRadio;
