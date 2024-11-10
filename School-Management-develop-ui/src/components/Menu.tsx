"use client";

import { useGlobally } from "@/context/protected.context";
import { RoleTitle } from "@/enums/RoleTitle";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const role = sessionStorage.getItem("role");
const isValidRole =
  role && Array.isArray(JSON.parse(role)) && JSON.parse(role)[0];
const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: `/${isValidRole}`,
        visible: [`${isValidRole}`],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: [
          `${RoleTitle.ADMIN}`,
          `${RoleTitle.TEACHER}`,
        ],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: [
          `${RoleTitle.ADMIN}`,
          `${RoleTitle.TEACHER}`,
        ],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: [
          `${RoleTitle.ADMIN}`,
          `${RoleTitle.TEACHER}`,
        ],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: [`${RoleTitle.ADMIN}`],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: [`${RoleTitle.ADMIN}`, `${RoleTitle.TEACHER}`],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: [`${RoleTitle.ADMIN}`, `${RoleTitle.TEACHER}`],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: [
          `${RoleTitle.ADMIN}`,
          `${RoleTitle.STUDENT}`,
          `${RoleTitle.TEACHER}`,
          `${RoleTitle.PARENT}`,
        ],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: [
          `${RoleTitle.ADMIN}`,
          `${RoleTitle.STUDENT}`,
          `${RoleTitle.TEACHER}`,
          `${RoleTitle.PARENT}`,
        ],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: [
          `${RoleTitle.ADMIN}`,
          `${RoleTitle.STUDENT}`,
          `${RoleTitle.TEACHER}`,
          `${RoleTitle.PARENT}`,
        ],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: [
          `${RoleTitle.ADMIN}`,
          `${RoleTitle.STUDENT}`,
          `${RoleTitle.TEACHER}`,
          `${RoleTitle.PARENT}`,
        ],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: [
          `${RoleTitle.ADMIN}`,
          `${RoleTitle.STUDENT}`,
          `${RoleTitle.TEACHER}`,
          `${RoleTitle.PARENT}`,
        ],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: [
          `${RoleTitle.ADMIN}`,
          `${RoleTitle.STUDENT}`,
          `${RoleTitle.TEACHER}`,
          `${RoleTitle.PARENT}`,
        ],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: [
          `${RoleTitle.ADMIN}`,
          `${RoleTitle.STUDENT}`,
          `${RoleTitle.TEACHER}`,
          `${RoleTitle.PARENT}`,
        ],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  let role = sessionStorage.getItem("role");
  const [selectedItem, setSelectedItem] = useState(null);
  const { logout, handleLoadingFalse, handleLoadingTrue } = useGlobally();
  const pathname = usePathname();

  const handleItemClick = (item: any) => {
    if (item?.label === "Logout") {
      handleLoadingTrue && handleLoadingTrue();
      setTimeout(() => {
        handleLoadingFalse && handleLoadingFalse();
        logout && logout();
      }, 2000);
    }
    setSelectedItem(item.label);
  };

  return (
    <div className="text-sm p-2">
      {menuItems?.map((i) => {
        return (
          <div className="flex flex-col gap-2" key={i.title}>
            <span className="hidden lg:block text-gray-400 font-light my-4">
              {i.title}
            </span>
            {i.items?.map((item) => {
              let storedData: any;
              if (
                item.visible.some((checkRole) => {
                  if (role) {
                    storedData = JSON.parse(role);
                  }
                  if (Array.isArray(storedData)) {
                    return storedData?.some((ele) => checkRole === ele);
                  } else {
                    return false;
                  }
                })
              ) {
                return (
                  <Link
                    href={`${item?.href}`}
                    key={item?.label}
                    className={`p-2 flex justify-center items-center lg:justify-start gap-4 text-gray-500 py-2 hover:bg-omkarSkyLight rounded-md ${
                      pathname === item.href ? "bg-omkarSky" : ""
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <Image
                      src={`${item?.icon}`}
                      alt=""
                      width={20}
                      height={20}
                    />
                    <span className="hidden lg:block">{item?.label}</span>
                  </Link>
                );
              }
              return null;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
