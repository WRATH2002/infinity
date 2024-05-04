import { db } from "../firebase";
import firebase from "../firebase";
import { useState, useEffect } from "react";
import OwnerDetails from "./OwnerDetails";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import { onSnapshot } from "firebase/firestore";
const Sidebar = () => {
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  const [section, setSection] = useState("Chat");
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
  }, []);
  return (
    <>
      {ActiveChatUser.length === 0 ? (
        <div
          className={
            " w-full lg:w-[400px] md:w-[400px] h-full  fixed lg:relative md:relative flex flex-col justify-start items-center z-10" +
            (theme
              ? " md:bg-[#e4eaf1] lg:bg-[#e4eaf1] bg-[#e4eaf1] border-[#d9dde1]"
              : " md:bg-[#17171a] lg:bg-[#17171a] bg-[#17171a] border-[#292f3f]")
          }
          // style={{ transition: ".5s" }}
        >
          {/* Sidebar */}
          <OwnerDetails data={section} />
          <UserList data={section} setData={setSection} />
          {/* <div className="w-full h-full fixed flex md:hidden lg:hidden back z-0"></div> */}
        </div>
      ) : (
        <div
          className={
            " w-0 lg:w-[400px] md:w-[400px] h-full  fixed lg:relative md:relative flex flex-col justify-start items-center z-0 border-r-[1.5px] " +
            (theme
              ? " md:bg-[#e4eaf1] lg:bg-[#e4eaf1] bg-[#e4eaf1] border-[#d9dde1]"
              : " md:bg-[#17171a] lg:bg-[#17171a] bg-[#17171a] border-[#292f3f]")
          }
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
