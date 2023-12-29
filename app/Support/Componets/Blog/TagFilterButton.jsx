import React from 'react'

const TagFilterButton = ({ setFilter, tag, color, filter }) => {
    return (
        <div onClick={() => setFilter(tag)} className={` cursor-pointer h-8 w-fit rounded-full center ${color ? color : ''} ${filter == tag ? 'bg-gray-900 border-red-300 border-2' : 'bg-gray-700'}`}>
            <h1 className='center p-2'>{tag}</h1>
        </div>
    )
}

export default TagFilterButton