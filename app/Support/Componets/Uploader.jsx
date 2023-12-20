import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from "react";
import { AiFillMoneyCollect, AiOutlinePlusSquare, AiOutlineQuestion } from "react-icons/ai";

import { Button, Skeleton, Textarea } from '@nextui-org/react';
import { Image, Text, Video } from 'lucide-react';
import { BsBagPlusFill } from "react-icons/bs";
import Loading from './Loading';
import { useUploader } from '../MyCodes/useUploader';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const Uploader = ({ setter, folderName, limit, setPostType, post, inCricle, forthis, submitPost, handleCaption, setForProduct, setterArray }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [fileListURL, setFileListURL] = useState([])
    const handleCancel = () => setPreviewOpen(false);
    const [showPreview, setShowPreview] = useState([])
    const [FileType, setFileType] = useState('')
    const [loading, setLoading] = useState(false)

    const postType = ['Video', 'Image', 'Text', 'Product']
    const [selectedPostType, setSelectedPostType] = useState('Image')



    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = async ({ file, fileList }) => {
        setLoading(true)
        if (file.status === 'done') {
            setFileType(file.type)
            const fileURL = await useUploader(file.originFileObj, folderName)
            if (fileURL) setFileListURL(old => [...old, fileURL])
            //setterArray(old => { return ({ ...old, img: [...old?.img, { url: fileURL }] }) })

        } else if (file.status === 'error') {
            file.status = 'done'
            setter(old => { return ({ ...old, postType: file.type }) })
            setFileType(file.type)
            const fileURL = await useUploader(file.originFileObj, folderName)



            if (fileURL) setFileListURL(old => [...old, fileURL])
        }


        setLoading(false)


        setFileList(fileList)



    }

    useEffect(() => {
        fileListURL.reverse()
        fileList.reverse()
        // setter(old => { return ({ ...old, post: { img: fileListURL } }) })
    }, [])

    useEffect(() => {
        //setter(old => { return ({ ...old, img: { img: fileListURL } }) })

    }, [fileList, fileListURL])


    useEffect(() => {
        if (selectedPostType == 'Product') {
            if (setForProduct) setForProduct(postType)
        } else {
            if (setForProduct) setForProduct(false)
        }
    }, [selectedPostType])


    useEffect(() => {

        setFileType(fileList[0]?.type)
        if (setPostType) setPostType(fileList[0]?.type)
        setShowPreview(fileListURL.map((item, index) => {
            setterArray(old => { return ({ ...old, img: (old.img) ? (!old.img.includes(item) ? [...old.img, item] : [...old.img]) : [item] }) })

            return ({ url: item, type: fileList[index].type })


        }))



    }, [fileList, fileListURL, post])


    const uploadButton = (
        <div>
            <div className='center overflow-hidden relative mt-12 border-4 rounded-full w-24 h-24 bg-black-800 hover:bg-black hover:scale-[1.1] trans-slow  border-dotted p-4'>
                <AiOutlinePlusSquare color='white' size={24} />
                <div className=' text-white'>
                    Upload
                </div>

            </div>

        </div>
    );

    const checkFileType = (file) => { return file?.type.includes('video') ? false : true }




    return (
        <div className=' flex flex-col  text-black items-center '>
            {loading && <Loading lable='uploading' />}
            <div className='relative w-full center '>

                <ImgCrop beforeCrop={checkFileType} showGrid showReset rotationSlider
                    modalClassName={`text-black z-[999999999] `}
                    fillColor='black'
                    modalOk={'OK'}
                    modalTitle='Crop post'
                    cropShape={inCricle ? 'round' : 'rect'}


                >
                    <Upload
                        className='relative center h-24 w-12 '
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        fileList={fileList}
                        showUploadList={false}
                        onPreview={''}
                        onChange={handleChange}
                        accept="image/*"
                        maxCount={8}




                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </ImgCrop>

            </div>



            <div className={`${showPreview?.length >= 8 ? ' mt-24 ' : 'mt-10'} grid grid-cols-4 gap-2 trans z-50 overflow-y-scroll hidescroll`}>
                {showPreview?.map((img, index) => {
                    return (
                        <div key={index} className={`${showPreview.length >= 8 ? ' first-line:mt-20' : selectedPostType == 'Product' ? 'rounded-3xl h-20 w-20' : 'rounded-3xl w-20 h-20'}    text-white  `}>
                            <Skeleton className='w-full border-2 h-full' isLoaded={showPreview}>
                                {img?.type?.includes('video') && <video autoPlay muted playsInline loop className='w-full  object-cover' src={img.url} alt="" />}
                                {img?.type?.includes('image') && <img className='w-full  object-cover' src={img.url} alt="" />}

                            </Skeleton>
                        </div>
                    )
                })}
            </div>







        </div>
    );
};