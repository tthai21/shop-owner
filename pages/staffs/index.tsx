import React, { useEffect, useState, useCallback } from "react";
import axios from "@/ulti/axios";
import Staff from "@/components/Staff";
import CreateStaff from "@/components/CreateStaff";
import EditStaff from "@/components/EditStaff";

const Staffs: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);

  const sortedStaffArray = staffs.sort((a: any, b: any) => a.id - b.id);

  const fetchStaffs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<Staff[]>("/staff/?isOnlyActive=true", {
        headers: {
          "Content-Type": "application/json",
          "X-StoreID": process.env.NEXT_PUBLIC_STORE_ID,
        },
      });
      setStaffs(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaffs();
  }, [fetchStaffs, updateTrigger]);

  const handleUpdate = () => {
    setUpdateTrigger(!updateTrigger);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div className="mt-20 xl:w-[90%] 2xl:w-[80%] mx-auto">
      <div className="cursor-pointer flex justify-center items-center">
        <CreateStaff onUpdate={handleUpdate} />
      </div>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {sortedStaffArray.map((staff) => (
          <EditStaff key={staff.id} staff={staff} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  );
};

export default Staffs;
