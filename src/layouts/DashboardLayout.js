import React from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <div className="App">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className='w-full h-full p-3'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout