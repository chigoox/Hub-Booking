'use client'
import { BookSection } from "./Support/Componets/Bookings/BookSection";
import { createArray } from "./Support/MyCodes/Util";
import { Carousel, Modal } from "antd";
import EmblaCarousel from "./Support/Componets/Carousel/Carousel";
import { useState } from "react";
import { ArrowLeftCircle, ArrowRightCircle, Heading1, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import InfoSection from "./Support/Componets/Bookings/InfoSection";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

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

      <div className="between h-screen  relative overflow-hidden">
        <div className="h-screen w-screen absolute top-0 center">
          <h1 className="md:text-[200px] text-[100px] text-white  stroke-rose-800 stroke-2 drop-shadow-[0_5.2px_1.2px_rgba(0,0,0,0.8)] px-5 m-auto z-50 font-extrabold">The Hub</h1>


        </div>
        <div className=" overflow-hidden h-full w-full">
          <Image className="h-screen  w-screen object-cover" src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

        </div>
      </div>

      {openBookItem && <div className="center">
        <Modal
          closeIcon={(<div></div>)}
          footer={(<div></div>)}
          wrapClassName="bg-balck"
          className="modally "
          open={openBookItem}

        >
          <h1 className="text-2xl font-bold text-center p-4 bg-black text-white">Booking</h1>
          {!startBooking && <InfoSection />}
          {startBooking && <BookSection />}
          <div className="sticky bottom-5 w-full my-10 z-10 mb-3 gap-4 center">
            <Button onPress={toggleStartBooking} className={`h-10 w-28 font-bold p-2 text-white hover: rounded-3xl trans-slow hover:text-green-200 hover:bg-blue-700 bg-blue-500`}>{startBooking ? 'Back' : 'Start Booking'}</Button>
            <Button onPress={() => { setOpenBookItem(false) }} className={`h-10 w-28 font-bold p-2 text-white hover:  rounded-3xl bg-gray-950 hover:bg-red-900 trans-slow`}>Close</Button>
          </div>

        </Modal>
      </div>}


      <div id="Booking" className=" gap-4 mt-10 relative hidescroll py-20 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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


      <div className="h-72 bg-black">
        <video src={'https://v.ftcdn.net/04/84/34/49/700_F_484344958_ko8I1Rh9sEHv2KVkNLg1vLK1IlxuaOIU_ST.mp4'} className="w-full aspect-video h-full object-cover" loop autoplay="true" />
      </div>



      <div id="Blog" className="max-w-full bg-black mt-8 py-20 gap-2 grid grid-cols-12 grid-rows-2 px-8">
        <Card className="col-span-12 rounded-3xl sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col px-4 !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
            <h4 className="text-white font-medium text-large">Stream the Acme event</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1702234893452-52302797f873?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </Card>
        <Card className="col-span-12 rounded-3xl sm:col-span-4 h-[300px]">
          <CardHeader className="absolute px-4 z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Plant a tree</p>
            <h4 className="text-white font-medium text-large">Contribute to the planet</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1687710306899-10a3bfcacf9b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </Card>
        <Card className="col-span-12 rounded-3xl sm:col-span-4 h-[300px]">
          <CardHeader className="absolute px-4 z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Supercharged</p>
            <h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1702221422565-60f734cd90b1?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </Card>
        <Card isFooterBlurred className="w-full h-[300px] rounded-3xl col-span-12 sm:col-span-5">
          <CardHeader className="absolute z-10 px-4 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">New</p>
            <h4 className="text-black font-medium text-2xl">Acme camera</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            src="https://images.unsplash.com/photo-1701986789743-62603f3cc027?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <CardFooter className="absolute px-4 bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              <p className="text-black text-tiny">Available soon.</p>
              <p className="text-black text-tiny">Get notified.</p>
            </div>
            <Button className="text-tiny" color="primary" radius="full" size="sm">
              Notify Me
            </Button>
          </CardFooter>
        </Card>
        <Card isFooterBlurred className="w-full rounded-3xl h-[300px] col-span-12 sm:col-span-7">
          <CardHeader className="absolute z-10 top-1 px-4 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
            <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1702055894943-1f4012fbd991?q=80&w=3333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <CardFooter className="absolute px-4 bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Breathing app icon"
                className="rounded-full w-10 h-11 bg-black"
                src="https://images.unsplash.com/photo-1702221422565-60f734cd90b1?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">Breathing App</p>
                <p className="text-tiny text-white/60">Get a good night's sleep.</p>
              </div>
            </div>
            <Button radius="full" size="sm">Get App</Button>
          </CardFooter>
        </Card>
      </div>









    </main>
  )
}
