import { lazy } from "react";
import { RouterInterface } from "../Models/RouterInterface";

const Homepage = lazy(() => import('../Pages/Homepage'))

const Routers: RouterInterface[] = [
    {
        path: '/',
        exact: true,
        component: Homepage
    },
]

export default Routers