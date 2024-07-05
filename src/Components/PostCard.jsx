import React, { useState, useEffect } from 'react'
import services from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {

  const [imgSrc, setImgSrc] = useState(null)

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const img = await services.GetFilePreview(featuredImage);
        setImgSrc(img);
      } catch (error) {
        console.log("Fetching Image :: error :", error.message);
      }
    }

    fetchImageUrl();
  }, [featuredImage])


  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full border-[1px] border-[#ccc] text-white
         bg-[#001219] bg-opacity-10 backdrop-blur-md rounded-xl p-4 mt-10 z-10'>

        <div className='w-full justify-center mb-4'>
          <img src={imgSrc} alt={title}
            className='rounded-xl z-10' />
        </div>

        <h2 className='text-xl font-bold'>{title}</h2>

      </div>
    </Link>
  )
}

export default PostCard