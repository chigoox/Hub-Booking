'use client'
import Loading from '@/app/Support/Componets/Loading'
import { Uploader } from '@/app/Support/Componets/Uploader'
import { FetchTheseDocs, addToDoc, fetchDocument, fetchInOrder, updateDatabaseItem } from '@/app/Support/MyCodes/Database'
import { Button } from '@nextui-org/react'
import { Card, Input, Modal, Select } from 'antd'
import { PlusSquare } from 'lucide-react'
import { useEffect, useState } from 'react'


export const RentalSection = ({ }) => {

    const [openCreateWindow, setOpenCreateWindow] = useState(false)
    const [rental, setRental] = useState({})
    const [rentalImg, setRentalImg] = useState([])
    const [loading, setLoading] = useState(false)
    const [rentalData, setRentalData] = useState([])
    const handleInput = ({ target }) => {
        const { name, value } = target
        setRental(old => {
            return ({ ...old, [name]: value })
        })
    }

    useEffect(() => {
        if (rentalImg?.img) setRental(old => { return ({ ...old, images: [...rentalImg?.img] }) })


    }, [rentalImg])


    const createNew = async () => {
        setLoading(true)
        try {
            const { rentalID } = await fetchDocument('META', 'rentals')
            await addToDoc('Rentals', `R-${rentalID}`, { ...rental, ID: rentalID })
            await updateDatabaseItem('META', 'rentals', 'rentalID', rentalID + 1)
            setOpenCreateWindow(false)
        } catch (error) {
            console.log(error.message)

        }

        setLoading(false)
    }

    useEffect(() => {
        const getData = async () => {
            const data = await fetchInOrder('Rentals', 'ID')
            setRentalData(data)
        }


        getData()
    }, [])



    return (

        <div className='h-auto  w-full '>
            <Modal
                closeIcon={(<div></div>)}
                footer={(<div></div>)}
                wrapClassName="bg-balck"
                className="modally "
                open={openCreateWindow}
            >

                <Card className='h-auto w-full md:w-96 bg-black-800 border-none'>
                    {loading && <Loading />}

                    <h1 className="text-white font-bold text-2xl text-center">New</h1>

                    <Uploader setter={setRental} setterArray={setRentalImg} folderName={'Posts'} />

                    <Input name='name' value={rental?.name} variant={'underlined'} onChange={handleInput} placeholder='rental name' className='mt-14 w-80 text-white bg-none' />
                    <div className='evenly my-2'>
                        <Input variant={'underlined'} onBeforeInput={'$'} name='price' type='number' value={rental?.price} onChange={handleInput} placeholder='Price' className=' w-[30%]  text-black' />
                    </div>
                    <Select
                        label="Category"
                        className="w-full h-auto my-6 text-white  m-auto"
                        name={'category'}
                        onChange={(i) => { handleInput({ target: { name: 'category', value: i } }) }}
                        options={['Space', 'Equipment'].map(i => {
                            return (
                                {
                                    value: i,
                                    label: i,
                                }
                            )
                        })}
                    />


                    <Input.TextArea rows={3} value={rental?.caption} onChange={handleInput} name='description' placeholder='Write item description' className='mt-2 w-80 text-black' />


                </Card>
                <Button onPress={createNew} className='text-white w-3/4 h-auto font-bold center gap-2 p-4 m-auto mt-4 bg-gray-950'>
                    <PlusSquare />
                    Create new Rental
                </Button>
            </Modal>

            <Button onPress={() => { setOpenCreateWindow(true) }} className='text-white w-full h-auto font-bold center p-4 m-auto bg-gray-950'>
                <PlusSquare />
                Create new Rental
            </Button>

        </div>
    )
}

export default RentalSection