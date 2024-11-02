import React from 'react';
// import { useNavigate } from 'react-router-dom';

function TeacherClassButton({ className = "Class Name", description = "Brief class description", route = "/class-detail" }) {
    // const navigate = useNavigate();

    // Navigate to the specified route when the card is clicked
    const handleClick = () => {
        // navigate(route);
    };

<<<<<<< HEAD
=======
    const styles = {
        button: {
            backgroundColor: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            textAlign: "left",
            width: "100%",
        },
        card: {
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "200px",
            margin: "10px",
        },
        profileTitle: {
            fontSize: "1.2em",
            fontWeight: "bold",
            margin: "10px 0",
        },
        profileDescription: {
            fontSize: "0.9em",
            color: "#666",
        },
    };

>>>>>>> fa4db219090792dd82acfdc6055acfcc73142309
    return (
        <button 
            onClick={handleClick}
            className="bg-transparent border-none p-0 cursor-pointer text-left w-full"
        >
            <div className="bg-white p-5 rounded-lg shadow-md text-center w-52 m-2">
                <h2 className="text-xl font-bold mb-2">{className}</h2>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </button>
    );
}

export default TeacherClassButton;

