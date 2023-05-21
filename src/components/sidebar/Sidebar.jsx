import React from 'react'
import { useState } from "react";
import './sidebar.css'
import Racoon from '../../assets/img/racoon.png';
import { BiChevronLeft } from 'react-icons/bi';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [

    { title: "Category 1", src: "Category 1", gap: true },
    { title: "Category 2 ", src: "Category 2" },
    { title: "Category 3", src: "Category 3" },
    { title: "Category 4", src: "Category 4" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-violet-950 h-screen p-5  pt-8 relative duration-300`}
      >
        <BiChevronLeft
      className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 bg-white text-violet-950 text-lg border-violet-950 border-2 rounded-full ${!open && "rotate-180"}`}
      onClick={() => setOpen(!open)}
    />
        <div className="flex gap-x-4 items-center">
          <img
            src={Racoon}
            className='w-16 cursor-pointer duration-500'
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Rakunsoft
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={Racoon} className='w-10' />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold"> Dashboard </h1>
      </div>
    </div>
  );
};

export default Sidebar;