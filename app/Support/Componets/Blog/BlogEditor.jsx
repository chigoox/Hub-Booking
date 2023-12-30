'use client'
import dynamic from "next/dynamic";
import { useState } from 'react';
import { AiFillSave, AiOutlineClose, AiOutlineDatabase } from 'react-icons/ai';
import { ScaleLoader } from 'react-spinners';
import { fetchDocument, updateDatabaseItem } from "../../MyCodes/Database";
import BlogCustomizer from './BlogCustomizer';

const Editor = dynamic(() => import("./EditorJS.jsx"), { ssr: false })

const BlogEditor = ({ toggleNewBlog, data }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [postMeta, setPostMeta] = useState({})
    const [savingBlog, SetsavingBlog] = useState(false)
    const [ShowMetaMenu, setShowMetaMenu] = useState(false)
    const toggleNewMeta = () => {
        setShowMetaMenu(!ShowMetaMenu)
    }








    const saveBlogButton = async () => {
        const { blogID } = await fetchDocument('META', 'blogs')
        updateDatabaseItem('META', 'blogs', 'blogID', blogID + 1)
        toggleNewBlog()
    }

    return (
        <div className='absolute hidescroll md:h-[45.5rem] w-full border border-white p-4  bg-white  -top-10 shadow-black shadow rounded-lg overflow-hidden overflow-y-scroll z-[99999]'>
            <BlogCustomizer setPostMeta={setPostMeta} blogTitle={blogTitle} ShowMetaMenu={ShowMetaMenu} toggleNewMeta={toggleNewMeta} />
            <div className='center absolute w-fit  z-50 my-4  md:gap-4 top-0 text-black '>
                <button onClick={toggleNewBlog} className=' p-2 rounded-full'><AiOutlineClose color='red' size={32} /></button>
                {blogTitle && <button onClick={saveBlogButton} className=' p-2 rounded-full'><AiFillSave color='red' size={32} /></button>}



            </div>
            <div className='w-full editorJs  center flex-col'>
                <div className='center flex-col w-full  gap-2'>
                    <input
                        className={'h-12 w-[40%] m-auto text-black text-2xl p-2'}
                        onChange={({ target }) => { setBlogTitle(target.value) }}
                        type="text"
                        placeholder='Title'
                        id={'title'}
                    />
                    <div className='h-2 w-12 center '>
                        <ScaleLoader
                            loading={savingBlog}
                            color='green'
                            size={8}
                            className=''

                        />

                    </div>


                </div>
                <Editor data={data} postMeta={postMeta} SetsavingBlog={SetsavingBlog} />
            </div>
            <div className='center absolute w-fit  z-50 my-4 right-12  md:gap-4 top-0 text-black '>
                <button onClick={toggleNewMeta} className=' p-2 rounded-full'><AiOutlineDatabase color='red' size={32} /></button>



            </div>


        </div>
    )
}


export default BlogEditor






