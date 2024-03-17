import { useBoundStore } from '../store'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const admin = useBoundStore((state) => state.admin)

  return admin ? children : <Navigate to="/login" />
}
