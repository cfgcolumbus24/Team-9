import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-white text-lg font-bold">adaptED</h1>
                <div className="flex space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
