import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

type NavbarProps = {
    mode: 'auth' | 'unauth';
};

export default function Navbar({ mode = 'unauth' }: NavbarProps) {
    const [click, setClick] = useState(false);
    const signOut = useSignOut()
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


    if (mode === 'auth') {
        return (
            <>
                <IconContext.Provider value={{ color: "#fff" }}>
                    <nav className="navbar">
                        <div className="navbar-container container">
                            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                                Movie<span>About</span>
                            </Link>
                            <div className="menu-icon" onClick={handleClick}>
                                {click ? <FaTimes color="#000" /> : <FaBars color="#000" />}
                            </div>
                            <ul className={click ? "nav-menu active" : "nav-menu"}>
                                <li className="nav-item">
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            "nav-links" + (isActive ? " activated" : "")
                                        }
                                        onClick={closeMobileMenu}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/history"
                                        className={({ isActive }) =>
                                            "nav-links" + (isActive ? " activated" : "")
                                        }
                                        onClick={closeMobileMenu}
                                    >
                                        History
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/AddPost"
                                        className={({ isActive }) =>
                                            "nav-links" + (isActive ? " activated" : "")
                                        }
                                        onClick={closeMobileMenu}
                                    >
                                        Add Post
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/posts"
                                        className={({ isActive }) =>
                                            "nav-links" + (isActive ? " activated" : "")
                                        }
                                        onClick={closeMobileMenu}
                                    >
                                        Posts
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            "nav-links" + (isActive ? " activated" : "")
                                        }
                                        onClick={() => {
                                            closeMobileMenu();
                                            signOut();
                                        }}
                                    >
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </IconContext.Provider>
            </>
        );
    } else {
        return (
            <>
                <IconContext.Provider value={{ color: "#fff" }}>
                    <nav className="navbar">
                        <div className="navbar-container container">
                            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                                Movie<span>About</span>
                            </Link>
                            <div className="menu-icon" onClick={handleClick}>
                                {click ? <FaTimes color="#000" /> : <FaBars color="#000" />}
                            </div>
                            <ul className={click ? "nav-menu active" : "nav-menu"}>
                                <li className="nav-item">
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            "nav-links" + (isActive ? " activated" : "")
                                        }
                                        onClick={closeMobileMenu}
                                    >
                                        Sign In
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/register"
                                        className={({ isActive }) =>
                                            "nav-links" + (isActive ? " activated" : "")
                                        }
                                        onClick={closeMobileMenu}
                                    >
                                        Sign Up
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </IconContext.Provider>
            </>
        );
    }
}

