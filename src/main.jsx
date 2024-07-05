import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import  store  from './Store/Store.js'



import Home from './pages/Home.jsx'
import {AuthProtected,Login} from './Components/Index.js'
import SignUpPage from './pages/SignUpPage.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Posts from './pages/Posts.jsx'

const router=createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
        path: "/",
        element: <Home />
        },
        {
          path: "/login",
          element: (
            <AuthProtected authentication={false}>
              <Login />
            </AuthProtected>
          )
        },
        {
          path: "/signup",
          element: (
            <AuthProtected authentication={false}>
              <SignUpPage />
            </AuthProtected>
          )
        },
        {
          path: "/all-posts",
          element: (
            <AuthProtected authentication>
               {" "}
               <AllPosts />
            </AuthProtected>
          )
        },
        {
          path: "/add-posts",
          element: (
            <AuthProtected authentication>
              {" "}
              <AddPost />
            </AuthProtected>
          )
        },
        {
          path: "/edit-post/:slug",
          element: (
            <AuthProtected authentication>
              {" "}
              <EditPost />
            </AuthProtected>
          )
        },
        {
          path: "/post/:slug",
          element: <Posts />
        }
      ]
    }
]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
