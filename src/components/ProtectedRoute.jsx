import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const isAuth = sessionStorage.getItem('isAuth') === 'true'
  return isAuth ? children : <Navigate to="/" replace />
}

export default ProtectedRoute
