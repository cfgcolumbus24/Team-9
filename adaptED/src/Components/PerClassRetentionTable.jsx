import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const students = ["Alice", "Bob", "Charlie", "Daisy", "Ethan"];
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function PerClassRetentionTable() {
    const today = new Date().toLocaleDateString("en-US", { weekday: 'long' });

    const getRandomStatus = (day) => {
        const statuses = ["Understood", "Unsure", "Needs Help"];
        return day === "Friday" ? "?" : statuses[Math.floor(Math.random() * statuses.length)];
    };

    const [understanding, setUnderstanding] = useState(
        students.reduce((acc, student) => {
            acc[student] = {};
            daysOfWeek.forEach(day => {
                acc[student][day] = getRandomStatus(day);
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

    const getStatusColor = (status) => {
        switch (status) {
            case "Understood":
                return "bg-green-200";
            case "Unsure":
                return "bg-yellow-200";
            case "Needs Help":
                return "bg-red-200";
            default:
                return "bg-white";
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#ea057e]">Student Retention Tracker</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="px-4 py-2 font-medium text-left">Student Name</th>
                                {daysOfWeek.map(day => (
                                    <th
                                        key={day}
                                        className={`px-4 py-2 font-medium text-left ${day === today ? "bg-blue-100" : ""}`}
                                    >
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student} className="border-t border-gray-200">
                                    <td className="px-4 py-2 font-medium text-gray-800">{student}</td>
                                    {daysOfWeek.map(day => (
                                        <td
                                            key={day}
                                            className={`px-4 py-2 ${getStatusColor(understanding[student][day])}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{understanding[student][day]}</span>
                                                {day === "Friday" && (
                                                    <button
                                                        onClick={() => openModal(student, day)}
                                                        className="ml-2 px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" role="dialog" aria-modal="true">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Update Understanding for {currentStudent} - {currentDay}
                            </h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => updateUnderstanding("Understood")}
                                    className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                                >
                                    Understood
                                </button>
                                <button
                                    onClick={() => updateUnderstanding("Unsure")}
                                    className="w-full px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition"
                                >
                                    Unsure
                                </button>
                                <button
                                    onClick={() => updateUnderstanding("Needs Help")}
                                    className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                                >
                                    Needs Help
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="w-full mt-4 px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center mt-8">
                    <Link to="/LessonPlanner" className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                        Save and Generate Lesson Plan
                    </Link>
                </div>
            </div>

            <div className="mt-auto mb-32 p-8 text-center bg-purple-300 rounded-lg mx-6">
                <h3 className="text-3xl font-semibold text-purple-800">Today’s Friday</h3>
            </div>
        </div>
    );
}

export default PerClassRetentionTable;
