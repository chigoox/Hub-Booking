import React from 'react'
import EmblaCarouselThumb from '../Carousel/CarouselThumb'
import { Button } from 'antd'

function InfoSection({ openBookItem, forThis }) {
    const slides = ['https://plus.unsplash.com/premium_photo-1700391373027-e0ba6c3da990?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1698862341365-cf4478f12332?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1682686580922-2e594f8bdaa7?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1682685794304-99d3d07c57d2?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',]

    return (
        <div className=' overflow-hidden  m-auto   w-96 md:w-[40rem]'>
            <EmblaCarouselThumb
                slides={openBookItem?.images}


            />
            <div className=' px-5 md:px-[20%]  text-[#1c1a1a]'>
                <div className='between '>
                    <h1 className='text-4xl font-bold'>{openBookItem?.name}</h1>
                    <h1 className='text-lg font-light'>{openBookItem?.location}</h1>
                </div>
                <h1 className='text-2xl  '>${openBookItem?.price}</h1>

                <h1 className='mt-4'>description</h1>
                <h1 className='font-lg mb-4'>{openBookItem?.description}</h1>


            </div>

        </div>
    )
}

export default InfoSection