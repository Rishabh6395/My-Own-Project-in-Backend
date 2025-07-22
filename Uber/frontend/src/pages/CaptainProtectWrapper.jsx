import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const { setCaptain } = useContext(CaptainDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCaptainProfile = async () => {
      if (!token) {
        navigate('/captain-login')
        return
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        if (res.status === 200) {
          const data = res.data
          setCaptain(data) // or `data.captain` if backend wraps it
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error fetching captain profile:', err)
        localStorage.removeItem('token')
        navigate('/captain-login')
      }
    }

    fetchCaptainProfile()
  }, [token, navigate, setCaptain])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return <>{children}</>
}

export default CaptainProtectedWrapper
