import React from 'react';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteStaff from './DeleteStaff';
import EditStaff from './EditStaff';

interface StaffProps {
   staff : Staff;
}

const Staff: React.FC<StaffProps> = ({ staff }) => {
    return (
        <div
        key={staff.id}
        className="lg:p-4 mb-10 bg-white border-2 rounded-lg shadow-md py-2 mx-5 flex flex-col justify-center items-center w-[200px]"
      >

        <div className="text-base xs:text-sm font-semibold flex flex-col justify-center gap-2 mb-2 items-center">
          <AccountCircleIcon />
          {staff.firstName}
        </div>
        <div className="text-gray-600 mb-4 text-base flex justify-center flex-col-1 gap-x-2">
          <div>Nickname: </div>
          <div>{staff.nickName}</div>
        </div>
        <div className='flex gap-3'>
        <DeleteStaff/>
        <EditStaff staff={staff}/>
        </div>
      </div>
    );
};

export default Staff;
