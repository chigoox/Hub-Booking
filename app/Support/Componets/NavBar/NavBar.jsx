import Link from 'next/link'
import React from 'react'

function NavBar() {
    const navMenu = ['Booking', 'Blog']
    return (
        <div className=' fixed bg-[#0d1821] bg-opacity-25 between z-[99999] px-10 top-0 w-full h-12'>
            <div className='border-4 rounded-full w-12 h-12 center border-dotted'>
                <h1 className="logoTitle text-white font-extrabold">TheHub</h1>
            </div>
            <div className=' evenly text-white gap-4'>
                {navMenu.map(menuItem => (<div className='hover:text-[#28587b] hover:font-extrabold font-bold '>
                    <Link href={`#${menuItem}`}>{menuItem}</Link>
                </div>))}

            </div>

        </div>
    )
}

export default NavBar