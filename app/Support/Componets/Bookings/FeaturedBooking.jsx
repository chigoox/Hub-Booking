'use client'
import { Rental } from '@/app/classes'
import { Button, Card } from '@nextui-org/react'
import { Modal } from 'antd'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import InfoSection from './InfoSection'
import { BookSection } from './BookSection'
import { fetchInOrder } from '../../MyCodes/Database'


const BOOK = ({ bookItem, index, setOpenBookItem }) => {
    const [currentImg, setCurrentImg] = useState(0)
    return (
        <div key={index} className="m-auto relative fadeInZoom rounded-3xl overflow-hidden  center-col">
            <Button onPress={(e) => { setCurrentImg(o => o == 0 ? bookItem?.images.length - 1 : o - 1) }} className="z-[99] left-10 text-white absolute border-black rounded-full p-6">
                <ArrowLeftCircle />
            </Button>
            <Button onPress={(e) => { setCurrentImg(o => (bookItem?.images.length - 1) == o ? 0 : o + 1) }} className="z-[99] right-10 absolute text-white   border-black rounded-full p-6">
                <ArrowRightCircle />
            </Button>
            <Card isPressable onPress={(e) => setOpenBookItem(bookItem)} className="bg-red-800 relative  h-[90%] w-[90%] sm:h-[85%] sm:w-[85%] overflow-hidden drop-shadow-lg shadow-black  rounded-3xl ">
                <img className="h-full w-full  object-cover aspect-square rounded-3xl " src={bookItem?.images[currentImg]} />
            </Card>
            <div className=" px-2">
                <div className="between w-full text-black  mt-1  ">
                    <h1 className=" font-bold  ">{bookItem?.name}</h1>
                    <h1 className="font-extrabold">${bookItem?.price}</h1>
                </div>
                <h1 className="font-light">{bookItem?.location}</h1>
                <h1 className="font-extralight text-gray-400">{bookItem?.description}</h1>

            </div>
        </div>




    )
}

function FeaturedBooking() {
    const [openBookItem, setOpenBookItem] = useState(false)
    const [startBooking, setStartBooking] = useState(false)
    const toggleStartBooking = () => setStartBooking(!startBooking)
    const [featuredList, setFeaturedList] = useState([])
    const fetchFeaturedList = async () => {
        const list = await fetchInOrder('Rentals', 'ID')
        setFeaturedList(list)
    }

    const imgs = ['https://plus.unsplash.com/premium_photo-1700391373027-e0ba6c3da990?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1698862341365-cf4478f12332?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1682686580922-2e594f8bdaa7?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1682685794304-99d3d07c57d2?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ]


    useEffect(() => {
        fetchFeaturedList()


    }, [])




    const booking = [
        new Rental('Event Space', 999, 'Union, NJ', 'The hub space', [...imgs]),
        new Rental('The Hub', 120, 'Union, NJ', 'The hub space', ['https://images.unsplash.com/photo-1614886205583-92fe9eaa38fb?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?q=80&w=2301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']),
        new Rental('Speakers', 20, 'Union, NJ', 'rental speakers', ['https://images.unsplash.com/photo-1609702847389-b8aec1b0b929?q=80&w=3726&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']),
        new Rental('Other Space', 300, 'Union, NJ', 'the other spce you can rent', ['https://images.unsplash.com/photo-1503721827581-14e4c8676769?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']),
        new Rental('Pianos', 60, 'Union, NJ', 'renatal pianos', ['https://images.unsplash.com/photo-1565879629766-30adf38aac56?q=80&w=2624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1601312378427-822b2b41da35?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']),
    ]

    return (
        <div>
            {openBookItem && <div className="center">
                <Modal
                    closeIcon={(<div className='border-4 relative bottom-2 rounded-full font-extrabold'>
                        <Button onPress={() => { setOpenBookItem(false) }} className={`h-10 w-10 font-bold p-2 text-white hover:  rounded-3xl bg-gray-950 hover:bg-red-900 trans-slow`}>X</Button>
                    </div>)}
                    footer={(<div></div>)}
                    wrapClassName="bg-balck"
                    className="modally z-[999]"
                    open={openBookItem}

                >
                    <h1 className="text-2xl font-bold text-center p-4 bg-black text-white">Booking</h1>
                    {!startBooking && <InfoSection openBookItem={openBookItem} />}
                    {startBooking && <BookSection openBookItem={openBookItem} />}
                    <div className="sticky mb-5  w-full  z-10  gap-4 center">
                        <Button onPress={toggleStartBooking} className={`h-10 w-3/4 font-bold p-2 text-white hover: rounded-3xl trans-slow hover:text-green-200 hover:bg-blue-700 bg-blue-500`}>{startBooking ? 'Back' : 'Start Booking'}</Button>

                    </div>

                </Modal>
            </div>}


            <div id="Booking" className=" gap-4  relative hidescroll py-40 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                <h1 className="text-3xl absolute md:top-14 px-8 font-bold mt-10 w-1/2 -left-2 bg-black text-white -skew-x-12">Featured Booking</h1>
                {featuredList?.map((bookItem, index) => {
                    return (
                        <BOOK
                            key={index}
                            bookItem={bookItem}
                            index={index}
                            setOpenBookItem={setOpenBookItem}
                        />
                    )
                })}
            </div>

        </div>
    )
}

export default FeaturedBooking