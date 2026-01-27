"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBox, FiCreditCard, FiLayers, FiLogOut, FiShoppingCart } from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname();
  const menuItems = [
    {
      name: "Products",
      icon: FiBox,
      link: "/admin/products",
    },
    {
      name: "Categories",
      icon: FiLayers,
      link: "/admin/categories",
    },
    {
      name: "Transactions",
      icon: FiShoppingCart,
      link: "/admin/transactions",
    },
    {
      name: "Bank Information",
      icon: FiCreditCard,
      link: "/admin/bank-info",
    },
  ];
  return (
    <aside className="w-80 min-h-screen bg-white border-r border-gray-100 flex flex-col left-0 top-0">
      <div className="py-9 px-14 border-b border-gray-100">
        <Image
          src="/images/sporton-admin.svg"
          alt="sporton logo"
          width={215}
          height={36}
        />
      </div>
      <div className="flex flex-col gap-2 mt-12 p-5">
        {menuItems.map((item) => {
          const isActive = item.link === pathname;
          return (
            <Link key={item.name} href={item.link}>
              <div
                className={
                  `flex items-center gap-3 py-2 px-4.5 rounded-lg font-medium hover:bg-gray-100 duration-300 transition-all` +
                  (isActive ? " bg-primary/15 text-primary" : "hover:bg-gray-100")
                }
              >
                <item.icon size={24} />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <Link href='#' className="gap-3 flex font-medium py-3 px-4.5 mx-5 hover:bg-gray-100 duration-300 rounded-lg mt-auto mb-10">
      <FiLogOut size={24}/>Log Out</Link>
    </aside>
  );
};

export default Sidebar;
