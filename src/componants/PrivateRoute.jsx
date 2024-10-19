import Cookies from 'js-cookie';
import { Outlet, Navigate } from 'react-router-dom';





function PrivateRoute() {
    const adminId = Cookies.get('adminId')
    const role = Cookies.get('role')
 
    return adminId && role === 'admin' ? <Outlet /> : <Navigate to="/LogIn" />
}

export default PrivateRoute
