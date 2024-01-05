'use client'

import { Trash2Icon } from "lucide-react";
import { useRef, useState } from 'react';
import { AiFillEdit, AiOutlineClose, AiOutlineDatabase, AiOutlineEdit } from 'react-icons/ai';
import { ScaleLoader } from 'react-spinners';
import { deleteDocument, updateDatabaseItem } from "../../MyCodes/Database";
import BlogCustomizer from './BlogCustomizer';
import dynamic from "next/dynamic";

const Viewer = dynamic(() => import("./ViewerJS.jsx"), { ssr: false })
const BlogViewerFrontEND = ({ toggleOldBlog, dataMETADATA, data }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [postMeta, setPostMeta] = useState()
    const [savingBlog, SetsavingBlog] = useState(false)
    const blogID = data?.blogID
    const [ShowMetaMenu, setShowMetaMenu] = useState(false)
    const [editBlog, setEditBlog] = useState(false)








    return (
        <div className='hidescroll h-fit w-auto border border-red-900 bg-black  shadow-black shadow rounded-lg overflow-hidden overflow-y-scroll z-[99999]'>


            <Viewer editBlog={editBlog} data={data} SetsavingBlog={SetsavingBlog} postMeta={postMeta} />




        </div>



    )
}


export default BlogViewerFrontEND






