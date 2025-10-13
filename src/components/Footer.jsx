import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="mx-auto w-full max-w-screen-xl p-6 lg:py-10">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold text-gray-800">
                                Mern-Blog
                            </span>
                        </a>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                                Resources
                            </h2>
                            <ul className="text-gray-700 font-medium space-y-2">
                                <li>
                                    <a href="https://flowbite.com/" className="hover:text-blue-600">
                                        Flowbite
                                    </a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" className="hover:text-blue-600">
                                        Tailwind CSS
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                                Follow us
                            </h2>
                            <ul className="text-gray-700 font-medium space-y-2">
                                <li>
                                    <a href="https://github.com/" className="hover:text-blue-600">
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a href="https://discord.gg/" className="hover:text-blue-600">
                                        Discord
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                                Legal
                            </h2>
                            <ul className="text-gray-700 font-medium space-y-2">
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Terms & Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-300" />

                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-600">
                        © 2025 <a href="https://flowbite.com/" className="hover:text-blue-600">Flowbite™</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        {["Facebook", "Discord", "Twitter", "GitHub", "Dribbble"].map((icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="text-gray-600 hover:text-blue-600 ms-5 first:ms-0"
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <circle cx="10" cy="10" r="10" />
                                </svg>
                                <span className="sr-only">{icon}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
