import React from 'react';
import Image from 'next/image';
import { CustomButton } from './CustomButton';
import logo from "../public/img/logo.png";
import Link from 'next/link';

const Navbar = (): JSX.Element => {
  return (
        <nav className="flex items-center justify-center px-2 sm:px-4 py-4 bg-black">
        <Link href={"/"}>
        <Image src={logo} width={200} height={180} alt="logo" />
        </Link>
        <div className='flex flex-auto justify-end items-center'>
        <CustomButton />
        </div>
    </nav>
  )
}

export default Navbar