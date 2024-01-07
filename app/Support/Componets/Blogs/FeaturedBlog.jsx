'use client'
import { Button, Card, CardHeader } from '@nextui-org/react'
import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { fetchInOrder } from '../../MyCodes/Database'
import BlogViewerFrontEND from '../Blog/BlogViewerFrontEND'

function FeaturedBlog() {


    const [featuredList, setFeaturedList] = useState([])
    const [openBlog, setOpenBlog] = useState(false)

    const fetchFeaturedList = async () => {
        const list = await fetchInOrder('Blogs', 'blogID')
        setFeaturedList(list)
    }
    useEffect(() => {
        fetchFeaturedList()


    }, [])





    return (
        <div>


            {openBlog && <div className="center">
                <Modal
                    closeIcon={(<div className='border-4 relative bottom-2 rounded-full font-extrabold'>
                        <Button onPress={() => { setOpenBlog(false) }} className={`h-10 w-10 font-bold p-2 text-white hover:  rounded-3xl bg-gray-950 hover:bg-red-900 trans-slow`}>X</Button>
                    </div>)}
                    footer={(<div></div>)}
                    wrapClassName="bg-balck"
                    className="modally z-[999]"
                    open={openBlog}

                >
                    <div className='h-auto w-auto'>
                        <h1 className="text-2xl font-bold text-center p-4 bg-black text-white">Blogs</h1>
                        {/*  <BlogViewerFrontEND data={openBlog} /> */}
                    </div>
                </Modal>
            </div>}

            <div id="Blog" className="max-w-full first:sm:col-span-4 first:col-span-6 [&>*:nth-child(2)]:col-span-6 [&>*:nth-child(2)]:sm:col-span-4 [&>*:nth-child(3)]:col-span-12 [&>*:nth-child(3)]:sm:col-span-4 [&>*:nth-child(4)]:col-span-12 [&>*:nth-child(4)]:sm:col-span-5 [&>*:nth-child(5)]:col-span-12 [&>*:nth-child(5)]:sm:col-span-7 relative bg-black mt-10 py-20 gap-2 grid grid-cols-12 grid-rows-2 px-8">
                <h1 className="text-3xl absolute   px-8 font-extrabold  md:w-1/2 -left-2 bg-white text-black z-[999] -skew-x-12">Featured Blog</h1>

                {featuredList.map((item, index) => {

                    return (
                        <Card isPressable onPress={() => {
                            setOpenBlog({
                                ...item
                            })
                        }} id={`featuredGrid${index}`} className="mt-4   border md:mt-0 rounded-3xl  h-[300px]">
                            <CardHeader className="absolute z-20 h-20 overflow-  bg-black bg-opacity-20  flex-col  px-4 !items-start">
                                <p className="text-tiny text-white uppercase text-4xl font-bold">{(item?.title.length >= 13) ? item?.title.slice(0, 9) : item?.title}{(item?.title.length >= 13) ? '...' : ''}</p>
                                <h4 className="text-black font-medium text-large text-2xl">{item?.description}</h4>
                            </CardHeader>
                            <img
                                alt="Card background"
                                className="z-10 w-full h-full object-cover"
                                src={item?.meta?.thumbnail || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                            />
                        </Card>
                    )
                })}


            </div>
        </div>
    )
}

export default FeaturedBlog


