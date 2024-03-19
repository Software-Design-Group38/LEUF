import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const [create, setCreate] = useState(false)
  const handleCreate = () => {
    setCreate(!create)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/login', {username, password})
    .then(result => {
      console.log(result)
      navigate("/")
    })
    .catch(err => console.log(err))
	}

  const handleRegister = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/register', {username, password})
    .then(result => {
      console.log(result)
      navigate("/profile")
    })
    .catch(err => console.log(err))
  }

  const handleH = (e) => {
    e.preventDefault()
    console.log(username + " " + password)
  }

  return (
    <div class="flex justify-center items-center h-screen flex-col bg-gradient-to-b from-[#E4E7E4] to-[#2B475F]">
        {/* Login Popup; create=false*/}
        <h1 class="pb-2">LEÜF</h1>
        <div class={create ? "hidden" : "w-96 p-6 shadow-lg bg-white rounded-md"}>
          <form onSubmit={handleLogin}>
            <h2 class="text-center">Login</h2>
            <div class="mt-3">
                <label for="username" class="block text-base font-bold mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  class="shadow appearance-none border py-2 px-3 rounded w-full"
                  minLength={4}
                  maxLength={20}
                  required
                  placeholder="Enter Username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div class="relative mt-3">
                <label for="password" class="block text-base font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  class="shadow appearance-none border py-2 px-3 rounded w-full"
                  minLength={8}
                  maxLength={30}
                  required
                  placeholder="Enter Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                <li class="list-disc text-xs ml-4 p-0">A minimum of 4 characters</li>
                <li class="text-xs p-0">Password requirements:</li>
                {/*<li class="list-disc text-xs ml-4 p-0">An alphabetic character</li>
                <li class="list-disc text-xs ml-4 p-0">A numeric character</li>*/}
                <li class="list-disc text-xs ml-4 mb-2 p-0">A minimum of 8 characters</li>
              </ul>
            </div>
            <form onSubmit={handleRegister}>
                <div>
                    <label for="SUusername" class="block text-base font-bold mb-2">Username</label>
                    <input
                      type="text"
                      id="SUusername"
                      class="shadow appearance-none border rounded py-2 px-3 w-full"
                      minLength={4}
                      maxLength={20}
                      required
                      placeholder="Enter Username..."
                      value={username}
                      onChange={(data) => setUsername(data.target.value)}
                    />
                </div>
                <div class="mt-3">
                    <label for="SUpassword" class="block text-base font-bold mb-2">Password</label>
                    <input
                      type="password"
                      id="SUpassword"
                      class="shadow appearance-none border rounded py-2 px-3 w-full"
                      minLength={8}
                      maxLength={30}
                      required
                      placeholder="Enter Password..."
                      value={password}
                      onChange={(data) => setPassword(data.target.value)}
                    />
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