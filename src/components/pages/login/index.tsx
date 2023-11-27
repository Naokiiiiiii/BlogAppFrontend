import { Box, Button, Typography } from '@mui/material'
import { selectIsAuthenticated } from '@reducers/auth/selectors'
import { useSignInMutation } from '@reducers/blogApi'
import { useAppSelector } from '@store/index'
import { FC, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export const Login: FC = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  console.log(isAuthenticated)
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/login'
  }

  if (isAuthenticated) {
    return <Navigate to="/home" />
  }

  const [getToken, { error, isLoading }] = useSignInMutation()

  const fetchData = async (code: string) => {
    await getToken({ code })
  }

  useEffect(() => {
    // URLから認証コードを取得
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    if (code) {
      fetchData(code)
      navigate('/home')
    }
  }, [])

  return (
    <Box>
      <Typography>Login</Typography>
      <Button onClick={handleGoogleLogin}>Sign in with Google</Button>
    </Box>
  )
}
