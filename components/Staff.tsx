import React from "react";
import EditStaff from "./EditStaff";

interface StaffProps {
  staff: Staff;
  onUpdate:()=>void
}

const Staff: React.FC<StaffProps> = ({ staff ,onUpdate}) => {
  return (
    <div key={staff.id} className="cursor-pointer mx-auto ">
      <EditStaff onUpdate={onUpdate} staff={staff} />
    </div>
  );
};

export default Staff;
