'use client'

import { Trash2Icon } from "lucide-react";
import { useRef, useState } from 'react';
import { AiFillEdit, AiOutlineClose, AiOutlineDatabase, AiOutlineEdit } from 'react-icons/ai';
import { ScaleLoader } from 'react-spinners';
import { updateDatabaseItem } from "../../MyCodes/Database";
import BlogCustomizer from './BlogCustomizer';
import dynamic from "next/dynamic";

const Viewer = dynamic(() => import("./ViewerJS.jsx"), { ssr: false })
const BlogViewer = ({ toggleOldBlog, dataMETADATA, data }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [postMeta, setPostMeta] = useState()
    const [savingBlog, SetsavingBlog] = useState(false)
    const postID = data.postID
    const [ShowMetaMenu, setShowMetaMenu] = useState(false)
    const [editBlog, setEditBlog] = useState(false)
    const toggleEdit = () => {
        setEditBlog(!editBlog)
    }
    const toggleNewMeta = () => {
        setShowMetaMenu(!ShowMetaMenu)
    }




    const deleteBlogButton = () => {
        updateDatabaseItem('BlogPage', 'Blogs', postID)
        toggleOldBlog();
    }

    return (
        <div className='absolute hidescroll md:h-[45.5rem] w-full border border-red-900 p-4  bg-black  -top-10 shadow-black shadow rounded-lg overflow-hidden overflow-y-scroll z-[99999]'>
            <BlogCustomizer setPostMeta={setPostMeta} blogTitle={blogTitle} ShowMetaMenu={ShowMetaMenu} toggleNewMeta={toggleNewMeta} data={data} />
            <div className='center absolute w-fit  z-50 my-4  md:gap-4 top-0 text-black '>
                <button onClick={toggleOldBlog} className=' p-2 rounded-full'><AiOutlineClose color='red' size={32} /></button>
                {editBlog && <button onClick={deleteBlogButton} className=' p-2 rounded-full'><Trash2Icon color='red' size={32} /></button>}



            </div>
            <div className='w-full  center flex-col'>
                <div className='center flex-col w-full  gap-2'>
                    {!editBlog && <h1 className="h-12 text-3xl font-bold">{data.title}</h1>}
                    {editBlog && <input
                        className={'h-12 w-[40%] m-auto text-black text-2xl p-2'}
                        onChange={({ target }) => { setBlogTitle(target.value) }}
                        type="text"
                        placeholder='Title'
                        id={'title'}
                        defaultValue={data.title}
                    />}
                    <div className='h-2 w-12 center '>
                        <ScaleLoader
                            loading={savingBlog}
                            color='green'
                            size={8}
                            className=''

                        />

                    </div>


                </div>
                <Viewer editBlog={editBlog} data={data} SetsavingBlog={SetsavingBlog} postMeta={postMeta} />
            </div>
            <div className='center absolute w-fit  z-50 my-4 right-12  md:gap-4 top-0 text-black '>
                {editBlog && <button onClick={toggleNewMeta} className=' p-2 rounded-full'><AiOutlineDatabase color='red' size={32} /></button>}
                <button onClick={toggleEdit} className=' p-2 rounded-full'>
                    {
                        !editBlog ? <AiOutlineEdit color='red' size={32} /> :
                            <AiFillEdit color='blue' size={32} />
                    }
                </button>



            </div>


        </div>
    )
}


export default BlogViewer






