'use client'
import InfoSection from '@/app/Support/Componets/Bookings/InfoSection'
import Loading from '@/app/Support/Componets/Loading'
import { Uploader } from '@/app/Support/Componets/Uploader'
import { FetchTheseDocs, addToDoc, deleteDocument, fetchDocument, fetchInOrder, updateDatabaseItem } from '@/app/Support/MyCodes/Database'
import { Button, CardBody, CardFooter, Card as CardNX, Image } from '@nextui-org/react'
import { Button as ButtonANT, Card, Input, Modal, Select, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { PlusSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AiFillCloseSquare, AiFillDelete, AiFillPlusSquare, AiOutlineCloseSquare } from 'react-icons/ai'



export const RentalSection = ({ }) => {

    const [openCreateWindow, setOpenCreateWindow] = useState(false)
    const [openEditWindow, setOpenEditWindow] = useState(false)
    const [rental, setRental] = useState({})
    const [rentalImg, setRentalImg] = useState([])
    const [loading, setLoading] = useState(false)
    const [rentalData, setRentalData] = useState([])
    const [rentalUpdate, setRentalUpdate] = useState(false)
    const [openEditor, setOpenEditor] = useState(false)
    const handleInput = ({ target }) => {
        const { name, value } = target
        setRental(old => {
            return ({ ...old, [name]: value })
        })
    }


    const handleInputUpdate = async ({ target }) => {
        const { name, value } = target
        await updateDatabaseItem('Rentals', `R-${openEditWindow.ID}`, name, name == 'price' ? Number(value) : value)
        setRentalUpdate(!rentalUpdate)
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
        setRentalUpdate(!rentalUpdate);
        setLoading(false)
    }

    const deleteRental = async () => {
        await deleteDocument('Rentals', `R-${openEditWindow.ID}`);
        setRentalUpdate(!rentalUpdate);
        setOpenEditor(false);
        setOpenEditWindow(false)
    }

    useEffect(() => {
        const getData = async () => {
            const data = await fetchInOrder('Rentals', 'ID')
            setRentalData([{ images: ['Thumbnail'], name: 'name', category: 'Category' }, ...data])

            if (openEditWindow) {
                data.forEach(item => {
                    if (item.ID == openEditWindow.ID) setOpenEditWindow((old) => { return ({ ...old, name: item.name, price: item.price, description: item.description }) })
                })

            }

        }


        getData()
    }, [rentalUpdate])

    const [fileList, setFileList] = useState([

    ]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };


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

                    <div className='evenly my-2'>
                        <Input name='name' value={rental?.name} variant={'underlined'} onChange={handleInput} placeholder='rental name' className=' w-80 md:w-96 text-black bg-none' />
                        <Input variant={'underlined'} onBeforeInput={'$'} name='price' type='number' value={rental?.price} onChange={handleInput} placeholder='Price' className=' w-[30%]  text-black' />
                    </div>
                    <Select
                        label="Category"
                        className=" w-full h-auto my-6 text-white  m-auto"
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


                    <Input.TextArea rows={3} value={rental?.caption} onChange={handleInput} name='description' placeholder='Write item description' className='mt-2 w-full text-black' />


                </Card>
                <Button onPress={createNew} className='text-white w-3/4 h-auto font-bold center gap-2 p-4 m-auto mt-4 bg-gray-950'>
                    <PlusSquare />
                    Create new Rental
                </Button>
                <Button onPress={() => { setOpenCreateWindow(false) }} className='text-white w-3/4 h-auto font-bold center gap-2 p-4 m-auto mt-1 mb-4 bg-gray-950'>
                    <AiFillCloseSquare size={24} />
                    Close
                </Button>
            </Modal>

            <Modal
                closeIcon={(<div></div>)}
                footer={(<div></div>)}
                wrapClassName="bg-balck"
                className="modally hidescroll"
                open={openEditWindow}
            >

                {openEditor && <div className='w-full h-[30rem]  top-20 px-20 rounded-2xl bg-black m-auto absolute z-50'>
                    <h1 className='text-white text-center'>Edit Item</h1>
                    <div className='center-col mt-4 gap-4'>
                        <Input defaultValue={openEditWindow?.name} onChange={handleInputUpdate} className='w-72' placeholder='Name' name={'name'} />
                        <Input type='tel' defaultValue={openEditWindow?.price} onChange={handleInputUpdate} className='w-72' placeholder='price' name={'price'} />
                        <Input.TextArea defaultValue={openEditWindow?.description} onChange={handleInputUpdate} className='w-72' placeholder='description' name={'description'} />
                        <div className='grid grid-cols-4 gap-4'>
                            {openEditWindow.images.map((item, index) => {
                                return (
                                    <div className='col-span-1 border-dashed relative border-white border-2 h-14 w-14'>
                                        <Image className='h-full w-full object-cover' src={item} />
                                        <ButtonANT className='absolute z-50 bottom-0 left-0 border-none center bg-black h-8 w-full'>
                                            <AiFillDelete color='red' />
                                        </ButtonANT>


                                    </div>
                                )
                            })}
                            <ButtonANT className='col-span-1 border-dashed relative center border-white border-2 h-14 w-14'>
                                <AiFillPlusSquare color='white' />
                            </ButtonANT>
                            <ImgCrop rotationSlider>
                                <Upload
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {fileList.length < 5 && '+ Upload'}
                                </Upload>
                            </ImgCrop>

                        </div>
                        <div className="center gap-2">
                            <ButtonANT onClick={() => { setOpenEditor(false) }} className='w-32 h-12 border-none bg-white rounded-2xl trans hover:bg-rose-600 text-white font-bold bg-black-800'>close</ButtonANT>
                            <ButtonANT onClick={deleteRental} className='w-32 h-12 border-none rounded-2xl trans hover:bg-rose-600 text-white font-bold bg-rose-800'>Delete</ButtonANT>

                        </div>
                    </div>


                </div>}
                <InfoSection openBookItem={openEditWindow} />
                <div className='w-full center'>
                    {true && //forThis == 'admin' &&
                        <Button onPress={() => { setOpenEditor(true) }} className='h-10 w-1/2 mb-2  bg-white'>
                            <h1>EDIT</h1>
                        </Button>}

                </div>

                <ButtonANT onClick={() => { setOpenEditWindow(false) }} className='text-white text-2xl p-2 w-3/4 h-12 m-auto center'>
                    <AiOutlineCloseSquare />
                    Close
                </ButtonANT>

            </Modal>

            <Button onPress={() => { setOpenCreateWindow(true) }} className='text-white w-full h-auto font-bold center p-4 m-auto bg-gray-950'>
                <PlusSquare />
                Create new Rental
            </Button>

            <div className='items-center justify-center '>
                <div className='grid grid-cols-1   gap-2 p-2 overflow-y-scroll hidescroll  md:w-3/4 h-auto m-auto'>


                    {rentalData.map((rental, index) => {
                        return rental.name == 'name' ?
                            (<div key={index} className='h-12  bg-black-800 rounded-3xl center'>
                                <div className='between gap-8 md:gap-32 w-full'>
                                    <h1 className='text-center text-white w-32'>Thumbnail</h1>
                                    <h1 className='text-center text-white w-32'>{rental.name}</h1>
                                    <h1 className=' text-white text-center w-32'>{rental.category}</h1>
                                </div>


                            </div>)

                            :

                            (
                                <Button onPress={() => { setOpenEditWindow(rental) }} key={index} className='bg-black-800 first:bg-opacity-0  col-span-1 rounded-3xl h-32 overflow-hidden w-full '>
                                    <div className='between  w-auto '>
                                        <CardNX className='bg-black-800  flex-shrink-0 h-32 w-32 rounded-3xl'>
                                            <CardBody className='center h-full'>
                                                {rental.images[0] == 'Thumbnail' ? <h1 className='h-full center text-white'>{rental.images[0]}</h1> : <img className='w-full h-full object-cover' src={rental.images[0]} />}
                                            </CardBody>
                                        </CardNX>
                                        <h1 className='text- text-white w-40'>{rental.name}</h1>
                                        <h1 className='w-40 text-white'>{rental.category}</h1>
                                    </div>

                                </Button>
                            )
                    })}
                </div>
            </div>

        </div >
    )
}

export default RentalSection