import {ReactNode} from "react";
import '../view/Dashboard.css';
import Navbar from "@/component/menu/Navbar.tsx";

type DashboardLayoutProps = {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export const DashboardLayout = ({children}: DashboardLayoutProps) => {
    return (
        <div className="dashboard">

            <Navbar/>

            {/*<div className="content" style={{flex: 1, border: '1px solid green'}}>*/}
            {children}
            {/*</div>*/}

        </div>
    )
}