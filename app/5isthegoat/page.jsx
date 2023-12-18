import React from 'react'

function page() {
    const menuItem = ['Rentals', 'blogs']
    return (
        <div className='min-h-screen w-full   relative  h-screen trans  bg-black'>
            <div className='h-24  grid grid-cols-12 text-2xl border-b text-white   w-full font-bold'>
                {menuItem.map(i => {
                    return (<div className={` w-32 p-2 m-auto col-span-6 center hover:bg-gray-700`}>{i}</div>)
                })}
            </div>

        </div>
    )
}

export default page