import React, {useState} from 'react'
import authservice from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import { login } from '../Features/AuthSlice'
import {Button, Input, Logo} from './Index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function SignUp() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authservice.CreateAccount(data);
            if (userData) {
                const user = await authservice.GetCurrentUser();

                if(user) dispatch(login(user));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center p-6 pt-12">
            <div className={`mx-auto w-full max-w-lg z-10 rounded-xl
                p-10 text-white bg-opacity-5 backdrop-blur-md`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[200px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-white mb-5">
                    Already have an account ?
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline ml-2 text-green-400"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default SignUp