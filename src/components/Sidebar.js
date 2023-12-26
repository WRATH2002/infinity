import OwnerDetails from "./OwnerDetails";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  return (
    <>
      {ActiveChatUser.length === 0 ? (
        <div
          className=" w-full lg:w-[400px] md:w-[400px] h-full bg-[#1d2031]  fixed lg:relative md:relative flex flex-col justify-start items-center z-20"
          // style={{ transition: ".5s" }}
        >
          {/* Sidebar */}
          <OwnerDetails />
          <UserList />
          {/* <div className="w-full h-full fixed flex md:hidden lg:hidden back z-0"></div> */}
        </div>
      ) : (
        <div
          className=" w-0 lg:w-[400px] md:w-[400px] h-full bg-[#1d2031]  fixed lg:relative md:relative flex flex-col justify-start items-end z-[8]"
          // style={{ transition: ".5s" }}
        >
          {/* Sidebar */}
          <OwnerDetails />
          <UserList />
        </div>
      )}
    </>
  );
};

export default Sidebar;
// border-r-[1px] border-[#cdd8dd]
