import React from "react";

export const UserInfoSidebar = (props) => {
  return (
    <>
      {props.data === true ? (
        <div className="w-0 bg-[#839cb5] h-full">
          <span className="w-0">Hello</span>
        </div>
      ) : (
        <div className="w-full bg-[#6f8398] h-full">
          <span>hello</span>
        </div>
      )}
    </>
  );
};

export default UserInfoSidebar;
