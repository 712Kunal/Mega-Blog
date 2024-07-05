import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import parse from "html-react-parser"
import { useSelector } from "react-redux"
import { Button, Container } from "../Components/Index"
import services from '../appwrite/config'

function Posts() {
  const [post, setPost] = useState(null)

  const navigate = useNavigate();
  const { slug } = useParams();

  const userData = useSelector((state) => state.Auth.UserData)
  console.log("user data :",userData);

  const isAuthor = post && userData ? post.userId === userData.UserData.$id : false;
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (slug) {
      services.GetPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/")
        }
      })
    } else {
      navigate("/")
    }

    const getImageUrl = async (fileId) => {
      try {
        const urlImage = await services.GetFilePreview(fileId);
        setImageUrl(urlImage);
      } catch (error) {
        console.log("Resolved image :: error :", error.message);
        setImageUrl(null);
      }
    }

    if (post && post.featuredImage) {
      getImageUrl(post.featuredImage); // Call getImageUrl when post or featuredImage changes
    }
  }, [slug, navigate, post])


  const deletepost = () => {
    services.DeletePost(post.$id).then((status) => {
      if (status) {
        services.DeleteFile(post.featuredImage);
        navigate("/")
      }
    })
  }

  return post ? (
    <div className='py-8'>
      <Container>
        <div className='w-full justify-center mt-10 relative text-white 
        bg-opacity-5 backdrop-blur-md rounded-xl p-2'>
          <img
            src={imageUrl}
            alt={post.title}
            className='rounded-xl'
          />

          <div className='w-full mb-6 z-50'>
            <h1 className='text-2xl text-center font-bold text-white'>{post.title}</h1>
          </div>

          <div className='text-xl z-50'>
             {parse(post.content)} 
          </div>

          {isAuthor && (
            <div className='absolute right-6 top-6b text-white'>
              <Link to={`/edit-post/${post.$id}`} >
                <Button className='bg-green-500 mr-3'>
                  Edit
                </Button>
                <Button className='bg-red-500' onClick={deletepost} >
                  Delete
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null
}

export default Posts