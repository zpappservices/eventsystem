import React from "react";
import StyledImage from "../StyledImage";

const Profile = () => {
  return (
    <div className="h-10 w-10 overflow-hidden">
      <StyledImage
        className="w-full h-full object-cover"
        src="/img/profile.png"
      />
    </div>
  );
};

export default Profile;
