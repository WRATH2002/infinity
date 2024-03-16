import { useState } from "react";
import OwnerDetails from "./OwnerDetails";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  const [section, setSection] = useState("Chat");
  return (
    <>
      {ActiveChatUser.length === 0 ? (
        <div
          className=" w-full lg:w-[400px] md:w-[400px] h-full bg-[#1B202D] md:bg-[#292f3f] lg:bg-[#292f3f]  fixed lg:relative md:relative flex flex-col justify-start items-center z-10"
          // style={{ transition: ".5s" }}
        >
          {/* Sidebar */}
          <OwnerDetails data={section} />
          <UserList data={section} setData={setSection} />
          {/* <div className="w-full h-full fixed flex md:hidden lg:hidden back z-0"></div> */}
        </div>
      ) : (
        <div
          className=" w-0 lg:w-[400px] md:w-[400px] h-full bg-[#1B202D] md:bg-[#292f3f] lg:bg-[#292f3f]  fixed lg:relative md:relative flex flex-col justify-start items-center z-0"
          // style={{ transition: ".5s" }}
        >
          {/* Sidebar */}
          <OwnerDetails data={section} />
          <UserList data={section} setData={setSection} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
// border-r-[1px] border-[#cdd8dd]
