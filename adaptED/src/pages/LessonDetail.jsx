import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation, useParams, Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/config/firebase";

const LessonDetail = () => {
  const { lessonId } = useParams();
  const location = useLocation();
  const { lesson } = location.state || {};

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  if (!lesson) {
    return <p>No lesson details available.</p>;
  }

  const fetchComments = async () => {
    try {
      const friendDocRef = doc(db, "users", friendEmail);
      const friendDoc = await getDoc(friendDocRef);

      if (friendDoc.exists()) {
        const friendData = friendDoc.data();
        const existingComments =
          friendData.lesson_plans[lessonPlanIndex].comments || [];
        setComments(existingComments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  React.useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (comment.trim()) {
      try {
        const friendDocRef = doc(db, "users", friendEmail);
        const friendDoc = await getDoc(friendDocRef);

        if (friendDoc.exists()) {
          const friendData = friendDoc.data();
          const updatedLessonPlans = [...friendData.lesson_plans];
          updatedLessonPlans[lessonPlanIndex].comments.push(comment);

          await updateDoc(friendDocRef, { lesson_plans: updatedLessonPlans });
          console.log("Comment added!");

          setComments([...comments, comment]);
          setComment("");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#ea057e]">
        Lesson {parseInt(lessonId) + 1}
      </h1>
      <div className="p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-[#ea057e]">
          Full Lesson Content
        </h2>
        <ReactMarkdown className="text-sm text-gray-700">
          {lesson.content.lessonContent || "No content available"}
        </ReactMarkdown>
      </div>

      {/* Comment Box */}
      <div className="mt-6 p-4 border rounded-lg shadow-lg bg-white">
        <h3 className="text-xl font-semibold mb-4 text-[#ea057e]">Comments</h3>

        {/* Comment Input */}
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows="4"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-[#ea057e] text-white rounded hover:bg-[#c90465]"
        >
          Submit Comment
        </button>

        {/* Display Comments */}
        <div className="mt-4">
          {comments.length > 0 ? (
            comments.map((cmt, index) => (
              <div key={index} className="p-2 border-b">
                <p className="text-gray-700">{cmt}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link to="/lessons" className="text-blue-500 hover:underline">
          Back to Lesson List
        </Link>
      </div>
    </div>
  );
};

export default LessonDetail;
