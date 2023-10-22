import { FC, useEffect } from "react";

export const Home: FC = () => {

  // const googleClientID = process.env.GOOGLE_CLIANT_ID
  // console.log(googleClientID)

  const responseGoogle = async () => {
    const formResponse = await fetch("http://localhost:8080/login", {
      method: "POST",
    });
    console.log(formResponse)
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/login";
  };

  const handleLoginCallback = async () => {
    const response = await fetch("http://localhost:3000/auth/google/callback?code=YOUR_AUTH_CODE");
    const data = await response.json();
    console.log(data)
  };

  useEffect(() => {
    // URLから認証コードを取得
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // 認証コードをサーバーに送信
      fetch('http://localhost:8080/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      })
        .then(response => response.json())
        .then(data => {
          const token = data;
          console.log(data)
          // 取得したトークンを使ってアプリの状態を更新したり、ユーザーをログイン状態にしたりします
        })
        .catch(error => {
          // エラーハンドリング
        });
    }
  }, []); // 最初の1回だけ実行

  return (
    <div className="App">
      <header className="App-header">
        <h1>Google SSO Integration</h1>
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      </header>
    </div>
  );
}