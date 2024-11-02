import React, { useEffect, useState } from "react";
import DisplayLessons from "../Components/DisplayLessons";
import FriendsLessons from "../Components/FriendsLessons";
import { auth, db } from "../Components/config/firebase.js";
import { getDoc, doc } from "firebase/firestore";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userEmail = auth.currentUser?.email;
      if (userEmail) {
        const userDocRef = doc(db, "users", userEmail);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div>
      <DisplayLessons />
      <FriendsLessons user={user} />
    </div>
  );
};

export default Home;
