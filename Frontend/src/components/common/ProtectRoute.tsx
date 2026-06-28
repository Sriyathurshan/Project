import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"

interface ProtectRouteProps {
    children: ReactNode;
    role?: string;
}

const ProtectRoute = ({children,role}: ProtectRouteProps) => {
    const {user} = useAppSelector((state) => state.auth)

    if (!user || (role && user.role !== role)){
        return <Navigate to ="/login" replace />
    }
  return children
}

export default ProtectRoute
