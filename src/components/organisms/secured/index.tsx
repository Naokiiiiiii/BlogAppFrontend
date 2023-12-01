import { setUser } from '@reducers/auth'
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
        dispatch(setUser(data))
      }
    }
    fetchData()
  }, [dispatch, user])

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
