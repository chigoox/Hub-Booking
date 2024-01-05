import { Card, Image } from "@nextui-org/react";
import FeaturedBlog from "./Support/Componets/Blogs/FeaturedBlog";
import FeaturedBooking from "./Support/Componets/Bookings/FeaturedBooking";
import { fetchDocument, updateDatabaseItem } from "./Support/MyCodes/Database";






export default function Home() {

  const successBook = async () => {

    await fetchDocument('Admin', 'onHold', 'setAdminadminReservation')

    updateDatabaseItem('Admin', 'onHold', 'uid')
    updateDatabaseItem('Users', 'uid', 'willBook')

  }
  const canceledBook = () => {
    if (false) {
      updateDatabaseItem('Admin', 'onHold', 'uid')
      updateDatabaseItem('Users', 'uid', 'willBook')
    }

  }


  return (
    <main className="min-h-screen w-full  relative  h-screen trans  bg-white">

      <div className="between h-screen  relative overflow-hidden ">
        <div className="h-screen w-screen absolute top-0 center  ">
          <div className="lg:text-[100px] text-[90px] text-white center  w-full md:px-5 m-auto z-50 font-extrabold bg-black bg-opacity-50 h-screen">
            <div className="absolute top-12 left-0  px-4  m-auto  h-72 w-full grid grid-cols-12  drop-shadow-xl  gap-4 ">
              <Card className="h-[50rem] md:h-[40rem] overflow-hidden relative drop-shadow-md  w-fit   m-auto rounded-3xl  hover:scale-105 scale-100 trans-slow hover: col-span-12  ">
                <h1 className="z-[9999] absolute bottom-0 m-auto  w-full  text-center ">The Hub</h1>
                <video playsInline autoPlay loop muted src={'/Videos/hub.mp4'} className="h-full w-full relative hover:scale-125 scale-105 trans-slow object-fit" />
              </Card>
            </div>
          </div>


        </div>
        <div className=" overflow-hidden h-full w-full ">
          <img className="h-screen  w-screen object-cover" src={'/images/Snapinsta.app_280264102_680528433021794_5502388592054343133_n_1080.jpg'} />

        </div>
      </div>

      <FeaturedBooking />


      <div className="md:h-72 w-full border overflow-hidden">
        <video className="w-full" playsInline autoPlay loop muted src={'/Videos/vid1.mp4'} />
      </div>



      <FeaturedBlog />


      <div className="grid grid-cols-12 w-full  overflow-hidden">

        <div className="h-fit  col-span-3 m-auto overflow-hidden">
          <div className="h-fit w-screen  overflow-hidden">
            <video className="w-full" playsInline autoPlay loop muted src={'/Videos/vid2.mp4'} />
          </div>
        </div>

        <div className="h-fit m-auto col-span-1 overflow-hidden">
          <div className="h-fit w-screen  overflow-hidden">
            <video className="w-full relative right-[14rem]" playsInline autoPlay loop muted src={'/Videos/vid2.mp4'} />
          </div>
        </div>

        <div className="h-fit m-auto  col-span-3 overflow-hidden">
          <div className="h-fit w-screen  overflow-hidden">
            <video className="w-full relative right-[14rem]" playsInline autoPlay loop muted src={'/Videos/vid2.mp4'} />
          </div>
        </div>

        <div className="h-fit m-auto  col-span-1 overflow-hidden">
          <div className="h-fit w-screen  overflow-hidden">
            <video className="w-full relative right-[14rem]" playsInline autoPlay loop muted src={'/Videos/vid2.mp4'} />
          </div>
        </div>

        <div className="h-fit m-auto col-span-3 relative  overflow-hidden">
          <div className="h-fit w-screen  overflow-hidden">
            <video className="w-full relative right-[36rem]" playsInline autoPlay loop muted src={'/Videos/vid2.mp4'} />
          </div>
        </div>
      </div>







    </main>
  )
}
