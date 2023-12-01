import { Box, Button, Typography } from '@mui/material'
import { selectIsAuthenticated } from '@reducers/auth/selectors'
import { useSignInMutation } from '@reducers/blogApi'
import { useAppSelector } from '@store/index'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login: FC = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  console.log(isAuthenticated)
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/login'
  }

  // if (isAuthenticated) {
  //   return <Navigate to="/home" />
  // }

  const [getToken, { error, isLoading }] = useSignInMutation()

  const getTokenAndNavigate = async (code: string) => {
    if (code) {
      await getToken({ code })
      navigate('/home')
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code') ?? ''
    getTokenAndNavigate(code)
  }, [])

  return (
    <Box>
      <Typography>Login</Typography>
      <Button onClick={handleGoogleLogin}>Sign in with Google</Button>
    </Box>
  )
}
