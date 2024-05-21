import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const Home = lazy(()=> import('../pages/Home'));
const NotFound404 = lazy(()=> import('../pages/404'));
const Login = lazy(()=> import('../pages/Login'));


const router = createBrowserRouter([
    {
        path:'*',
        element: <NotFound404/>
    },
    {
        path: "/",
        element: <Home/>

    },
    {
        path: "/login",
        element: <Login/>
    }
]);


export default router;