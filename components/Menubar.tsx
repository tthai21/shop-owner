import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import { useRouter } from "next/router";

const MenubarDemo = () => {
  const router = useRouter();
  const slug = router.route;
  return (
    <Menubar.Root className="flex bg-white p-[3px] mt-5 w-[90%] sx:w-[70%] lg:w-[50%] mx-auto justify-center  rounded-md shadow-[0_2px_10px] shadow-blackA4">
      <Menubar.Menu>
        <Menubar.Trigger
          onClick={() => router.push("/staffs")}
          className={`py-2 px-3 outline-none select-none font-medium leading-none rounded text-slate-900 text-[13px] lg:text-base flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4 hover:underline hover:underline-offset-4 ${
            slug == "/staffs" && "underline underline-offset-4"
          } `}
        >
          Staffs
        </Menubar.Trigger>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger
          onClick={() => router.push("/services")}
          className={`py-2 px-3 outline-none select-none font-medium leading-none rounded text-slate-900 text-[13px] lg:text-base flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4 hover:underline hover:underline-offset-4 ${
            slug == "/services" && "underline underline-offset-4"
          } `}
        >
          Services
        </Menubar.Trigger>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger
          onClick={() => router.push("/bookings")}
          className={`py-2 px-3 outline-none select-none font-medium leading-none rounded text-slate-900 text-[13px] lg:text-base flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4 hover:underline hover:underline-offset-4 ${
            slug == "/bookings" && "underline underline-offset-4"
          } `}
        >
          Bookings
        </Menubar.Trigger>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger
          onClick={() => router.push("/profiles")}
          className={`py-2 px-3 outline-none select-none font-medium leading-none rounded text-slate-900 text-[13px] lg:text-base flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4 hover:underline hover:underline-offset-4 ${
            slug == "/profiles" && "underline underline-offset-4"
          } `}
        >
          Profiles
        </Menubar.Trigger>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger
          onClick={() => router.push("/")}
          className={`py-2 px-3 outline-none select-none font-medium leading-none rounded text-slate-900 text-[13px] lg:text-base flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4 hover:underline hover:underline-offset-4 ${
            slug == "/profiles" && "underline underline-offset-4"
          } `}
        >
          Logout
        </Menubar.Trigger>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default MenubarDemo;
