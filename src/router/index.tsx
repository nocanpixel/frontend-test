import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import {Home} from "../pages/Home";
import { NotFound404 } from "../pages/404";


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