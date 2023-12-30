import React, { useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ClimbingBoxLoader } from 'react-spinners'
import { STORAGE } from '@/Firebase'
const BlogCustomizer = ({ setPostMeta, blogTitle, ShowMetaMenu, toggleNewMeta, data }) => {
  const [saving, setSaving] = useState(false)
  const [postDATA, setPostDATA] = useState({})
  const output = document.getElementById('output')
  const defaultURL = 'https://plus.unsplash.com/premium_photo-1675804669860-9e27f22b0681?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80'

  if (postDATA.thumbnail) {
    output.src = URL.createObjectURL(postDATA.thumbnail)
  } else {
    setTimeout(() => {
      // output.src = 'https://plus.unsplash.com/premium_photo-1675804669860-9e27f22b0681?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80'
    }, 5000);

  }
  const captureData = ({ target }) => {
    setPostDATA(old => {
      return (target.name == 'thumbnail') ? (
        {
          ...old, [target.name]: target.files[0]
        }
      )
        :
        (
          {
            ...old, [target.name]: target.value
          }
        )
    })
  }

  const save = async () => {
    setSaving(true)
    setPostMeta({ ...postDATA, tags: postDATA.tags ? postDATA.tags.split(/[ ,]+/).filter(Boolean) : '' })

    const storageRef = ref(STORAGE, 'images/BlogThumbnails/' + blogTitle);
    if (postDATA.thumbnail) {
      var uploadTask = await uploadBytesResumable(storageRef, postDATA.thumbnail);
      const downloadURL = await getDownloadURL(uploadTask.ref).then((downloadURL) => {
        setPostMeta({ ...postDATA, thumbnail: downloadURL, tags: postDATA.tags ? postDATA.tags.split(' ') : '' })
        return downloadURL
      })
    }

    setSaving(false)
    toggleNewMeta()
  }

  return (
    <div className={`w-fit trans-slow ${ShowMetaMenu ? 'h-80 top-0 opacity-100' : 'h-0 -top-10 opacity-0'} hidescroll bg-gray-700 absolute center flex-col z-[99999]  right-16 md:right-32 mt-24 p-2 rounded-lg text-sm overflow-hidden`}>
      {saving && <div className='absolute z-50 center bg-gray-400 opacity-50 h-full w-full'>
        <ClimbingBoxLoader
          loading={true}
          color='gray'
          size={48}
          className='border rounded-full bg-gray-300'

        />
      </div>}
      <textarea autoFocus={true} defaultValue={data ? data.meta.tags?.toString() : ''} onChange={captureData} placeholder='Tags' name="tags" id="" cols="30" rows="2" maxLength={72} className=' text-black p-2 hidescroll'></textarea>
      <h1 className={'text-center'}>Background Color</h1>
      <input onChange={captureData} name={'bgColor'} type="color" className='w-full h-12 bg-gray-700 rounded-full' />
      <h1 className='text-center'>Text Color</h1>
      <input onChange={captureData} name={'txColor'} type="color" className='w-full h-12 bg-gray-700 rounded-full' />
      <h1 className='text-center'>Thumbnail</h1>
      <label onChange={captureData} onDrop={captureData} className={'w-full center relative border'} htmlFor='upload' name='thumbnail' >
        <input accept='image/*' a type="file" id='upload' onDrop={captureData} className={'opacity-0 top-0 left-0 h-full w-full absolute z-30'} name='thumbnail' />
        <AiOutlineUpload className='z-50' size={48} />
        <img className='w-full h-full object-cover absolute z-10' src="" alt="" id='output' />
      </label>
      <button onClick={save} className='my-2 h-12 w-12 trans-slow hover:scale-105 hover:bg-gray-500 bg-gray-900 rounded-full shadow-black shadow hover:text-red-400'>Save</button>
    </div>
  )
}

export default BlogCustomizer