import React, { useEffect, useState, useCallback } from "react";
import axios from "@/utils/axios";
import CustomLoading from "@/components/Loading";
import { Spinner } from "@radix-ui/themes";
import SearchIcon from "@mui/icons-material/Search";
import Staff from "@/components/Staff";
import isTokenExpired from "@/helper/CheckTokenExpired";
import { useRouter } from "next/router";
import { getToken } from "@/helper/getToken";

interface Staff {
  id: number | null;
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  skillLevel: number | null;
  dateOfBirth: string;
  rate: number | null;
  workingDays: string;
  storeUuid: string;
  tenantUuid: string;
  isActive: boolean;
}

const Staffs: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("true");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("authToken")) {
      const token = getToken();

      if (isTokenExpired(token)) {
        sessionStorage.removeItem("authToken");
        router.push("/session-expired");
      }
    } else {
      router.push("/session-expired");
    }
  }, [router]);

  const fetchStaffs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<Staff[]>(
        `/staff/?isOnlyActive=${filter}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-StoreID": process.env.NEXT_PUBLIC_STORE_ID,
          },
        }
      );
      setStaffs(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchStaffs();
  }, [fetchStaffs, updateTrigger]);

  const handleUpdate = () => {
    setUpdateTrigger(!updateTrigger);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredStaffs = staffs.filter((staff) => {
    if (filter === "true" && !staff.isActive) return false;
    if (
      searchTerm &&
      !`${staff.firstName} ${staff.lastName} ${staff.nickname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const sortedStaffArray = filteredStaffs.sort((a: any, b: any) => a.id - b.id);

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  const emptyForm: Staff = {
    id: null,
    firstName: "",
    lastName: "",
    nickname: "",
    phone: "",
    skillLevel: 1,
    dateOfBirth: "01/01/1990",
    rate: 1,
    workingDays: "",
    storeUuid: "",
    tenantUuid: "",
    isActive: true,
  };

  return (
    <div className="mt-20 xl:w-[90%] 2xl:w-[80%] mx-auto">
      <div className="flex justify-center lg:justify-between items-center mb-4">
        <div className="hidden lg:text-xl font-bold sm:mx-16 lg:flex items-end gap-x-2">
          Team members
          <div className="border-2 rounded-full flex justify-center items-end w-8 h-8 border-slate-950">
            {sortedStaffArray.length}
          </div>
        </div>
        <div className="flex items-center sm:mx-14">
          <div className="hidden sm:flex items-center mx-2 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-5 pl-[9px] pr-[38px] bg-white rounded-lg border-2 shadow-md font-bold flex items-center h-[50px] focus:outline-none"
              placeholder="Search staff"
            />
            <SearchIcon className="cursor-pointer absolute right-[10px]" />
          </div>

          <select
            onChange={handleFilterChange}
            className="cursor-pointer py-[9px] bg-white rounded-lg border-2 shadow-md font-bold flex items-center h-[50px]"
            value={filter}
          >
            <option value="true" className="rounded-md">
              Active Staffs
            </option>
            <option value="false">All Staffs</option>
          </select>
          <Staff type="add" staff={emptyForm} onUpdate={handleUpdate} />
        </div>
      </div>
      <div className="sm:hidden flex items-center justify-center">
        <div className="flex relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-5 pl-[20px] bg-white rounded-lg border-2 shadow-md font-bold flex items-center h-[50px] focus:outline-none mx-auto"
            placeholder="Search staff"
          />
          <SearchIcon className="cursor-pointer absolute right-3 top-[25%]" />
        </div>
      </div>
      <CustomLoading />
      <div className="flex justify-center items-center mb-4"></div>
      {loading ? (
        <div className="flex justify-center items-center mt-[20%]">
          <Spinner size={"3"} />
        </div>
      ) : (
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {sortedStaffArray.map((staff) => (
            <Staff
              type="edit"
              key={staff.id}
              staff={staff}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Staffs;
