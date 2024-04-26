import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Input, Button, Typography } from "@material-tailwind/react"
import { AuthContext } from '../../auth'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [create, setCreate] = useState(false)
  const [showPW, setShowPW] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleCreate = () => {
    setCreate(!create)
    setUsername("")
    setPassword("")
    setErrorMessage("")
  }

  const handleShowPW = () => {
    setShowPW(!showPW)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/register', { username, password })
      localStorage.setItem('username', username)
      navigate('/profile')
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message){
        setErrorMessage("Username is already registered")
      } else {
        setErrorMessage("Internal server error. Please try again.")
        console.error(err)
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(username, password)
      localStorage.setItem('username', username)
      navigate('/')
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setErrorMessage("User is not registered")
      } else if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage("Username or password is incorrect")
      } else {
        setErrorMessage("Internal server error. Please try again.")
        console.error(err)
      }
    }
  }
  

  return (
    <div className="flex justify-center items-center h-screen flex-col bg-gradient-to-b from-[#E4E7E4] to-[#2B475F]">
      <Typography variant="h1" className="text-center text-blue-600">LE<span className="text-white">Ü</span>F</Typography>
      <div className={"w-96 p-6 shadow-lg bg-white rounded-md"}>
        <form onSubmit={create ? handleRegister : handleLogin}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h3" color="blue-gray" className="text-center">{create ? "Sign Up" : "Login"}</Typography>
            <div>
              <Input
                type="text"
                size="lg"
                variant="outlined"
                label="Username"
                id="username"
                minLength={4}
                maxLength={20}
                required
                placeholder="Enter Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Input
                type={showPW ? "password" : "text"}
                size="lg"
                variant="outlined"
                id="password"
                label="Password"
                minLength={8}
                maxLength={30}
                required
                placeholder="Enter Password..."
                icon={<i className={`fa-solid fa-eye${showPW ? "-slash" : ""} cursor-pointer`} onClick={handleShowPW} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              fullWidth
            >{create ? "Sign up" : "Log in"}</Button>
          </div>
        </form>
        {errorMessage && (
          <div className="mt-3 text-red-600">{errorMessage}</div>
        )}
        <div className="mt-5">
          <Typography color="gray" className="mt-4 text-center font-normal">
            {create ? (
              <>
                Already have an account?{" "}
                <span
                  className="font-medium text-blue-600 cursor-pointer"
                  onClick={handleCreate}
                >
                  Log In
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  className="font-medium text-blue-600 cursor-pointer"
                  onClick={handleCreate}
                >
                  Sign Up
                </span>
              </>
            )}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Login
