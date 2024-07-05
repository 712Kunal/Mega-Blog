import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authlogin } from '../Features/AuthSlice'
import { Button, Logo, Input } from './Index'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authservice.Login(data);
            if (session) {
                const userData = await authservice.GetCurrentUser();
                if (userData) {
                    dispatch(authlogin(userData));
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className='flex items-center justify-center w-full p-16 pt-28'>
            <div className={`mx-auto w-full max-w-lg bg-[#001219] z-10 rounded-xl p-10
                text-white bg-opacity-5 backdrop-blur-md`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[200px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign in to your Account 
                </h2>
                <p className='mt text-center text-white text-base text-black/60'>
                    Dont have an Account ?
                    <Link
                        to="/signup"
                        className='font-medium text-primary ml-2 text-green-400 transition-all duration-200
                        hover:underline'>
                        Sign Up
                    </Link>
                </p>

                {error && <p className='text-red-500 text-center'>{error}</p>}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>

                        <Input
                            label="Email :"
                            placeholder="Enter your Email........"
                            type="email"
                            {...register("email", {
                                required: "true",
                                validate: {
                                    matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.
                                        test(value) ||
                                        "Email address must be a valid address"
                                }
                            })}
                        />

                        <Input
                            label="Password :"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "true",
                                validate: {
                                    matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.
                                        test(value) ||
                                        "Password must be valid"
                                }
                            })}
                        />

                        <Button
                            type='submit'
                            className='w-full text-xl'
                        >Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login