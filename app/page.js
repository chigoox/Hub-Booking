'use client'
import { Card, CardBody, Image } from "@nextui-org/react";
import { BookSection } from "./Support/Componets/Bookings/BookSection";
import { createArray } from "./Support/MyCodes/Util";
import { Carousel, Modal } from "antd";
import EmblaCarousel from "./Support/Componets/Carousel/Carousel";
import { useState } from "react";
import { ArrowLeftCircle, ArrowRightCircle, Heading1, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { Button } from "@nextui-org/react"
import InfoSection from "./Support/Componets/Bookings/InfoSection";

const imgs = ['https://plus.unsplash.com/premium_photo-1700391373027-e0ba6c3da990?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1698862341365-cf4478f12332?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1682686580922-2e594f8bdaa7?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1682685794304-99d3d07c57d2?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',]


const Rentals = {
  name: 'name of item',
  price: 'price/hr',
  location: 'where item/event is located',
  description: 'about the item or space',
  images: [] //array of urls

}





export default function Home() {
  const [openBookItem, setOpenBookItem] = useState(false)
  const [startBooking, setStartBooking] = useState(false)
  const toggleStartBooking = () => setStartBooking(!startBooking)
  return (
    <main className="min-h-screen w-full  relative  h-screen trans  bg-white">

      <Modal
        title={(<h1 className="text-white font-bold">Booking</h1>)}
        centered
        wrapClassName="bg-balck"
        className="modally "
        open={openBookItem}
        onOk={() => setModal2Open(false)}
        onCancel={() => setOpenBookItem(false)}
      >
        <div className="sticky w-full top-16 z-10 mb-3 center">
          <Button onClick={toggleStartBooking} className={`h-12 w-32 font-bold text-lg text-white hover: rounded-3xl bg-blue-500`}>{startBooking ? 'Back' : 'Start Booking'}</Button>
        </div>
        {!startBooking && <InfoSection />}
        {startBooking && <BookSection />}

      </Modal>


      <div className=" gap-4 mt-10 relative hidescroll  w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {createArray(4).map(i => {
          const [currentImg, setCurrentImg] = useState(0)
          return (
            <div className="m-auto relative fadeInZoom rounded-3xl overflow-hidden  center-col">
              <Button onPress={(e) => { setCurrentImg(o => o == 0 ? imgs.length - 1 : o - 1) }} className="z-[99] left-10 text-white absolute border-black rounded-full p-6">
                <ArrowLeftCircle />
              </Button>
              <Button onPress={(e) => { setCurrentImg(o => (imgs.length - 1) == o ? 0 : o + 1) }} className="z-[99] right-10 absolute text-white   border-black rounded-full p-6">
                <ArrowRightCircle />
              </Button>
              <Card isPressable onPress={(e) => setOpenBookItem(!openBookItem)} className="bg-red-800 relative  h-[90%] w-[90%] sm:h-[85%] sm:w-[85%] overflow-hidden drop-shadow-lg shadow-black  rounded-3xl ">
                <img className="h-full w-full  object-cover aspect-square rounded-3xl " src={imgs[currentImg]} />
              </Card>
              <div className=" px-2">
                <div className="between w-full text-black  mt-1  ">
                  <h1 className=" font-bold  ">EventSpace</h1>
                  <h1 className="font-extrabold">$999</h1>
                </div>
                <h1 className="font-light">Union, NJ</h1>
                <h1 className="font-extralight text-gray-400">something about the item or location</h1>

              </div>
            </div>




          )
        })}




      </div>











    </main>
  )
}
