import type {RouteType} from "../../util/type/route.tsx";
import {RouteConstant} from "@/util/constants/routeConstant.ts";
import {NameEnum} from "@/util/enums/enum.ts";
import Dashboard from "@/view/Dashboard.tsx";
import {JobDetail} from "@/view/JobDetail.tsx";
import {Favorites} from "@/view/Favorites.tsx";
import {Applied} from "@/view/Applied.tsx";

export const dashboardRoute: RouteType[] = [
    {
        path: RouteConstant.dashboard.landing.path,
        name: NameEnum.Dashboard,
        element: <Dashboard/>,
        metadata: {
            isProtected: false,
            hasSideBar: true,
            subtitle: "",
            hasForm: false
        },
    },
    {
        path: RouteConstant.dashboard.jobDetail.path,
        name: NameEnum.JobDetail,
        element: <JobDetail/>,
        metadata: {
            isProtected: false,
            hasSideBar: true,
            subtitle: "",
            hasForm: false
        },
    },
    {
        path: RouteConstant.dashboard.favorite.path,
        name: NameEnum.Favorite,
        element: <Favorites/>,
        metadata: {
            isProtected: false,
            hasSideBar: true,
            subtitle: "",
            hasForm: false
        },
    },
    {
        path: RouteConstant.dashboard.applied.path,
        name: NameEnum.Applied,
        element: <Applied/>,
        metadata: {
            isProtected: false,
            hasSideBar: true,
            subtitle: "",
            hasForm: false
        },
    }
]