import React from 'react';
// import { useNavigate } from 'react-router-dom';

function TeacherClassButton({ className = "Class Name", description = "Brief class description", route = "/class-detail" }) {
    // const navigate = useNavigate();

    // Navigate to the specified route when the card is clicked
    const handleClick = () => {
        // navigate(route);
    };

    return (
        <button 
            onClick={handleClick}
            className="bg-transparent border-none p-0 cursor-pointer text-left w-full">
            <div className="bg-white p-5 rounded-lg shadow-md text-center w-52 m-2">
                <h2 className="text-xl font-bold mb-2">{className}</h2>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </button>
    );
}

export default TeacherClassButton;


