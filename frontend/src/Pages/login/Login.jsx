import React, {useState} from 'react'

const Login = () => {
  const [create, setCreate] = useState(false)
  const handleCreate = () => {
    setCreate(!create)
  }

  return (
    <div class="flex justify-center items-center h-screen">
        <div class="w-96 p-6 shadow-lg bg-white rounded-md" >
            <h1 class={create ? "hidden" : "text-center"}>Login</h1>
            <h1 class={create ? "text-center" : "hidden"}>Sign Up</h1>
            <div class="mt-3">
                <label for="username" class="block text-base mb-2">Username</label>
                <input type="text" id="username" class="border w-full" placeholder="Enter Username..."/>
            </div>
            <div class="mt-3">
                <label for="password" class="block text-base mb-2">Password</label>
                <input type="text" id="password" class="border w-full" placeholder="Enter Password..."/>
            </div>
            <div class="mt-5">
                <button type="submit" class={create ? "hidden" : "w-full rounded-md hover:bg-gray-500 hover:text-white"}>Login</button>
                <button type="submit" class={create ? "w-full rounded-md hover:bg-gray-500 hover:text-white" : "hidden"}>Sign up</button>
            </div>
            <div class="mt-5">
                <button onClick={handleCreate} class={create ? "hidden" : "w-full rounded-md hover:bg-gray-500 hover:text-white"}>Don't have an account? Sign up</button>
                <button onClick={handleCreate} class={create ? "w-full rounded-md hover:bg-gray-500 hover:text-white" : "hidden"}>Already have an account? Log in</button>
            </div>
        </div>
    </div>
  )
}

export default Login