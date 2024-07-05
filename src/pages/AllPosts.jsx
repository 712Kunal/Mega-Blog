import { useState, React, useEffect } from 'react'
import { Container, PostCard } from '../Components/Index'
import services from '../appwrite/config'
import authservice from '../appwrite/auth';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const FetchUsersPost = async () => {

      try {
        const logedinUser = await authservice.GetCurrentUser();
        const userId = logedinUser.$id;

        const postResponse = await services.GetPosts(userId);
        if (postResponse) {
          setPosts(postResponse.documents);
        }
      } catch (error) {
        console.log("Error in getting the posts of the logedin user:", error.message);
      }
    }

    FetchUsersPost();
  }, [])

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap items-center justify-center z-10 gap-4'>
          {posts.map((post) => (
            <div className='w-96 p-2 z-50 mt-10' key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts