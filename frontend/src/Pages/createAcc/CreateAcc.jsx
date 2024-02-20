import React, {useState} from 'react'

const CreateAcc = () => {
  return (
    <div class="flex justify-center items-center h-screen">
        <div class="w-96 p-6 shadow-lg bg-white rounded-md" >
            <h1 class="text-center">Login</h1>
            <div class="mt-3">
                <label for="username" class="block text-base mb-2">Username</label>
                <input type="text" id="username" class="border w-full" placeholder="Enter Username..."/>
            </div>
            <div class="mt-3">
                <label for="password" class="block text-base mb-2">Password</label>
                <input type="text" id="password" class="border w-full" placeholder="Enter Password..."/>
            </div>
            <div class="mt-5">
                <button type="submit" class="w-full rounded-md hover:bg-gray-500 hover:text-white">Login</button>
            </div>
            <div class="mt-5">
                <button class="w-full rounded-md hover:bg-gray-500 hover:text-white">Create Account</button>
            </div>
        </div>
    </div>
  )
}

export default CreateAcc