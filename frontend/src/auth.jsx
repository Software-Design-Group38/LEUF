import React, { useState, createContext } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
      token: null,
      username: null,
      isAuthenticated: false,
    })
  
    const login = async (username, password) => {
      try {
        const response = await axios.post('http://localhost:3001/login', {username, password})
  
        setAuthState({
          token: response.data.token,
          username: response.data.username,
          isAuthenticated: true
        })
  
        return response
  
      } catch (error) {
        throw error
      }
  
    }
  
    const logout = async () => {
      try {
        const response = await axios.post('https://optifuel-forecast-server.vercel.app/auth/logout')
  
        setAuthState({
          token: null,
          username: null,
          isAuthenticated: false
        })
  
        return response;
  
      } catch (error) {
        console.log(error.response.data)
        throw error
      }
  
    }
  
    return (
      <AuthContext.Provider value={{ authState, login, logout }}>
        {children}
      </AuthContext.Provider>
    )
  }