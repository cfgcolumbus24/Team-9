import React, { useEffect, useState } from "react";
import { db, auth } from "./config/firebase";
import { getDoc, doc } from "firebase/firestore";

const TeacherProfile = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const teacherDocRef = doc(db, "users", user.email);
          const teacherDoc = await getDoc(teacherDocRef);

          if (teacherDoc.exists()) {
            setTeacherInfo(teacherDoc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching teacher data from Firestore:", error);
        }
      }
    };

    fetchTeacherInfo();
  }, []);

  if (!teacherInfo) {
    return <p>Loading teacher profile...</p>;
  }

  const formattedSignUpDate = new Date(
    teacherInfo.signUpDate
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="teacher-profile bg-white text-[#222222] p-8 rounded-xl shadow-lg max-w-lg mx-auto mt-12">
      <h2 className="text-3xl font-extrabold mb-6 text-[#ea057e] text-center">
        Your Profile
      </h2>
      <div className="space-y-4">
        <p className="flex justify-between items-center border-b border-[#8f8e8c] pb-2">
          <span className="font-bold text-[#611171]">Name:</span>
          <span className="text-lg">{teacherInfo.name}</span>
        </p>
        <p className="flex justify-between items-center border-b border-[#8f8e8c] pb-2">
          <span className="font-bold text-[#611171]">Email:</span>
          <span className="text-lg">{teacherInfo.email}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="font-bold text-[#611171]">Sign Up Date:</span>
          <span className="text-lg">{formattedSignUpDate}</span>
        </p>
      </div>
    </div>
  );
};

export default TeacherProfile;
