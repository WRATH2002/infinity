import React from "react";
import dp from "../assets/img/dp2.jpg";
import profile2 from "../assets/img/d.png";
import { auth } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { BiSolidVideo } from "react-icons/bi";
import { PiChatCenteredTextFill } from "react-icons/pi";
import { addActiveUser } from "../utils/chatSlice";
import { onSnapshot } from "firebase/firestore";

export const UserInfo = () => {
  const [chatUserName, setChatUserName] = useState("");
  const [chatUserAbout, setChatUserAbout] = useState("");
  const [userSidebar, setUserSidebar] = useState(false);
  const [chatUserPhoto, setChatUserPhoto] = useState("");

  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchChatUserInfo();
  }, [ActiveChatUser]);

  function fetchChatUserInfo() {
    if (ActiveChatUser.length !== 0) {
      const userDoc = db.collection("Chat Record").doc(ActiveChatUser);
      // userDoc.get().then((data) => {
      //   setChatUserName(data.data().Name);
      //   setChatUserAbout(data.data().Info);
      // });
      onSnapshot(userDoc, (snapshot) => {
        // console.log("snapshot.docssssssssssssss");
        // console.log(snapshot.data());
        setChatUserName(snapshot?.data()?.Name);
        setChatUserAbout(snapshot?.data()?.Info);
        // setChatUserPhoto(snapshot?.data()?.Photo);
        if (snapshot.data().Photo) {
          setChatUserPhoto(snapshot.data().Photo);
        } else {
          setChatUserPhoto("nophoto");
        }
      });
    } else {
      setChatUserName("Select Any User");
    }
  }

  return (
    <>
      {userSidebar === false ? (
        <>
          {" "}
          <div
            className="w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-0 fixed bg-slate-500 text-white z-30 overflow-hidden"
            // style={{ transition: ".5s" }}
          ></div>
          <div className="w-full px-[20px] pt-[20px] h-[90px] bg-[#0b0c0b] text-[white]">
            <div className="w-full h-full pb-[20px] flex justify-center items-center">
              <div
                className="w-[50px] h-[50px]  rounded-full"
                onClick={() => {
                  setUserSidebar(!userSidebar);
                }}
              >
                {chatUserPhoto === "nophoto" ? (
                  <img
                    src={profile2}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                ) : (
                  <img
                    src={chatUserPhoto}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                )}
              </div>
              <div className="w-[calc(100%-105px)] lg:w-[calc(100%-65px)] md:w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
                <span className="text-[16px] font-semibold text-[#cdd8dd]">
                  {chatUserName}
                </span>
                <span className="text-[15px] font-normal text-[#9fa5a7]">
                  +91 8100524419
                </span>
              </div>
              <div
                className="w-[35px] lg:w-[0] md:w-[0] h-[35px] rounded-full bg-[#cdd8dd] text-black flex justify-center items-center"
                onClick={() => {
                  dispatch(addActiveUser(""));
                }}
              >
                <FaAngleLeft className="text-[20px]" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="w-full lg:w-[40%] md:w-[40%] h-[100vh] fixed bg-[#1f201f] text-white z-30 overflow-hidden flex flex-col justify-center items-center px-[50px] right-0 drop-shadow-xl"
            // style={{ transition: ".5s" }}
          >
            <div className="w-full h-[100px] flex justify-start items-center ">
              <div
                className="w-[35px] h-[35px] rounded-full bg-[#cdd8dd] text-black flex justify-center items-center"
                onClick={() => {
                  setUserSidebar(!userSidebar);
                }}
              >
                <FaAngleLeft className="text-[20px]" />
              </div>
            </div>
            <div className="w-full h-full bg-[#1f201f] flex flex-col justify-center items-center">
              <div className="w-[150px] lg:w-[200px] md:w-[200px] h-[150px] lg:h-[200px] md:h-[200px] rounded-full bg-[#cdd8dd] ">
                {/* <span>Photo</span> */}
                {chatUserPhoto === "nophoto" ? (
                  <img
                    src={profile2}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                ) : (
                  <img
                    src={chatUserPhoto}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-[20px]">
                <span className="text-[22px] font-normal text-[#cdd8dd]">
                  {chatUserName}
                </span>
                <span className="text-[17px] font-normal text-[#9fa5a7]">
                  +91 8100524419
                </span>
              </div>
              <div className="mt-[20px] w-full flex justify-center items-start h-[26px] overflow-hidden text-ellipsis">
                <span className="text-[16px]  font-normal text-[#cdd8dd]">
                  ~ {chatUserAbout}
                </span>
              </div>
              <div className="w-full flex justify-center items-center mt-[20px] ">
                <span className="w-[50px] h-[50px] rounded-full hover:bg-[#cdd8dd] hover:text-[black] text-[#cdd8dd] flex justify-center items-center mx-[10px]">
                  <MdCall className="text-[30px]" />
                </span>
                <span className="w-[50px] h-[50px] rounded-full hover:bg-[#cdd8dd] hover:text-[black] text-[#cdd8dd] flex justify-center items-center mx-[10px]">
                  <BiSolidVideo className="text-[30px]" />
                </span>
                <span className="w-[50px] h-[50px] rounded-full hover:bg-[#cdd8dd] hover:text-[black] text-[#cdd8dd] flex justify-center items-center mx-[10px]">
                  <PiChatCenteredTextFill className="text-[30px]" />
                </span>
              </div>
            </div>
          </div>
          <div className="w-full px-[20px] pt-[20px] h-[90px] bg-[#0b0c0b] text-[white]">
            <div className="w-full h-full pb-[20px] flex justify-center items-center">
              <div
                className="w-[50px] h-[50px]  rounded-full"
                onClick={() => {
                  setUserSidebar(!userSidebar);
                }}
              >
                {chatUserPhoto === "nophoto" ? (
                  <img
                    src={profile2}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                ) : (
                  <img
                    src={chatUserPhoto}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                )}
              </div>
              <div className="w-[calc(100%-105px)] lg:w-[calc(100%-65px)] md:w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
                <span className="text-[16px] font-semibold text-[#cdd8dd]">
                  {chatUserName}
                </span>
                <span className="text-[15px] font-normal text-[#9fa5a7]">
                  +91 8100524419
                </span>
              </div>
              <div
                className="w-[35px] lg:w-[0] md:w-[0] h-[35px] rounded-full bg-[#cdd8dd] text-black flex justify-center items-center"
                onClick={() => {
                  dispatch(addActiveUser(""));
                }}
              >
                <FaAngleLeft className="text-[20px]" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserInfo;
