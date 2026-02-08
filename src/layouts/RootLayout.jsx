import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>

            <Navbar></Navbar>

            <div className='w-11/12 mx-auto mt-16'>

                <Outlet></Outlet>

            </div>

            <Footer></Footer>

        </div>
    );
};

export default RootLayout;