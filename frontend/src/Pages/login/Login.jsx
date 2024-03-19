import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  const [create, setCreate] = useState(false)
  const handleCreate = () => {
    setCreate(!create)
  }

  const [show, setShow] = useState(true)
  const handleShowPW = () => {
    setShow(!show)
  } 

  const {register, handleSubmit, formState: {errors} } = useForm()

  const handleLogin = (e) => {
    axios.post('http://localhost:3000/login', {username, password})
    .then(result => {
      console.log(result)
      navigate("/")
    })
    .catch(err => console.log(err))
	}

  const handleRegister = (e) => {
    axios.post('http://localhost:3000/register', {username, password})
    .then(result => {
      console.log(result)
      navigate("/profile")
    })
    .catch(err => console.log(err))
  }

  return (
    <div class="flex justify-center items-center h-screen flex-col bg-gradient-to-b from-[#E4E7E4] to-[#2B475F]">
        {/* Login Popup; create=false*/}
        <h1 class="pb-2">LEÜF</h1>
        <div class={create ? "hidden" : "w-96 p-6 shadow-lg bg-white rounded-md"}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <h2 class="text-center">Login</h2>
            <div class="mt-3">
                <label for="username" class="block text-base font-bold mb-2">Username</label>
                <input type="text" id="username" class="shadow appearance-none border py-2 px-3 rounded w-full" placeholder="Enter Username..." onChange={(data) => setUsername(data.target.value)}
                  {...register('username', {
                    required: "Username is required",
                    minLength: {
                      value: 6,
                      message: 'Username must be at least 6 characters',
                    },
                  })}
                />
                {errors.username && (
                  <p class="text-xs italic text-red-500">{errors.username.message}</p>
                )}
            </div>
            <div class="relative mt-3">
                <label for="password" class="block text-base font-bold mb-2">Password</label>
                <input type={show ? "password" : "text"} id="password" class="shadow appearance-none border py-2 px-3 rounded w-full" placeholder="Enter Password..." onChange={(data) => setPassword(data.target.value)}
                  {...register('password', {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                />
                {errors.password && (
                  <p class="text-xs italic text-red-500">{errors.password.message}</p>
                )}
              {/*}  <div class="absolute bottom-1 right-0 pr-3 flex items-center text-sm">
                  <svg class={show ? "h-8 w-8 text-gray-700" : "hidden"} onClick={handleShowPW} viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />  <circle cx="12" cy="12" r="3" /></svg>
                  <svg class={show ? "hidden" :"h-8 w-8 text-gray-700"} onClick={handleShowPW} viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />  <line x1="1" y1="1" x2="23" y2="23" /></svg>
                </div>*/}
            </div>
            <div class="mt-5">
                <button type="submit" class="shadow appearance-none w-full rounded-md hover:bg-gray-500 hover:text-white">Login</button>
            </div>
          </form>
            <div class="mt-5">
                <button onClick={handleCreate} class="shadow appearance-none w-full rounded-md hover:bg-gray-500 hover:text-white">Don't have an account? Sign up</button>
            </div>
        </div>

        {/* Sign Up Popup; create=true */}
        <div class={create ? "w-96 p-6 shadow-lg bg-white rounded-md" : "hidden"}>
            <h2 class="text-center">Sign Up</h2>
            <div>
              <ul>
                <li class="text-xs mt-4 p-0">Username requirements:</li>
                <li class="list-disc text-xs ml-4 p-0">A minimum of 6 characters</li>
                <li class="text-xs p-0">Password requirements:</li>
                {/*<li class="list-disc text-xs ml-4 p-0">An alphabetic character</li>
                <li class="list-disc text-xs ml-4 p-0">A numeric character</li>*/}
                <li class="list-disc text-xs ml-4 mb-2 p-0">A minimum of 8 characters</li>
              </ul>
            </div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div>
                    <label for="SUusername" class="block text-base font-bold mb-2">Username</label>
                    <input type="text" id="SUusername" class="shadow appearance-none border rounded py-2 px-3 w-full" placeholder="Enter Username..." onChange={(data) => setUsername(data.target.value)}
                      {...register('SUusername', {
                        required: "Username is required",
                        minLength: {
                          value: 6,
                          message: 'Username must be at least 6 characters',
                        },
                      })}
                    />
                    {errors.SUusername && (
                        <p class="text-xs italic text-red-500">{errors.SUusername.message}</p>
                    )}
                </div>
                <div class="mt-3">
                    <label for="SUpassword" class="block text-base font-bold mb-2">Password</label>
                    <input type={show ? "password" : "text"} id="SUpassword" class="shadow appearance-none border rounded py-2 px-3 w-full" placeholder="Enter Password..." onChange={(data) => setPassword(data.target.value)}
                      {...register('SUpassword', {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                      })}
                    />
                    {errors.SUpassword && (
                      <p class="text-xs italic text-red-500">{errors.SUpassword.message}</p>
                    )}
                </div>
                <div class="mt-5">
                    <button type="submit" class="shadow appearance-none w-full rounded-md hover:bg-gray-500 hover:text-white">Sign up</button>
                </div>
                <div class="mt-5">
                    <button onClick={handleCreate} class="shadow appearance-none w-full rounded-md hover:bg-gray-500 hover:text-white">Already have an account? Log in</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login