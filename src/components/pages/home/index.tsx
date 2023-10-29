import { FC, useEffect } from 'react'

export const Home: FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/login'
  }

  useEffect(() => {
    // URLから認証コードを取得
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code) {
      // 認証コードをサーバーに送信
      fetch('http://localhost:8080/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      })
        .then((response) => response.json())
        .then((data) => {
          const token = data
          console.log(token)
        })
        .catch((error) => {
          console.log('error', error)
        })
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
