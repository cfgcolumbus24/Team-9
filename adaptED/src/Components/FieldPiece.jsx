// Import necessary dependencies and components
import React, { useState } from "react";
import TeacherClassButton from "./TeacherClassButton";


// Functional-based component creation
function FieldPiece() {
    // State variables for name and class quantity
    const [name, setName] = useState("Guest");
    const [classQuantity, setClassQuantity] = useState(0);


    // Function to handle name change
    function handleNameChange(event) {
        setName(event.target.value);
    }


    // Function to handle quantity change
    function handleClassQuantityChange(event) {
        const value = Number(event.target.value);
        if (value >= 0) {
            setClassQuantity(value);
        }
    }


    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
            {/* Input for teacher's name */}
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Teacher Name"
                className="w-full max-w-md px-4 py-2 mb-4 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mb-6 text-lg font-medium text-gray-700">Name: {name}</p>


            {/* Input for quantity of classes */}
            <input
                type="number"
                value={classQuantity}
                onChange={handleClassQuantityChange}
                placeholder="Number of Classes"
                min="0"
                className="w-full max-w-md px-4 py-2 mb-4 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mb-6 text-lg font-medium text-gray-700">Quantity: {classQuantity}</p>


            {/* Render TeacherClassButton components based on the class quantity */}
            <div className="w-full max-w-md grid grid-cols-1 gap-4">
                {Array.from({ length: classQuantity }, (_, index) => (
                    <TeacherClassButton key={index} />
                ))}
            </div>
        </div>
    );
}


export default FieldPiece;


