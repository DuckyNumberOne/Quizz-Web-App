"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ButtonDefault from "../../common/buttons/buttonDefault";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@lib/state/store";
import useLocalStorage from "@lib/hook/useLocalStorage";
import { userInit } from "@lib/config/initUser";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const router = useRouter();
  const idUser = useSelector((state: RootState) => state.user._id);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={` fixed w-[11%] left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-white shadow-2 duration-300 ease-linear lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/admin">
          <Image
            width={150}
            height={40}
            src={"/images/logo-quizz.png"}
            alt="Logo"
            priority
          />
        </Link>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 lg:mt-9 px-2 2xl:px-4 xl:p-4">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-black">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Tables --> */}
              <li>
                <Link
                  href={`/admin/my-quizz/${idUser}`}
                  className={`xl:text-sm text-xs group relative flex items-center gap-2.5 rounded-sm 2xl:px-4 p-2 py-2 font-medium text-black duration-300 ease-in-out hover:bg-slate-200  "
                  }`}
                >
                  <Image
                    src="/incons/quizz.png"
                    width={20}
                    height={20}
                    alt="History"
                    className="max-w-10 max-h-10 bg-contain bg-no-repeat bg-center"
                  />
                  My quiz
                </Link>
              </li>
              <li>
                <Link
                  href={`/admin/my-friend/${idUser}`}
                  className={`xl:text-sm text-xs group relative flex items-center gap-2.5 rounded-sm 2xl:px-4 p-2 py-2 font-medium text-black duration-300 ease-in-out hover:bg-slate-200  "
                  }`}
                >
                  <Image
                    src="/incons/friends.png"
                    width={20}
                    height={20}
                    alt="History"
                    className="max-w-10 max-h-10 bg-contain bg-no-repeat bg-center"
                  />
                  My friend
                </Link>
              </li>
              {/* <!-- Menu Item Tables --> */}
              <li>
                <Link
                  href={`/admin/history/${idUser}`}
                  className={`xl:text-sm text-xs group relative flex items-center gap-2.5 rounded-sm 2xl:px-4 p-2 py-2 font-medium text-black duration-300 ease-in-out hover:bg-slate-200  "
                  }`}
                >
                  <Image
                    src="/incons/history.png"
                    width={20}
                    height={20}
                    alt="History"
                    className="max-w-10 max-h-10 bg-contain bg-no-repeat bg-center"
                  />
                  History
                </Link>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}

          <ButtonDefault
            onClick={() => router.push("/admin/quizz/create")}
            content="Create Quizz"
            className="xl:text-lg text-xs 
             transition-colors duration-200 ease-in-out flex items-center justify-center px-1 py-2 font-semibold mb-1 rounded-lg primary relative w-full bg-[#8854c0] text-[#fdfcfe] shadow-[0_4px_#6c4298] hover:bg-[#8854c0]"
          />
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
