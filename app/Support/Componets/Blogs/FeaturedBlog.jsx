'use client'
import { Button, Card, CardFooter, CardHeader, Image } from '@nextui-org/react'
import React from 'react'

function FeaturedBlog() {
    return (
        <div>
            <div id="Blog" className="max-w-full relative bg-black mt-10 py-20 gap-2 grid grid-cols-12 grid-rows-2 px-8">
                <h1 className="text-3xl absolute   px-8 font-bold  md:w-1/2 -left-2 bg-white text-black z-[9999] -skew-x-12">Featured Blog</h1>

                <Card className="col-span-6 mt-4 md:mt-0 rounded-3xl sm:col-span-4 h-[300px]">
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
                <Card className="col-span-6 rounded-3xl sm:col-span-4 h-[300px]">
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
        </div>
    )
}

export default FeaturedBlog