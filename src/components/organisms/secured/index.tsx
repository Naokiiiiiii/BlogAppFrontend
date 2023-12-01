import { selectIsAuthenticated } from '@reducers/auth/selectors'
import { usersApi } from '@reducers/blogApi/injections/userApi'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState, useAppDispatch, useAppSelector } from 'store'

export const Secured = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.Auth)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  useEffect(() => {
    const fetchData = async () => {
      console.log('実行')
      if (!user) {
        const data = await dispatch(usersApi.endpoints.getUser.initiate({})).unwrap()
        console.log(data)
        // dispatch(setUser(data)); // setUserを適切なアクションに変更
      }
    }
    fetchData()
  }, [dispatch, user])

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
