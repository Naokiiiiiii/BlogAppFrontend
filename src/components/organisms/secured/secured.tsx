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
    if (!user) {
      dispatch(usersApi.endpoints.getUser.initiate({}))
        .unwrap()
        .then((data) => console.log(data) /*dispatch(setUser(data))*/)
        .catch((error) => {
          console.error(error)
        })
    }
  })

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
