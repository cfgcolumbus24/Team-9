import React, { useEffect, useState } from "react";
import { db, auth } from "./config/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import YourFriends from "./YourFriends";
import FindFriends from "./FindFriends";

const TeacherProfile = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [friends, setFriends] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const teacherDocRef = doc(db, "users", currentUser.email);
          const teacherDoc = await getDoc(teacherDocRef);

          const querySnapshot = await getDocs(collection(db, "users"));
          console.log("usersSnapshot:", querySnapshot);

          const allUsers = querySnapshot.docs
            .map((doc) => doc.data())
            .filter((user) => user.email !== currentUser.email);

          if (teacherDoc.exists()) {
            const teacherData = teacherDoc.data();
            setTeacherInfo(teacherData);

            if (teacherData.friends) {
              setFriends(teacherData.friends);
            }

            setSuggestedFriends(allUsers);
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

  const addFriend = async (friendEmail) => {
    const user = auth.currentUser;
  
    if (user) {
      try {
        const userRef = doc(db, "users", user.email);
  
        // Update the Firestore document to add the friend
        await updateDoc(userRef, {
          friends: arrayUnion(friendEmail),
        });
  
        console.log("Friend added successfully!");
  
        // Update the local state to add the friend to the friends list
        setFriends((prevFriends) => {
          if (prevFriends.includes(friendEmail)) {
            console.log("Friend already added!");
            return prevFriends;
          }
          return [...prevFriends, friendEmail];
        });
      } catch (error) {
        console.error("Error adding friend:", error);
      }
    }
  };

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
    <div className="teacher-profile bg-white text-[#222222] p-8 rounded-xl shadow-lg mx-auto mt-12"
      style={{ maxWidth: "37rem" }}>
      <img
        src="https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
        className="w-40 h-40 mx-auto mb-4"
      ></img>
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
      <YourFriends friends={friends} />
      <FindFriends suggestedFriends={suggestedFriends} addFriend={addFriend} />
    </div>
  );
};

export default TeacherProfile;
