import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

const LessonDetail = () => {
    const { lessonId } = useParams();
    const location = useLocation();
    const { lesson } = location.state || {};

    if (!lesson) {
        return <p>No lesson details available.</p>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Lesson {parseInt(lessonId) + 1}</h1>
            <div className="p-6 border rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-semibold mb-4">Full Lesson Content</h2>
                <pre className="text-gray-800 whitespace-pre-wrap">
                    {lesson.content.lessonContent || "No content available"}
                </pre>
            </div>
            <div className="mt-6 text-center">
                <Link to="/lessons" className="text-blue-500 hover:underline">Back to Lesson List</Link>
            </div>
        </div>
    );
};

export default LessonDetail;
