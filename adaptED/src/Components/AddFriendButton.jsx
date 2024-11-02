import { useState } from "react";

// Functional component for adding a friend
function AddFriendButton() {
  return (
    <button
      className="bg-[#611171] text-white font-medium text-sm px-1.5 py-1 rounded-md shadow-sm hover:bg-blue-600 transition duration-200"
      onClick={() => addFriend(user.email)}
    >
      Add Friend
    </button>
  );
}

export default AddFriendButton;
