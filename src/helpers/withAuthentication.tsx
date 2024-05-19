import { useNavigate } from "react-router-dom";
import { Cookie } from "../utils/tools";
import { User } from "../types/interfaces";
import { useEffect } from "react";


const cookie = new Cookie();

interface WithAuthenticationProps {
    user: User;
}

export const withAuthentication = (Component: React.ComponentType<WithAuthenticationProps>) => {
    return () => {
        const navigate = useNavigate();
        const isAuthenticated = cookie.auth();
        const user = cookie.user() as User;

        useEffect(()=>{
            if (!isAuthenticated) {
                return navigate('/login');
            }
        },[isAuthenticated, user])

        if(!isAuthenticated)return;
        return <Component user={user} />;
    };
};