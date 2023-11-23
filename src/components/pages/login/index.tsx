import { Box, Button, Typography } from '@mui/material'
import { useSignInMutation } from '@reducers/blogApi'
import { FC, useEffect } from 'react'

export const Home: FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/login'
  }

  const [token, { error, isLoading }] = useSignInMutation()

  const fetchData = async (code: string) => {
    // 認証コードをサーバーに送信
    const result = await token({
      code,
    })
    console.log(result)
  }

  useEffect(() => {
    // URLから認証コードを取得
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    if (code) {
      fetchData(code)
    }
  }, [])

  return (
    <Box>
      <Typography>Login</Typography>
      <Button onClick={handleGoogleLogin}>Sign in with Google</Button>
    </Box>
  )
}
