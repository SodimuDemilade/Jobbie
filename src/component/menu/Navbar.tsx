import {useEffect, useRef, useState} from "react";
import "./Navbar.css";
import DropdownIcon from "../../assets/images/dropdownIcon.svg";
import {RouteConstant} from "@/util/constants/routeConstant.ts";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <a className="navbar-brand" onClick={() => navigate(RouteConstant.dashboard.landing.path)}>
                <i className="fas fa-laptop-code"></i> Jobbie
            </a>
            <div className="container">

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => {
                        const menu = document.getElementById("navbarSupportedContent");
                        if (menu) menu.classList.toggle("show");
                    }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={dropdownRef}>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setDropdownOpen(!dropdownOpen);
                                }}
                            >
                                <i className="fas fa-user"></i> Account
                                <img src={DropdownIcon} alt={"dropdown"}/>
                                {/*<DropdownIcon/>*/}
                            </a>
                            <div
                                className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                            >
                                <a className="dropdown-item"
                                   onClick={() => navigate(RouteConstant.dashboard.applied.path)}>
                                    Applied Jobs
                                </a>
                                <a className="dropdown-item"
                                   onClick={() => navigate(RouteConstant.dashboard.favorite.path)}>
                                    Favourites
                                </a>
                                {/*<a className="dropdown-item" href="manage-account.html">*/}
                                {/*    Manage Account*/}
                                {/*</a>*/}
                                {/*<div className="dropdown-divider"></div>*/}
                                {/*<a className="dropdown-item" href="login.html">*/}
                                {/*    <i className="fas fa-sign-out-alt"></i> Logout*/}
                                {/*</a>*/}
                            </div>
                        </li>

                        <li className="nav-item d-none d-sm-block">
                            <a className="nav-link" href="#">
                                |
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="bootcamps.html">
                                Browse Jobs
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}