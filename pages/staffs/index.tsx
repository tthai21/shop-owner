import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "@/ulti/axios";
import Staff from "@/components/Staff";

const Staffs: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(staffs);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await axios.get<Staff[]>("/staff/?isOnlyActive=true");
        setStaffs(response.data);
      } catch (error) {
        if (error) {
          setError("Error");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStaffs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div className="mt-20 xl:w-[90%] 2xl:w-[80%] mx-auto">
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 grid-cols-2 ">
        {staffs.map((staff) => (
          <Staff key={staff.id} staff={staff} />
        ))}
      </div>
    </div>
  );
};

export default Staffs;
