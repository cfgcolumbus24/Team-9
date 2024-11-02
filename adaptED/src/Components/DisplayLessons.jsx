import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';

const DisplayLessons = () => {
    const [lessonPlans, setLessonPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessonPlans = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const lessons = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    console.log("Document data:", data);
                    if (data.lesson_plans) {
                        lessons.push(...data.lesson_plans);
                    }
                });
                setLessonPlans(lessons);
                setLoading(false);
                console.log("Lesson Plans:", lessons);
            } catch (error) {
                console.error("Error fetching lesson plans:", error);
                setLoading(false);
            }
        };

        fetchLessonPlans();
    }, []);

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
                                    {JSON.stringify(lesson, null, 2)}
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
