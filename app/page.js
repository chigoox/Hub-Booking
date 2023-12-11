'use client'
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { BookSection } from "./Support/Componets/Bookings/BookSection";
import { createArray } from "./Support/MyCodes/Util";
import { Carousel } from "antd";
import EmblaCarousel from "./Support/Componets/Carousel/Carousel";
import { useState } from "react";


export default function Home() {
  return (
    <main className="min-h-screen w-full  h-screen trans  bg-white">
      <div className=" gap-4 mt-10  w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {createArray(4).map(i => {
          const [openBookItem, setOpenBookItem] = useState(false)
          return (
            <div className="m-auto center-col border-4">
              <Button onPress={() => setOpenBookItem(!openBookItem)} className="bg-white   h-[90%] w-[90%] sm:h-[85%] sm:w-[85%] overflow-hidden drop-shadow-lg center-col shadow-black rounded-3xl ">
                <EmblaCarousel
                  img1={'https://plus.unsplash.com/premium_photo-1700391373027-e0ba6c3da990?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                  img2={'https://images.unsplash.com/photo-1698862341365-cf4478f12332?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                  img3={'https://images.unsplash.com/photo-1682686580922-2e594f8bdaa7?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                  img4={'https://images.unsplash.com/photo-1682685794304-99d3d07c57d2?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                />
              </Button>
              <div className="between text-black px-8  w-full ">
                <h1 className=" font-bold ">EventSpace</h1>
                <h1 className="font-bold">$999</h1>
              </div>

              <BookSection openBookItem={openBookItem} setOpenBookItem={setOpenBookItem} />
            </div>

          )
        })}

      </div>











    </main>
  )
}
