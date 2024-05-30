import { getToken } from "@/helper/getToken";
import React, { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Staffs = () => {
  useEffect(() => {
    const token = getToken();
    console.log(token);
  }, []);
  return (
    <div className="mt-20 w-[80%] mx-auto">
      <div
        className={`lg:p-4 bg-white border-2 rounded-lg shadow-md py-2 mx-5 flex flex-col justify-center items-center cursor-pointer max-w-[200px]`}
      >
        <div className="text-base xs:text-sm  font-semibold flex flex-col justify-center gap-2 mb-2 items-center">
          <AccountCircleIcon />
          Staff name
        </div>
        <div className="text-gray-600 mb-4 text-base flex justify-center flex-col-1 gap-x-2">
          <div>Nickname: </div>
          <div> Nickname </div>
        </div>
      </div>
    </div>
  );
};
export default Staffs;
