import React, { useState, createContext, useEffect } from 'react'
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
        console.log(response)
        if (response.status === 200){
          setAuthState({
            token: response.data.token,
            username: response.data.user.username,
            isAuthenticated: true
          })
        }

        //sessionStorage.setItem("name", response.data.name)
        return response
  
      } catch (error) {
        console.error(error)
      }
  
    }
  
    const logout = async () => {
      try {
        const response = await axios.post('http://localhost:3001/logout')
  
        setAuthState({
          token: null,
          username: null,
          isAuthenticated: false
        })
        
        localStorage.removeItem("name")
        localStorage.removeItem("username")
        return response
  
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