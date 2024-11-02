import React from "react";
import AddFriendButton from "./AddFriendButton";
const FindFriends = ({ suggestedFriends, addFriend }) => {
  return (
    <div className="find-friends">
      <h3 className="text-2xl font-bold text-[#611171] mt-6">
        Find New Friends
      </h3>
      <ul className="list-disc list-inside">
        {suggestedFriends.length > 1 ? (
          suggestedFriends.slice(1).map((user, index) => (
            <li key={index}>
              {user.name} - {user.email}{" "}
              <AddFriendButton></AddFriendButton>
            </li>
          ))
        ) : (
          <li>No friends to suggest</li>
        )}
      </ul>
    </div>
  );
};

export default FindFriends;
