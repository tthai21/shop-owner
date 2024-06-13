import MenubarDemo from "@/components/Menubar";
import { useRouter } from "next/router";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const slug = router.route;

  return (
    <div className="lg:w-[80%] mx-auto mb-20">
      {slug !== "/" && slug !== "/login" && slug !== "/session-expired" && <MenubarDemo />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
