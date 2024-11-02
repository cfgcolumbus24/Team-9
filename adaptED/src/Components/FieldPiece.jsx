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
        setClassQuantity(Number(event.target.value)); // Ensure the value is a number
    }

    return (
        <>
            <div>
                {/* Input for teacher's name */}
                <input 
                    type="text" 
                    value={name} 
                    onChange={handleNameChange} 
                    placeholder="Teacher Name" 
                />
                <p>Name: {name}</p>

                {/* Input for quantity of classes */}
                <input 
                    type="number" 
                    value={classQuantity} 
                    onChange={handleClassQuantityChange} 
                    placeholder="Number of Classes" 
                />
                <p>Quantity: {classQuantity}</p>

                {/* Render TeacherClassButton components based on the class quantity */}
                <div>
                    {Array.from({ length: classQuantity }, (_, index) => (
                        <TeacherClassButton key={index} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default FieldPiece;
