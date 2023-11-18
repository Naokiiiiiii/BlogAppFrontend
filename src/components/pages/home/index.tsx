// import { useSignInMutation } from '@reducers/blogApi'
import { FC, useEffect } from 'react'
import { useSignInMutation } from '../../../reducers/blogApi'

export const Home: FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/login'
  }

  // const tokenHandler = new TokenHandler()

  const [signIn, { error, isLoading }] = useSignInMutation()

  const fetchData = async (code: string) => {
    // 認証コードをサーバーに送信
    const result = await signIn({
      code,
    }).unwrap
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
    <div className="App">
      <header className="App-header">
        <h1>Google SSO Integration</h1>
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      </header>
    </div>
  )
}
