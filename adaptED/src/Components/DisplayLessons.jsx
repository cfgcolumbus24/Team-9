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
        <h1 className="text-2xl font-bold mb-4 text-center">Lesson Plans</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="relative flex justify-center items-center">
            {/* Left button */}
            {lessonPlans.length > 1 && (
              <button onClick={() => scrollCarousel(-1)} className="absolute left-0 p-2 bg-[#611171] text-white rounded-full hover:bg-[#4a0f5b] transition">
                &lt;
              </button>
            )}
            <div
              className={`carousel flex ${lessonPlans.length === 1 ? 'justify-center' : 'justify-start'} items-center gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth w-[70%] mx-auto`}
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
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
                <p>{error || "No lesson plans found."}</p>
              )}
            </div>
            {/* Right button */}
            {lessonPlans.length > 1 && (
              <button onClick={() => scrollCarousel(1)} className="absolute right-0 p-2 bg-[#611171] text-white rounded-full hover:bg-[#4a0f5b] transition">
                &gt;
              </button>
            )}
          </div>
        )}
      </div>
    );
    
    
};

export default DisplayLessons;
