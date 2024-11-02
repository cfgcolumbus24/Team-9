import React from 'react';
import ReactMarkdown from 'react-markdown';
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
            <h1 className="text-3xl font-bold mb-6 text-center text-[#ea057e]">Lesson {parseInt(lessonId) + 1}</h1>
            <div className="p-6 border rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-semibold mb-4 text-[#ea057e]">Full Lesson Content</h2>
                <ReactMarkdown className="text-sm text-gray-700">
                    {lesson.content.lessonContent || "No content available"}
                </ReactMarkdown>
            </div>
            <div className="mt-6 text-center">
                <Link to="/lessons" className="text-blue-500 hover:underline">Back to Lesson List</Link>
            </div>
        </div>
    );
};

export default LessonDetail;
