import React from 'react'
import { useState } from "react";
import './sidebar.css'
import Racoon from '../../assets/img/racoon.png';
import { BiChevronLeft } from 'react-icons/bi';
import CategoryPanel from '../CategoryPanel/CategoryPanel';

const Sidebar = () => {

  return (
    <div className='flex h-screen w-64 bg-gray-100 drop-shadow-md'>
      <CategoryPanel />
    </div>
  );
};

export default Sidebar;