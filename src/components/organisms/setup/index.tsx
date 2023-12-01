import { initialize } from '@reducers/auth'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { RootState, useAppDispatch, useAppSelector } from 'store'

export const Setup = () => {
  const dispatch = useAppDispatch()
  const { initialized } = useAppSelector((state: RootState) => state.Auth)

  // 認証の初期化
  useEffect(() => {
    if (!initialized) {
      dispatch(initialize())
    }
  }, [initialized, dispatch])

  // todo: 初期化時の表示の検討
  return initialized ? <Outlet /> : <></>
}
