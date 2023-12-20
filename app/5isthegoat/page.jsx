'use client'
import { useState } from "react"
import Loading from "../Support/Componets/Loading"
import RentalSection from "./Componets/Rentals/RentalSection"
import { Button } from "@nextui-org/react"


function page() {
    const menuItem = ['Rentals', 'blogs']
    const [currentMenu, setCurrentMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    return (
        <div className='min-h-screen w-full   relative  h-screen trans  bg-black'>
            {loading && <Loading />}
            <div className='h-24  grid grid-cols-12 text-2xl border-b text-white   w-full font-bold'>
                {menuItem.map(i => {
                    return (<Button onPress={() => { setCurrentMenu(currentMenu == i ? false : i) }} className={` w-32 p-2 m-auto col-span-6 center hover:bg-gray-700`}>{i}</Button>)
                })}
            </div>
            {currentMenu == 'Rentals' &&
                <RentalSection />
            }

            {currentMenu == 'Blogs' &&
                <div>
                </div>
            }

        </div>
    )
}

export default page