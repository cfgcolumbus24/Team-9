import React from "react";

const YourFriends = ({ friends }) => {
  return (
    <div className="your-friends">
      <h3 className="text-2xl font-bold text-[#611171]">Your Friends</h3>
      <ul className="list-disc list-inside">
        {friends.length > 0 ? (
          friends.map((friend, index) => <li key={index}>{friend}</li>)
        ) : (
          <p>You have no friends yet.</p>
        )}
      </ul>
    </div>
  );
};

export default YourFriends;
