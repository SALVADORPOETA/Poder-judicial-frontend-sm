import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  // No dependas solo del "state" de App, lee el storage directamente aquí
  const isAuth = sessionStorage.getItem('isAuth') === 'true'

  if (!isAuth) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
