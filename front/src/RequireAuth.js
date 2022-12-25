import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RequireAuth ({ children }) {
  const location = useLocation()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  return userInfo
    ? (
        children
      )
    : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
      )
}
