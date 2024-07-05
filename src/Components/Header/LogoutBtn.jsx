import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../Features/AuthSlice'


function LogoutBtn() {
    const dispatch = useDispatch();

    const logouthandler = () => {
        authservice.Logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button className='inline-block text-red-300 font-medium px-6 py-2 duration-200 hover:shadow-md
                         hover:shadow-cyan-500 rounded-full'
            onClick={logouthandler}>
            Logout
        </button>
    )
}

export default LogoutBtn