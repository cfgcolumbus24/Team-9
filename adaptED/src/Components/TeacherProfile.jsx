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

  return (
    <div className="teacher-profile">
      <h2>Your Profile</h2>
      <p>
        <strong>Name:</strong> {teacherInfo.name}
      </p>
      <p>
        <strong>Email:</strong> {teacherInfo.email}
      </p>
      <p>
        <strong>Sign Up Date:</strong> {teacherInfo.signUpDate}
      </p>
    </div>
  );
};

export default TeacherProfile;
