import React, { useEffect, useState } from 'react'
import services from "../appwrite/config"
import { Container } from '../Components/Index'
import { useSelector } from 'react-redux'
import {PostCard} from '../Components/Index'

function Home() {
    const [posts, setPosts] = useState()
    const authStatus = useSelector(state => state.Auth.status);
    const authid = useSelector(state => state.Auth.UserData)

    useEffect(() => {
        if (authStatus) {
            services.GetPosts(authid.$id).then((post) => {
                if (post) {
                    setPosts(post.documents)
                }
            })    
        }
    }, [])

    if (!posts || posts.length === 0 || authStatus) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        {authStatus ? ((
                            <div className='p-24 w-full z-40'>
                            <h1 className='text-5xl font-bold text-green-400'>
                                Navigate to Add Posts !!
                            </h1>
                        </div>
                        )) : (<div className='p-24 w-full z-40'>
                            <h1 className='text-5xl font-bold text-green-400'>
                                Login to read posts !!
                            </h1>
                        </div>)}
                    </div>
                </Container>
            </div>
        )
    } else {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard  {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>)
    }
}

export default Home