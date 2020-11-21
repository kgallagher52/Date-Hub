import { useEffect } from 'react';
import { useHistory } from "react-router";
import { PrivateRouteProps } from './PrivateRoute';

const PrivateRoute = ({ children, user }: PrivateRouteProps) => {
    const history = useHistory();
    useEffect(() => {
        if (!user?.email) {
            history.push('/dasboard')
        }
    }, [user])
    return children
}

export default PrivateRoute
