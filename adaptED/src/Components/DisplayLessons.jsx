import React, { useEffect, useState, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './config/firebase';
import { Link } from 'react-router-dom';

const DisplayLessons = () => {
    const [lessonPlans, setLessonPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const carouselRef = useRef(null);
    const touchStartX = useRef(0);

    const userEmail = localStorage.getItem("email");

    useEffect(() => {
        const fetchLessonPlans = async () => {
            if (!userEmail) {
                console.error("No user is signed in");
                setError("No user is signed in");
                setLoading(false);
                return;
            }

            try {
                const userDocRef = doc(db, "users", userEmail);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setLessonPlans(data.lesson_plans || []);
                } else {
                    setError("No lesson plans found for this user.");
                    setLessonPlans([]);
                }
            } catch (error) {
                console.error("Error fetching lesson plans:", error);
                setError("An error occurred while fetching lesson plans.");
            } finally {
                setLoading(false);
            }
        };

        fetchLessonPlans();
    }, [userEmail]);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const distance = touchStartX.current - touchEndX;

        if (distance > 50) {
            carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });
        } else if (distance < -50) {
            carouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
        }
    };

    const scrollCarousel = (direction) => {
        carouselRef.current.scrollBy({ left: direction * 350, behavior: "smooth" });
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#ea057e]">Lesson Plans</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="relative flex justify-center items-center">
            <button onClick={() => scrollCarousel(-1)} className="absolute left-0 p-2 bg-[#611171] text-white rounded-full hover:bg-[#4a0f5b] transition">
              &lt;
            </button>
            <div className="carousel flex justify-center items-center gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth w-[70%] mx-auto" ref={carouselRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              {lessonPlans.length > 0 ? (
                lessonPlans.map((lesson, index) => (
                  <div key={index} className="min-w-[350px] max-w-[350px] max-h-[600px] flex-shrink-0 snap-center p-5 border rounded-lg shadow-md bg-white mx-3 overflow-hidden">
                    <Link to={`/lesson/${index}`} state={{ lesson }}>
                      <h2 className="text-xl font-semibold mb-3 text-blue-500 hover:underline">Lesson Plan {index + 1}</h2>
                    </Link>
                    <div className="max-h-[500px] overflow-y-auto">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {lesson.content.lessonContent || "No content available"}
                      </pre>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#ea057e]">{error || "No lesson plans found."}</p>
              )}
            </div>
            <button onClick={() => scrollCarousel(1)} className="absolute right-0 p-2 bg-[#611171] text-white rounded-full hover:bg-[#4a0f5b] transition">
              &gt;
            </button>
          </div>
        )}
      </div>
    );
    
};

export default DisplayLessons;
