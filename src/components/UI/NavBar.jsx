import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Tag = ({ color, icon, label }) => {
    const colors = {
        orange: "bg-orange-50 text-orange-800",
        blue: "bg-blue-50 text-blue-700",
        green: "bg-green-50 text-green-800",
    };

    return (
        <div
            className={`flex items-center gap-2 px-2 py-1 rounded-full font-medium text-xs ${colors[color]} hover:brightness-105 transition`}
        >
            {icon}
            <span>{label}</span>
        </div>
    );
};

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false); // state cho mobile menu
    const { token } = React.useContext(AuthContext);
    const { user } = React.useContext(AuthContext);
    const { logout } = React.useContext(AuthContext);
    const handleCheckout = () => {
        logout();
    }
    return (
        <header className="relative w-full bg-white shadow">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between py-3">
                {/* Brand + Mobile button */}
                <div className="flex items-center justify-between">
                    <NavLink
                        to="/"
                        className="flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
                    >
                        Mern-Blog
                    </NavLink>

                    {/* Mobile menu button */}
                    <div className="sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
                        >
                            <span className="sr-only">Toggle navigation</span>
                            {/* icon hamburger */}
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Menu + Tags */}
                <div
                    className={`sm:flex flex-1 items-center justify-between transition-all duration-300 ${isOpen ? "block" : "hidden"
                        }`}
                >
                    {/* Tags bên trái */}
                    <div className="flex items-center gap-2 ml-4 mb-2 sm:mb-0 flex-wrap">
                        <a href="http://localhost:5173/" target="_blank"
                            rel="noopener noreferrer">
                            <Tag color="orange" label="Shop" icon={<ShopIcon />} />
                        </a>
                        <a href="https://github.com/hiucdh/MERN-BLOG" target="_blank"
                            rel="noopener noreferrer">
                            <Tag color="blue" label="Github" icon={<GithubIcon />} />
                        </a>
                        <a href="https://docs.google.com/document/d/14XG5hkCbMcPIzjoPYbhmRXOHIBSmLQE7_FkAvmZNYMw/edit?usp=sharing" target="_blank"
                            rel="noopener noreferrer">
                            <Tag color="green" label="Docs" icon={<DocsIcon />} />
                        </a>

                    </div>

                    {/* Menu links bên phải */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        <NavLink
                            to="/post-create"
                            className={({ isActive }) =>
                                `font-medium ${isActive ? "text-blue-600" : "text-gray-800 hover:text-gray-600"}`
                            }
                        >
                            Viết Bài
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `font-medium ${isActive ? "text-blue-600" : "text-gray-800 hover:text-gray-600"}`
                            }
                        >
                            Giới Thiệu
                        </NavLink>
                        {token ? (
                            <NavLink
                                to="#"
                                className={({ isActive }) =>
                                    `font-medium ${isActive ? "text-blue-600" : "text-gray-800 hover:text-gray-600"}`
                                }
                            >
                                Xin chào {user?.username}
                            </NavLink>
                        ) : (
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `font-medium ${isActive ? "text-blue-600" : "text-gray-800 hover:text-gray-600"}`
                                }
                            >
                                Đăng ký
                            </NavLink>
                        )}
                        {token && (<NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `font-medium ${isActive ? "text-blue-600" : "text-gray-800 hover:text-gray-600"}`
                            }
                        >
                            Hồ Sơ
                        </NavLink>)}
                        {token ? (<NavLink onClick={handleCheckout} to="#"
                            className={({ isActive }) =>
                                `font-medium cursor-pointer ${isActive
                                    ? "text-gray-800 hover:text-gray-600"
                                    : "text-gray-800 hover:text-gray-600"
                                }`
                            }>Đăng Xuất</NavLink>) : (<NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `font-medium ${isActive ? "text-blue-600" : "text-gray-800 hover:text-gray-600"}`
                                }
                            >
                                Đăng Nhập
                            </NavLink>)}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;

// Thay thế icon SVG đúng chỗ
const ShopIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19M7 13L5.4 5M9 21a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
);

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM2 20h20M2 20c0-4 4-8 10-8s10 4 10 8M2 20h20" />
    </svg>
);

const DocsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v9a2 2 0 01-2 2z" />
    </svg>
);
