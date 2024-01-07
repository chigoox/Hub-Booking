'use client'
import { Button, Input, Modal, message } from "antd";
import { useEffect, useRef, useState } from "react";
export const EmailCapture = () => {

    const [showMailCapture, setShowMailCapture] = useState(false)
    const input = useRef()

    const captureEmail = async () => {
        const inputValue = input.current.input.value
        if (inputValue.includes('@') && inputValue.includes('.') && inputValue.includes('com')) {
            await updateArrayDatabaseItem('META', 'emails', 'all', inputValue)
            localStorage.setItem('caoturedEmail', 'true')

        } else {
            message.error('Enter a valid email.')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('capturedEmail') === 'true') {

        } else {
            setShowMailCapture(true)
        }
    }, [])

    return (
        <Modal
            closeIcon={(<button onClick={() => { setShowMailCapture(false) }} className='border-4 relative bottom-2 rounded-full font-extrabold'>
                x
            </button>)}
            footer={(<div></div>)}
            wrapClassName="bg-balck"
            className="modally z-[999]"
            open={showMailCapture}

        >
            <div className="center h-[35rem] md:w-[35rem] bg-black ">
                <div className="h-full  w-1/2 bg-black">
                    <img className="h-full w-full object-cover" src="images/Snapinsta.app_271911129_494837132285976_605821473298857355_n_1080.jpg" />
                </div>
                <div className="h-full mt-32 w-1/2">
                    <div>
                        <h1 className="text-white text-3xl font-extrabold w-full text-center">Join</h1>
                        <h1 className="text-white text-2xl font-extrabold w-full text-center">Our</h1>
                        <h1 className="text-white text-5xl font-extrabold w-full text-center">mailing list</h1>
                    </div>
                    <div className="center-col p-4 gap-2">
                        <Input ref={input} className="font-extrabold" placeholder="Email" />
                        <Button onClick={captureEmail} className="bg-blue-600 border-none text-white text-2xl font-bold p-2 h-fit">Join Now</Button>
                    </div>

                </div>

            </div>


        </Modal>
    )

}