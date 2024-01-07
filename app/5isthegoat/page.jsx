'use client'
import { useState } from "react"
import Loading from "../Support/Componets/Loading"
import RentalSection from "./Componets/Rentals/RentalSection"
import { Button } from "@nextui-org/react"
import BlogSection from "./Componets/BlogSection"


function page() {
    const menuItem = ['Rentals', 'Blogs']
    const [currentMenu, setCurrentMenu] = useState('Rentals')
    const [loading, setLoading] = useState(false)
    return (
        <div className='min-h-screen w-full  relative  h-screen trans  bg-black'>
            {loading && <Loading />}
            <div className="bg-black ">
                <div className='h-24 mt-14 grid grid-cols-12 text-2xl border-b text-white   w-full font-bold'>
                    {menuItem.map((i, index) => {
                        return (<Button key={index} onPress={() => { setCurrentMenu(currentMenu == i ? false : i) }} className={` w-32 p-2 m-auto col-span-6 center hover:bg-gray-700`}>{i}</Button>)
                    })}
                </div>
            </div>
            {currentMenu == 'Rentals' &&
                <RentalSection />
            }

            {currentMenu == 'Blogs' &&
                <BlogSection />
            }

        </div>
    )
}

export default page