import React, { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { Link } from "react-router-dom";

const FriendsLessons = ({ user }) => {
  const [friendsLessonPlans, setFriendsLessonPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const friendsCarouselRef = useRef(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    const fetchFriendsLessonPlans = async () => {
      try {
        const friendsEmails = user.friends || [];
        const friendsLessonPlans = [];

        for (const email of friendsEmails) {
          const friendDocRef = doc(db, "users", email);
          const friendDoc = await getDoc(friendDocRef);

          if (friendDoc.exists()) {
            const friendData = friendDoc.data();
            if (friendData.lesson_plans) {
              friendsLessonPlans.push({
                friendName: friendData.name || "Unnamed User", // Fallback if name is not available
                lessonPlans: friendData.lesson_plans,
              });
            }
          }
        }

        setFriendsLessonPlans(friendsLessonPlans);
      } catch (error) {
        console.error("Error fetching friends' lesson plans:", error);
        setError("An error occurred while fetching friends' lesson plans.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriendsLessonPlans();
  }, [user]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;

    if (distance > 50) {
      friendsCarouselRef.current.scrollBy({ left: 350, behavior: "smooth" });
    } else if (distance < -50) {
      friendsCarouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollCarousel = (direction) => {
    friendsCarouselRef.current.scrollBy({
      left: direction * 350,
      behavior: "smooth",
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mt-12 mb-6 text-[#ea057e]">
        Friends' Lesson Plans
      </h2>
      {loading ? (
        <p>Loading friends' lesson plans...</p>
      ) : (
        friendsLessonPlans.map((friend, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-lg font-semibold text-[#611171] mb-4">
              {friend.friendName}'s Lesson Plans
            </h3>
            <div className="relative flex justify-center items-center w-full">
              {friend.lessonPlans.length > 1 && (
                <button
                  onClick={() => scrollCarousel(-1)}
                  className="absolute left-0 p-2 bg-[#611171] text-white rounded-full hover:bg-[#4a0f5b] transition"
                >
                  &lt;
                </button>
              )}
              <div
                className={`carousel flex ${
                  friend.lessonPlans.length === 1
                    ? "justify-center"
                    : "justify-start"
                } items-center gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth w-[90%] max-w-[1200px] mx-auto`}
                ref={friendsCarouselRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {friend.lessonPlans.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="min-w-[350px] max-w-[350px] max-h-[600px] flex-shrink-0 snap-center p-5 border rounded-lg shadow-md bg-white mx-3 overflow-hidden"
                  >
                    <Link to={`/lesson/${idx}`} state={{ lesson }}>
                      <h2 className="text-xl font-semibold mb-3 text-blue-500 hover:underline">
                        Lesson Plan {idx + 1}
                      </h2>
                    </Link>
                    <div className="max-h-[500px] overflow-y-auto">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {lesson.content.lessonContent || "No content available"}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
              {friend.lessonPlans.length > 1 && (
                <button
                  onClick={() => scrollCarousel(1)}
                  className="absolute right-0 p-2 bg-[#611171] text-white rounded-full hover:bg-[#4a0f5b] transition"
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendsLessons;
