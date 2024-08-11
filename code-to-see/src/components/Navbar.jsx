import React, { useState } from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="flex justify-around items-center bg-rose-900 text-red-200 py-2 sm:py-0">
            <div className="logo ml-1">
                <span className="font-bold cursor-pointer  bg-rose-950  rounded-md  px-3 py-1 ">MY-ToDo</span>
            </div>
            <div className="sm:hidden">
                <button onClick={toggleMenu} className="focus:outline-none font-bold text-xl">
                    ≡
                </button>
            </div>
            <ul className="hidden sm:flex sm:gap-3 p-2">
                <li className="px-3 py-1 hover:bg-rose-950 hover:rounded-full cursor-pointer">Home</li>
                <li className="px-3 py-1 hover:bg-rose-950 hover:rounded-full cursor-pointer">YourTasks</li>
            </ul>

            {/* Right Slider Menu */}
            <div className={`fixed top-0 right-0 h-full bg-rose-950 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-1000 ease-in-out z-50 w-[90%]`}>
                <div className="flex justify-end p-3">
                    <button onClick={closeMenu} className="focus:outline-none">
                        ✕
                    </button>
                </div>
                <ul className="flex flex-col items-center gap-6 mt-10">
                    <li className="px-3 py-1 hover:bg-rose-950 hover:rounded-full cursor-pointer" onClick={closeMenu}>Home</li>
                    <li className="px-3 py-1 hover:bg-rose-950 hover:rounded-full cursor-pointer" onClick={closeMenu}>YourTasks</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
