'use client'
import { fetchInOrder } from '../../MyCodes/Database'
import { Button, Card, CardFooter, CardHeader, Image } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

function FeaturedBlog() {


    const [featuredList, setFeaturedList] = useState([])

    const fetchFeaturedList = async () => {
        const list = await fetchInOrder('Blogs', 'blogID')
        setFeaturedList(list)
    }
    useEffect(() => {
        fetchFeaturedList()


    }, [])


    return (
        <div>
            <div id="Blog" className="max-w-full first:sm:col-span-4 first:col-span-6 [&>*:nth-child(2)]:col-span-6 [&>*:nth-child(2)]:sm:col-span-4 [&>*:nth-child(3)]:col-span-12 [&>*:nth-child(3)]:sm:col-span-4 [&>*:nth-child(4)]:col-span-12 [&>*:nth-child(4)]:sm:col-span-5 [&>*:nth-child(5)]:col-span-12 [&>*:nth-child(5)]:sm:col-span-7 relative bg-black mt-10 py-20 gap-2 grid grid-cols-12 grid-rows-2 px-8">
                <h1 className="text-3xl absolute   px-8 font-bold  md:w-1/2 -left-2 bg-white text-black z-[9999] -skew-x-12">Featured Blog</h1>

                {featuredList.map((item, index) => {
                    return (
                        <Card id={`featuredGrid${index}`} className="mt-4   md:mt-0 rounded-3xl  h-[300px]">
                            <CardHeader className="absolute z-10 top-1 flex-col px-4 !items-start">
                                <p className="text-tiny text-white/60 uppercase font-bold">{item?.title}</p>
                                <h4 className="text-white font-medium text-large">{item?.description}</h4>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Card background"
                                className="z-50 w-full h-full object-cover"
                                src={item?.meta?.thumbnail}
                            />
                        </Card>
                    )
                })}


            </div>
        </div>
    )
}

export default FeaturedBlog


