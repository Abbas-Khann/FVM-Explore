import React from 'react';
import Image from 'next/image';
import { CustomButton } from './CustomButton';
import logo from "../public/img/logo.png";

const Navbar = (): JSX.Element => {
  return (
        <nav className="flex items-center justify-center px-2 sm:px-4 py-4 bg-black">
        <Image src={logo} width={200} height={180} alt="logo" />
        <div className='flex flex-auto justify-end items-center'>
        <CustomButton />
        </div>
    </nav>
  )
}

export default Navbar