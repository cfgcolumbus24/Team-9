import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './config/firebase';

const DisplayLessons = () => {
    const [lessonPlans, setLessonPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    // Retrieve the signed-in user's email from localStorage (set during sign-in)
    const userEmail = localStorage.getItem("email");

    useEffect(() => {
        const fetchLessonPlans = async () => {
            if (!userEmail) {
                console.error("No user is signed in");
                setLoading(false);
                return;
            }

            try {
                // Reference to the specific user document
                const userDocRef = doc(db, "users", userEmail);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setLessonPlans(data.lesson_plans || []); // Set lesson_plans or an empty array if not found
                    console.log("Fetched lesson plans:", data.lesson_plans);
                } else {
                    console.log("No such document for the user");
                    setLessonPlans([]);
                }
            } catch (error) {
                console.error("Error fetching lesson plans:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLessonPlans();
    }, [userEmail]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Lesson Plans</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {lessonPlans.length > 0 ? (
                        lessonPlans.map((lesson, index) => (
                            <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
                                <h2 className="text-lg font-semibold mb-2">Lesson Plan {index + 1}</h2>
                                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {lesson.content.lessonContent || "No content available"}
                                </pre>
                            </div>
                        ))
                    ) : (
                        <p>No lesson plans found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DisplayLessons;
