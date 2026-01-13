import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'

const TopBar = () => {
  return (
    <div className='w-full bg-[#f23005] text-white'>
        <div className='container mx-auto flex justify-between items-center py-2 px-4 md:px-0 text-xs md:text-sm'>
            <div className='hidden md:flex items-center space-x-4'>
                <a href='#' className='hover:text-gray-300'>
                    <TbBrandMeta className='h-5 w-5'/>
                </a>
                <a href='#' className='hover:text-gray-300'>
                    <IoLogoInstagram className='h-5 w-5'/>
                </a>
                <a href='#' className='hover:text-gray-300'>
                    <RiTwitterXLine className='h-4 w-4'/>
                </a>
            </div>
            <div className='text-sm text-center flex-grow'>
                <span>
                    Fast and reliable delivery all across Srilanka!
                </span>
            </div>
            <div className='text-sm hidden md:block'>
                <a href='tel:+94112233445' className='text-sm hover:text-gray-300'>
                    Call us: +94 11 2233 445
                </a>
            </div>
        </div>
    </div>
  )
}

export default TopBar