import React, { useState } from 'react';

const students = ["Alice", "Bob", "Charlie", "Daisy", "Ethan"];
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function PerClassRetentionTable() {
    const today = new Date().toLocaleDateString("en-US", { weekday: 'long' });

    // Helper function to generate random default values
    const getRandomStatus = () => {
        const statuses = ["Understood", "Unsure", "Needs Help"];
        return statuses[Math.floor(Math.random() * statuses.length)];
    };

    // Initialize state with varied default values
    const [understanding, setUnderstanding] = useState(
        students.reduce((acc, student) => {
            acc[student] = {};
            daysOfWeek.forEach(day => {
                acc[student][day] = getRandomStatus();
            });
            return acc;
        }, {})
    );

    const [isModalOpen, setModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState("");
    const [currentDay, setCurrentDay] = useState("");

    const openModal = (student, day) => {
        setCurrentStudent(student);
        setCurrentDay(day);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const updateUnderstanding = (status) => {
        setUnderstanding(prev => ({
            ...prev,
            [currentStudent]: {
                ...prev[currentStudent],
                [currentDay]: status,
            }
        }));
        closeModal();
    };

    return (
        <div>
            <h2>Student Retention Tracker</h2>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        {daysOfWeek.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student}>
                            <td>{student}</td>
                            {daysOfWeek.map(day => (
                                <td key={day}>
                                    {understanding[student][day]}
                                    {day === today && (
                                        <button
                                            onClick={() => openModal(student, day)}
                                            className="edit-button"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Update Understanding for {currentStudent} - {currentDay}</h3>
                        <button onClick={() => updateUnderstanding("Understood")}>Understood</button>
                        <button onClick={() => updateUnderstanding("Unsure")}>Unsure</button>
                        <button onClick={() => updateUnderstanding("Needs Help")}>Needs Help</button>
                        <button onClick={closeModal} className="close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PerClassRetentionTable;
