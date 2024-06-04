import React, { useEffect, useState, useCallback } from "react";
import axios from "@/ulti/axios";
import Staff from "@/components/Staff";
import CreateStaff from "@/components/CreateStaff";
import EditStaff from "@/components/EditStaff";
import CustomLoading from "@/components/CustomLoading";

interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  skillLevel: number;
  dateOfBirth: string;
  rate: number;
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

  const filteredStaffs = staffs.filter((staff) => {
    if (filter === "true") return staff.isActive;
    return true;
  });

  const sortedStaffArray = filteredStaffs.sort((a, b) => a.id - b.id);

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div className="mt-20 xl:w-[90%] 2xl:w-[80%] mx-auto">
      <div className="cursor-pointer flex justify-center items-center mb-4">
        <CreateStaff onUpdate={handleUpdate} />
      </div>
      <div className="flex justify-start items-center mb-4">
        <select
          onChange={handleFilterChange}
          className="bg-white text-slate-900 px-4 py-2 rounded-md border"
          value={filter}
        >
          <option value="true" className="rounded-md">
            Active Staff
          </option>
          <option value="false">All Staff</option>
        </select>
      </div>
      {loading ? (
        <CustomLoading />
      ) : (
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 grid-cols-2">
          {sortedStaffArray.map((staff) => (
            <EditStaff key={staff.id} staff={staff} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Staffs;
