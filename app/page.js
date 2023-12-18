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
          <div className="lg:text-[200px] text-[90px] text-white center  w-full md:px-5 m-auto z-50 font-extrabold bg-black bg-opacity-50 h-screen">
            <h1 className="z-[9999] relative top-20 md:top-10 ">The Hub</h1>
            <div className="absolute top-12 left-0  px-4  m-auto  h-72 w-full grid grid-cols-12  drop-shadow-xl  gap-4 ">
              <Card className="h-32 w-fit rounded-3xl skew-x-12 m-auto   hover:scale-105 scale-100 trans-slow hover: col-span-4  overflow-hidden ">
                <Image src="https://images.unsplash.com/photo-1702501725284-68647b625bd0?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D" className="h-72 w-full hover:scale-125 scale-105 trans-slow  object-cover" />
              </Card>
              <Card className="h-32 w-fit rounded-3xl m-auto  hover:scale-105 scale-100 trans-slow hover: col-span-4  ">
                <Image src="https://images.unsplash.com/photo-1702499903230-867455db1752?q=80&w=3638&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="h-72 w-full hover:scale-125 scale-105 trans-slow object-cover" />
              </Card>
              <Card className="h-32  w-fit  rounded-3xl m-auto -skew-x-12 hover:scale-195 scale-100 trans-slow hover: col-span-4  ">
                <Image src="https://images.unsplash.com/photo-1701839339832-158736f88c0f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className=" h-72 w-full hover:scale-125 scale-105 trans-slow object-cover" />
              </Card>
              <Card className="h-auto w-fit max-h-60 m-auto rounded-3xl  hover:scale-105 scale-100 trans-slow hover: col-span-12  ">
                <Image src="https://images.unsplash.com/photo-1682685797769-481b48222adf?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="h-full w-full hover:scale-125 scale-105 trans-slow object-cover" />
              </Card>
            </div>
          </div>


        </div>
        <div className=" overflow-hidden h-full w-full">
          <Image className="h-screen  w-screen object-cover" src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

        </div>
      </div>

      <FeaturedBooking />


      <div className="md:h-72  overflow-hidden">
        <iframe frameborder="0" allowfullscreen className=' w-full aspect-video md:h-screen relative  md:bottom-52 '
          src={`https://www.youtube.com/embed/bWxyVF1LJAo?autoplay=1&mute=1&controls=0&loop=1playlist=bWxyVF1LJAo`}>
        </iframe>
      </div>



      <FeaturedBlog />









    </main>
  )
}
