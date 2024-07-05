import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom'
import services from "../appwrite/config"
import {Container} from '../Components/Index'
import { PostForm } from '../Components/Index'

function EditPost() {
    const [post, setPost] = useState([])
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            services.GetPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }else{
                    navigate('/')
                }
            })
        }
    }, [])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost